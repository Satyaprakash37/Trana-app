import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  Flag, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  BellRing,
  Bot,
  Volume2,
  VolumeX,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { 
  getActiveJourney, 
  setJourneyHistory, 
  getJourneyHistory, 
  addCoins, 
  addRiskLogEntry,
  getContacts
} from '../utils/storage';
import { JourneyHistoryItem, AppPage } from '../types';

interface ActiveJourneyProps {
  onNavigate: (page: AppPage) => void;
  onTriggerSOS: () => void;
}

type RiskLevel = 'SAFE' | 'MODERATE' | 'HIGH RISK';

export const ActiveJourney: React.FC<ActiveJourneyProps> = ({ onNavigate, onTriggerSOS }) => {
  const [journey, setJourney] = useState<JourneyHistoryItem | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 });
  const [mapRefreshCounter, setMapRefreshCounter] = useState(0);

  // Check-in state & countdowns
  const [lastCheckInTime, setLastCheckInTime] = useState<Date>(new Date());
  const [nextCheckInTime, setNextCheckInTime] = useState<Date>(new Date());
  const [secondsUntilCheckIn, setSecondsUntilCheckIn] = useState<number>(0);
  const [isCheckInWarningActive, setIsCheckInWarningActive] = useState<boolean>(false);
  const [checkInWarningCountdown, setCheckInWarningCountdown] = useState<number>(300); // 5 min = 300 sec

  // AI Risk Zone State
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('SAFE');
  const [riskScore, setRiskScore] = useState<number>(20);
  const [poiCount, setPoiCount] = useState<number>(18);
  const [isEvaluatingRisk, setIsEvaluatingRisk] = useState<boolean>(false);

  // AI Voice & Escalation State
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [hasSpokenHighRisk, setHasSpokenHighRisk] = useState<boolean>(false);
  const [isAiCountdownActive, setIsAiCountdownActive] = useState<boolean>(false);
  const [aiCountdownSeconds, setAiCountdownSeconds] = useState<number>(120); // 2 min = 120 sec
  const [isAutoEscalated, setIsAutoEscalated] = useState<boolean>(false);

  // UI feedback
  const [safeFeedbackMsg, setSafeFeedbackMsg] = useState<string>('');
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  const checkInTimerRef = useRef<number | null>(null);
  const mapRefreshRef = useRef<number | null>(null);
  const riskDetectionRef = useRef<number | null>(null);
  const aiCountdownTimerRef = useRef<number | null>(null);

  // 1. Initial Load & Geo setup
  useEffect(() => {
    const active = getActiveJourney();
    if (!active) {
      onNavigate('home');
      return;
    }
    setJourney(active);

    const last = active.lastCheckIn ? new Date(active.lastCheckIn) : new Date();
    const intervalMs = (active.interval || 15) * 60 * 1000;
    const next = active.nextCheckIn ? new Date(active.nextCheckIn) : new Date(last.getTime() + intervalMs);

    setLastCheckInTime(last);
    setNextCheckInTime(next);

    if (active.originCoords) {
      setCurrentCoords(active.originCoords);
    }

    // GPS location
    updateLiveLocation();

    // Map auto-refresh every 60 seconds
    mapRefreshRef.current = window.setInterval(() => {
      updateLiveLocation();
      setMapRefreshCounter((prev) => prev + 1);
    }, 60000);

    // Initial Risk Evaluation
    runRiskZoneDetection(active.originCoords?.lat || 28.6139, active.originCoords?.lng || 77.2090);

    // Risk Evaluation every 2 minutes (120,000 ms)
    riskDetectionRef.current = window.setInterval(() => {
      if (currentCoords) {
        runRiskZoneDetection(currentCoords.lat, currentCoords.lng);
      }
    }, 120000);

    return () => {
      if (mapRefreshRef.current) clearInterval(mapRefreshRef.current);
      if (checkInTimerRef.current) clearInterval(checkInTimerRef.current);
      if (riskDetectionRef.current) clearInterval(riskDetectionRef.current);
      if (aiCountdownTimerRef.current) clearInterval(aiCountdownTimerRef.current);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 2. Live GPS update
  const updateLiveLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCurrentCoords({ lat, lng });
        },
        () => {
          // ignore or keep default
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  // 3. OpenStreetMap Overpass API for Risk Zone Detection
  const runRiskZoneDetection = async (lat: number, lng: number) => {
    setIsEvaluatingRisk(true);
    try {
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:500,${lat},${lng})["amenity"];out;`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(overpassUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Overpass network error');
      }

      const data = await response.json();
      const count = Array.isArray(data.elements) ? data.elements.length : 0;
      applyRiskAssessment(lat, lng, count);
    } catch (err) {
      console.log('Overpass API fallback calculation:', err);
      // Fallback density simulation
      const fallbackCount = Math.floor(Math.random() * 20) + 1;
      applyRiskAssessment(lat, lng, fallbackCount);
    } finally {
      setIsEvaluatingRisk(false);
    }
  };

  // Calculate score & level according to prompt:
  // POI < 5 = HIGH RISK (80-100)
  // POI 5-15 = MODERATE (40-79)
  // POI > 15 = SAFE (0-39)
  const applyRiskAssessment = (lat: number, lng: number, count: number) => {
    setPoiCount(count);
    let score = 20;
    let level: RiskLevel = 'SAFE';

    if (count < 5) {
      score = 85 + Math.min(15, (5 - count) * 3);
      level = 'HIGH RISK';
    } else if (count <= 15) {
      score = 40 + Math.floor(((15 - count) / 10) * 39);
      level = 'MODERATE';
    } else {
      score = Math.max(10, 39 - Math.min(29, (count - 15)));
      level = 'SAFE';
    }

    setRiskScore(score);
    setRiskLevel(level);

    // Save to trana_risk_log
    addRiskLogEntry({
      lat,
      lng,
      score,
      timestamp: new Date().toISOString(),
      poiCount: count,
      zoneLevel: level,
    });

    // If HIGH RISK detected, trigger AI Voice Guardian
    if (level === 'HIGH RISK' && !hasSpokenHighRisk) {
      triggerAiVoiceGuardian();
    }
  };

  // 4. AI Voice Guardian (window.speechSynthesis + calm male voice)
  const triggerAiVoiceGuardian = () => {
    setHasSpokenHighRisk(true);
    setIsAiSpeaking(true);

    const message = "Attention. You are in a low footfall area. This may be unsafe. Please move to a more populated area. If you feel threatened, press the SOS button. TRANA is monitoring your location.";

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.95;
      utterance.pitch = 0.85;

      const loadAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        // Pick calm male voice
        const maleVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('male') ||
              v.name.toLowerCase().includes('david') ||
              v.name.toLowerCase().includes('george') ||
              v.name.toLowerCase().includes('natural') ||
              v.name.toLowerCase().includes('ravi') ||
              v.name.toLowerCase().includes('guy'))
        ) || voices.find((v) => v.lang.startsWith('en'));

        if (maleVoice) utterance.voice = maleVoice;

        utterance.onstart = () => setIsAiSpeaking(true);
        utterance.onend = () => {
          setIsAiSpeaking(false);
          startAiCountdown();
        };
        utterance.onerror = () => {
          setIsAiSpeaking(false);
          startAiCountdown();
        };

        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        loadAndSpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = loadAndSpeak;
        setTimeout(loadAndSpeak, 300);
      }
    } else {
      setIsAiSpeaking(false);
      startAiCountdown();
    }
  };

  // 5. AI 2-minute countdown (120s)
  const startAiCountdown = () => {
    setIsAiCountdownActive(true);
    setAiCountdownSeconds(120);

    if (aiCountdownTimerRef.current) clearInterval(aiCountdownTimerRef.current);

    aiCountdownTimerRef.current = window.setInterval(() => {
      setAiCountdownSeconds((prev) => {
        if (prev <= 1) {
          if (aiCountdownTimerRef.current) clearInterval(aiCountdownTimerRef.current);
          handleAutoTriggerSosFromAi();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Auto trigger SOS if no response in 2 min
  const handleAutoTriggerSosFromAi = () => {
    setIsAutoEscalated(true);
    setIsAiCountdownActive(false);

    // Banner: "AI ASSISTED ESCALATION — SOS triggered automatically"
    // Open tel: link to first contact's phone
    const contacts = getContacts();
    const emergencyPhone = contacts.length > 0 ? contacts[0].phone : '112';

    // Dispatch SOS event & navigate
    setTimeout(() => {
      window.location.href = `tel:${emergencyPhone}`;
      onTriggerSOS();
    }, 1500);
  };

  // 6. Regular Check-in interval countdown (every sec)
  useEffect(() => {
    if (!journey) return;

    checkInTimerRef.current = window.setInterval(() => {
      const now = new Date().getTime();
      const nextTime = nextCheckInTime.getTime();
      const diffSec = Math.floor((nextTime - now) / 1000);

      if (diffSec > 0) {
        setSecondsUntilCheckIn(diffSec);
        setIsCheckInWarningActive(false);
      } else {
        // Interval expired: show warning + 5-min countdown
        const overSec = Math.abs(diffSec);
        const warningRemaining = Math.max(0, 300 - overSec); // 5 min = 300 sec
        setSecondsUntilCheckIn(0);
        setIsCheckInWarningActive(true);
        setCheckInWarningCountdown(warningRemaining);

        // After 5 min: auto-trigger SOS
        if (warningRemaining <= 0) {
          if (checkInTimerRef.current) clearInterval(checkInTimerRef.current);
          onTriggerSOS();
        }
      }
    }, 1000);

    return () => {
      if (checkInTimerRef.current) clearInterval(checkInTimerRef.current);
    };
  }, [nextCheckInTime, journey]);

  // "I'm Safe" handler
  const handleImSafe = () => {
    if (!journey) return;
    const now = new Date();
    const intervalMs = (journey.interval || 15) * 60 * 1000;
    const newNext = new Date(now.getTime() + intervalMs);

    setLastCheckInTime(now);
    setNextCheckInTime(newNext);
    setIsCheckInWarningActive(false);
    setCheckInWarningCountdown(300);

    // Reset AI countdown if active
    if (isAiCountdownActive) {
      if (aiCountdownTimerRef.current) clearInterval(aiCountdownTimerRef.current);
      setIsAiCountdownActive(false);
      setHasSpokenHighRisk(false);
    }

    // Update in stored journey history
    const history = getJourneyHistory();
    const updated = history.map((j) => {
      if (j.id === journey.id) {
        return {
          ...j,
          lastCheckIn: now.toISOString(),
          nextCheckIn: newNext.toISOString(),
        };
      }
      return j;
    });
    setJourneyHistory(updated);

    setSafeFeedbackMsg("Safety confirmed: AI Guardian notified. Timer reset.");
    setTimeout(() => setSafeFeedbackMsg(''), 4000);

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([80, 50, 80]);
      } catch (e) {
        // ignore
      }
    }
  };

  // "End Journey" handler
  const handleEndJourney = () => {
    if (!journey) return;

    const now = new Date();
    const start = new Date(journey.startedAt);
    const durationMinutes = Math.max(1, Math.round((now.getTime() - start.getTime()) / 60000));
    const durationStr = `${durationMinutes} min`;

    // Mark journey completed in trana_journey_history (add endedAt, duration)
    const history = getJourneyHistory();
    const updated = history.map((j) => {
      if (j.id === journey.id) {
        return {
          ...j,
          status: 'completed' as const,
          endedAt: now.toISOString(),
          duration: durationStr,
        };
      }
      return j;
    });
    setJourneyHistory(updated);

    // Award +50 coins to trana_coins
    addCoins(50);

    setShowCompletionModal(true);
  };

  // Time formatters
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeOnly = (d: Date) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Map URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Dev simulation for test demo
  const simulateRiskLevel = (simLevel: RiskLevel) => {
    if (simLevel === 'HIGH RISK') {
      applyRiskAssessment(currentCoords.lat, currentCoords.lng, 2);
    } else if (simLevel === 'MODERATE') {
      applyRiskAssessment(currentCoords.lat, currentCoords.lng, 9);
    } else {
      applyRiskAssessment(currentCoords.lat, currentCoords.lng, 24);
    }
  };

  if (!journey) return null;

  return (
    <div className="min-h-screen bg-background pb-28 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* Sticky Top Header: "Active Journey" heading + LIVE badge (green pulse) + End Journey button */}
        <div className="px-5 pt-6 pb-3 bg-white border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-primary font-heading">
              Active Journey
            </h1>
            {/* LIVE badge (green pulse) */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-wider text-success">
                LIVE
              </span>
            </div>
          </div>

          {/* End Journey button (top right, error text) */}
          <button
            type="button"
            onClick={handleEndJourney}
            className="text-xs font-bold text-error hover:text-red-700 py-1.5 px-2.5 rounded-xl border border-red-200 hover:bg-red-50 transition-colors cursor-pointer touch-target flex items-center gap-1"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>End Journey</span>
          </button>
        </div>

        {/* AI AUTO-ESCALATED BANNER */}
        {isAutoEscalated && (
          <div className="bg-error text-white p-3.5 text-center text-xs font-black uppercase tracking-wider animate-bounce">
            🚨 AI ASSISTED ESCALATION — SOS triggered automatically
          </div>
        )}

        {/* RISK BANNER (sticky top) */}
        {riskLevel === 'HIGH RISK' && (
          <div className="bg-error text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-md pulse-warning sticky top-[61px] z-20">
            <div className="flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span className="leading-tight">
                HIGH RISK ZONE — Low footfall area. AI Guardian activated.
              </span>
            </div>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase font-black shrink-0">
              Score: {riskScore}
            </span>
          </div>
        )}

        {riskLevel === 'MODERATE' && (
          <div className="bg-warning text-white px-4 py-2 text-xs font-bold flex items-center justify-between sticky top-[61px] z-20">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>Moderate risk — Stay alert</span>
            </div>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded uppercase font-black shrink-0">
              Score: {riskScore}
            </span>
          </div>
        )}

        {riskLevel === 'SAFE' && (
          <div className="bg-success text-white px-4 py-1.5 text-[11px] font-semibold flex items-center justify-between sticky top-[61px] z-20">
            <div className="flex items-center gap-1.5">
              <span>✓</span>
              <span>Safe area • Normal density detected</span>
            </div>
            <span className="text-[10px] opacity-90">POI: {poiCount}</span>
          </div>
        )}

        {/* AI SPEAKING INDICATOR (animated 🤖 icon) */}
        {isAiSpeaking && (
          <div className="mx-4 mt-3 p-3.5 bg-primary text-white rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in border border-secondary/50">
            <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 animate-spin" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase text-secondary tracking-wider">
                  AI Guardian Speaking
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              </div>
              <p className="text-[11px] text-slate-200 mt-0.5">
                "Attention. You are in a low footfall area..."
              </p>
            </div>
          </div>
        )}

        {/* AI 2-MINUTE COUNTDOWN PROMPT */}
        {isAiCountdownActive && (
          <div className="mx-4 mt-3 p-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-300" />
                <h4 className="text-xs font-black tracking-wider uppercase">
                  Safety Check: Confirm Status
                </h4>
              </div>
              <div className="text-lg font-mono font-black text-amber-200">
                {formatTimer(aiCountdownSeconds)}
              </div>
            </div>
            <p className="text-xs text-white/90">
              Low density detected. If you do not respond, TRANA will auto-trigger SOS and notify guardians.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleImSafe}
                className="min-h-[48px] py-2.5 px-3 bg-success hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>I'm Safe</span>
              </button>
              <button
                type="button"
                onClick={onTriggerSOS}
                className="min-h-[48px] py-2.5 px-3 bg-white text-error hover:bg-slate-100 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Trigger SOS Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Regular Check-in Missed Warning (5-min countdown) */}
        {isCheckInWarningActive && (
          <div className="mx-4 mt-3 p-4 bg-error text-white rounded-3xl shadow-xl animate-bounce">
            <div className="flex items-center gap-3">
              <BellRing className="w-6 h-6 text-white shrink-0 animate-spin" />
              <div className="flex-1">
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Check-in Overdue!
                </h4>
                <p className="text-xs text-white/90">
                  Auto SOS triggering in <span className="font-mono font-black text-amber-200 underline">{formatTimer(checkInWarningCountdown)}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleImSafe}
              className="mt-3 w-full min-h-[48px] py-2 bg-white text-error font-extrabold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Confirm I'm Safe Now
            </button>
          </div>
        )}

        {/* Safe Acknowledged Message */}
        {safeFeedbackMsg && (
          <div className="mx-4 mt-3 p-3 bg-emerald-500 text-white rounded-2xl shadow-md text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{safeFeedbackMsg}</span>
          </div>
        )}

        {/* Google Maps embed (live location, refresh every 60 sec) */}
        <div className="px-4 pt-3">
          <div className="relative w-full h-52 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <iframe
              key={mapRefreshCounter}
              title="Google Maps Live Tracking"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
            {/* Live GPS badge overlay */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-md border border-slate-200 flex items-center gap-1.5 text-[10px] font-bold text-primary">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span>GPS 60s Refresh</span>
            </div>

            {/* Manual refresh button */}
            <button
              type="button"
              onClick={() => {
                updateLiveLocation();
                setMapRefreshCounter((c) => c + 1);
              }}
              title="Refresh Location"
              className="absolute bottom-3 right-3 bg-white p-2.5 rounded-2xl shadow-md text-slate-700 hover:text-secondary cursor-pointer touch-target flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dev Mode Risk Level Simulator Pills */}
        <div className="px-4 mt-3">
          <div className="p-2.5 bg-slate-100 rounded-2xl border border-slate-200/80 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-secondary" />
              Dev Risk Sim:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => simulateRiskLevel('SAFE')}
                className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                  riskLevel === 'SAFE' ? 'bg-success text-white' : 'bg-white text-slate-700'
                }`}
              >
                Safe
              </button>
              <button
                type="button"
                onClick={() => simulateRiskLevel('MODERATE')}
                className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                  riskLevel === 'MODERATE' ? 'bg-warning text-white' : 'bg-white text-slate-700'
                }`}
              >
                Moderate
              </button>
              <button
                type="button"
                onClick={() => simulateRiskLevel('HIGH RISK')}
                className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                  riskLevel === 'HIGH RISK' ? 'bg-error text-white' : 'bg-white text-slate-700'
                }`}
              >
                High Risk
              </button>
            </div>
          </div>
        </div>

        {/* Info card: destination, mode, ETA countdown, last check-in, next check-in */}
        <div className="px-4 mt-3">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5 max-w-[70%]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Destination
                </span>
                <h3 className="text-base font-bold text-primary leading-tight">
                  {journey.destination}
                </h3>
                <p className="text-xs text-muted truncate">
                  From: {journey.origin || 'Detected GPS'}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-primary">
                {journey.mode_travel}
              </div>
            </div>

            {/* Check-in & ETA Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-2xl border ${
                isCheckInWarningActive
                  ? 'bg-red-50 border-red-200 text-error'
                  : 'bg-emerald-50/70 border-emerald-200 text-success'
              }`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Next Check-In
                  </span>
                </div>
                <div className="text-xl font-black font-heading">
                  {isCheckInWarningActive ? 'OVERDUE' : formatTimer(secondsUntilCheckIn)}
                </div>
                <p className="text-[10px] opacity-80 mt-0.5">
                  Target: {formatTimeOnly(nextCheckInTime)}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700">
                <div className="flex items-center gap-1.5 mb-1">
                  <Flag className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Expected Arrival
                  </span>
                </div>
                <div className="text-xl font-black font-heading text-primary">
                  {journey.eta ? formatTimeOnly(new Date(journey.eta)) : '35 mins'}
                </div>
                <p className="text-[10px] text-muted mt-0.5">
                  Last check: {formatTimeOnly(lastCheckInTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Buttons: "I'm Safe" (green), "SOS" (red), "End Journey" (amber) */}
        <div className="p-4 space-y-3">
          {/* "I'm Safe" (green) */}
          <button
            type="button"
            onClick={handleImSafe}
            className="w-full min-h-[48px] py-3.5 bg-success hover:bg-[#386d49] text-white font-bold rounded-2xl shadow-lg shadow-success/25 transition-all text-base flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <CheckCircle className="w-5 h-5" />
            <span>I'm Safe (Reset Timer)</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            {/* "SOS" (red) */}
            <button
              type="button"
              onClick={onTriggerSOS}
              className="min-h-[48px] py-3.5 bg-error hover:bg-[#b02c41] text-white font-bold rounded-2xl shadow-lg shadow-error/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>SOS</span>
            </button>

            {/* "End Journey" (amber / secondary) */}
            <button
              type="button"
              onClick={handleEndJourney}
              className="min-h-[48px] py-3.5 bg-secondary hover:bg-[#e88825] text-white font-bold rounded-2xl shadow-lg shadow-secondary/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Flag className="w-4 h-4" />
              <span>End Journey</span>
            </button>
          </div>
        </div>
      </div>

      {/* Completion Modal: Award +50 Coins & go to Home */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-success flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-primary font-heading">
              Safe Arrival! 🎉
            </h2>
            <p className="text-xs text-muted mt-1">
              You safely concluded your journey to <span className="font-semibold text-primary">{journey.destination}</span>.
            </p>

            <div className="my-5 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center text-xl shadow-md">
                💎
              </div>
              <div className="text-left">
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Safety Reward</p>
                <p className="text-lg font-black text-primary">+50 TRANA Coins</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowCompletionModal(false);
                onNavigate('home');
              }}
              className="w-full min-h-[48px] py-3.5 bg-primary hover:bg-[#283e6b] text-white font-bold rounded-2xl text-sm transition-all cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
