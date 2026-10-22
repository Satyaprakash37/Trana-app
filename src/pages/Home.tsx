import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Navigation, 
  Users, 
  History as HistoryIcon, 
  Settings as SettingsIcon, 
  Sparkles, 
  Award,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { 
  getProfile, 
  getCoins, 
  getLivesHelped, 
  getLifesaverRank, 
  getActiveJourney 
} from '../utils/storage';
import { AppPage } from '../types';

interface HomeProps {
  onNavigate: (page: AppPage) => void;
  onTriggerSOS: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onTriggerSOS }) => {
  const profile = getProfile();
  const [coins, setCoinsState] = useState(getCoins());
  const [livesHelped, setLivesHelpedState] = useState(getLivesHelped());
  const [activeJourney, setActiveJourneyState] = useState(getActiveJourney());
  
  // SOS Press & Hold state
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [tapHint, setTapHint] = useState(false);
  const holdTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Coins Modal
  const [showCoinsModal, setShowCoinsModal] = useState(false);

  useEffect(() => {
    setCoinsState(getCoins());
    setLivesHelpedState(getLivesHelped());
    setActiveJourneyState(getActiveJourney());
  }, []);

  // Greeting based on time (Good morning/afternoon/evening/night)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
  };

  const name = profile?.name ? profile.name.split(' ')[0] : 'Priya';
  const firstLetter = profile?.name ? profile.name.charAt(0).toUpperCase() : 'T';
  const rankInfo = getLifesaverRank(livesHelped);

  // SOS Hold Handlers (3 seconds)
  const HOLD_DURATION_MS = 3000;

  const startHold = () => {
    setIsHolding(true);
    setTapHint(false);
    startTimeRef.current = Date.now();

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(60);
      } catch (e) {
        // ignore
      }
    }

    const interval = 30; // update progress every 30ms
    holdTimerRef.current = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        // Completed 3s hold -> trigger SOS
        stopHold();
        if ('vibrate' in navigator) {
          try {
            navigator.vibrate([200, 100, 200, 100, 400]);
          } catch (e) {
            // ignore
          }
        }
        onTriggerSOS();
      }
    }, interval);
  };

  const stopHold = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (isHolding && holdProgress < 95 && holdProgress > 2) {
      setTapHint(true);
      setTimeout(() => setTapHint(false), 3000);
    }
    setIsHolding(false);
    setHoldProgress(0);
    startTimeRef.current = null;
  };

  // SVG saffron ring calculation (for 200px button)
  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background pb-28 max-w-md mx-auto flex flex-col justify-between p-6">
      <div>
        {/* Header */}
        <header className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar circle with first letter */}
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md shadow-primary/20">
                {firstLetter}
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary font-heading flex items-center gap-1.5 leading-tight">
                  {getGreeting()}, {name} 🙏
                </h1>
              </div>
            </div>

            {/* TRANA Coins Badge (top right, saffron bg, shows trana_coins value) */}
            <button
              type="button"
              onClick={() => setShowCoinsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-white font-bold text-xs shadow-md shadow-secondary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer touch-target"
            >
              <span>💎</span>
              <span className="text-sm">{coins}</span>
              <span className="text-[10px] uppercase font-semibold">TC</span>
            </button>
          </div>

          {/* Lifesaver rank badge below greeting */}
          <div className="mt-3 flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: rankInfo.color }}
              >
                <Award className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${rankInfo.badgeClass}`}>
                  {rankInfo.rank} Rank
                </span>
                <span className="text-xs text-muted">
                  {livesHelped} {livesHelped === 1 ? 'life helped' : 'lives helped'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className="text-muted hover:text-primary p-1 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* BIG SOS Button (red #CC344D, 200px circle, "SOS" text + "Hold for 3 seconds") */}
        <section className="py-6 flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center">
            {/* SVG circular saffron progress ring */}
            <svg className="w-[220px] h-[220px] transform -rotate-90 pointer-events-none">
              <circle
                cx="110"
                cy="110"
                r={radius}
                className="stroke-slate-200"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#FF9933"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: isHolding ? 'stroke-dashoffset 30ms linear' : 'stroke-dashoffset 200ms ease-out',
                }}
              />
            </svg>

            {/* 200px Red circle button */}
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              onTouchCancel={stopHold}
              className={`absolute w-[200px] h-[200px] rounded-full bg-error text-white flex flex-col items-center justify-center shadow-[0_12px_45px_rgba(204,52,77,0.45)] select-none cursor-pointer transition-transform active:scale-95 ${
                isHolding ? 'scale-95' : 'sos-pulse'
              }`}
            >
              <ShieldAlert className="w-12 h-12 mb-1 animate-pulse" />
              <span className="text-3xl font-black tracking-widest font-heading">
                SOS
              </span>
              <span className="text-[11px] font-semibold text-white/90 tracking-wide mt-1">
                {isHolding 
                  ? `${Math.max(1, Math.ceil((HOLD_DURATION_MS - (holdProgress / 100) * HOLD_DURATION_MS) / 1000))}s remaining` 
                  : 'Hold for 3 seconds'}
              </span>
            </button>
          </div>

          <div className="min-h-[24px] mt-3">
            {tapHint && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-warning text-xs font-semibold animate-bounce border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Hold firmly for 3 seconds to trigger SOS</span>
              </div>
            )}
            {!tapHint && isHolding && (
              <span className="text-xs font-bold text-error tracking-wide animate-pulse">
                Keep holding! Initiating emergency protocol...
              </span>
            )}
          </div>
        </section>

        {/* 2x3 Grid of action cards (white bg, rounded, shadow) */}
        <section className="mt-1">
          <div className="grid grid-cols-2 gap-3.5">
            {/* 1. New Journey 🗺️ */}
            <button
              type="button"
              onClick={() => onNavigate('newjourney')}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between h-32 text-left group cursor-pointer touch-target"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🗺️
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-secondary transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">New Journey</h3>
                <p className="text-[11px] text-muted">Safe route tracking</p>
              </div>
            </button>

            {/* 2. Active Journey 📍 */}
            <button
              type="button"
              onClick={() => onNavigate(activeJourney ? 'activejourney' : 'newjourney')}
              className={`p-4 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-32 text-left group cursor-pointer relative touch-target ${
                activeJourney
                  ? 'bg-amber-50/60 border-secondary'
                  : 'bg-white border-slate-200/80 hover:border-secondary/40'
              }`}
            >
              {activeJourney && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-secondary text-white text-[9px] font-extrabold uppercase tracking-wider animate-pulse">
                  Live
                </span>
              )}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-secondary flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  📍
                </div>
                {!activeJourney && <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-secondary transition-colors" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">Active Journey</h3>
                <p className="text-[11px] text-muted truncate">
                  {activeJourney ? `To: ${activeJourney.destination}` : 'Start tracking trip'}
                </p>
              </div>
            </button>

            {/* 3. Contacts 👥 */}
            <button
              type="button"
              onClick={() => onNavigate('contacts')}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between h-32 text-left group cursor-pointer touch-target"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-accent flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  👥
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-secondary transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">Contacts</h3>
                <p className="text-[11px] text-muted">Trusted guardians</p>
              </div>
            </button>

            {/* 4. History 📜 */}
            <button
              type="button"
              onClick={() => onNavigate('history')}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between h-32 text-left group cursor-pointer touch-target"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-success flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  📜
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-secondary transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">History</h3>
                <p className="text-[11px] text-muted">Past travel logs</p>
              </div>
            </button>

            {/* 5. Settings ⚙️ */}
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between h-32 text-left group cursor-pointer touch-target"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  ⚙️
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-secondary transition-colors" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">Settings</h3>
                <p className="text-[11px] text-muted">Profile & Volunteer</p>
              </div>
            </button>

            {/* 6. TRANA Coins 💎 (tap shows explanation modal) */}
            <button
              type="button"
              onClick={() => setShowCoinsModal(true)}
              className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between h-32 text-left group cursor-pointer touch-target"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  💎
                </div>
                <span className="text-xs font-bold text-secondary">{coins} TC</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">TRANA Coins</h3>
                <p className="text-[11px] text-muted">Rewards & Impact</p>
              </div>
            </button>
          </div>
        </section>
      </div>

      {/* TRANA Coins Explanation Modal */}
      {showCoinsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-secondary text-white flex items-center justify-center text-3xl shadow-lg shadow-secondary/30">
                💎
              </div>
              <h2 className="text-2xl font-bold text-primary font-heading">
                {coins} TRANA Coins
              </h2>
              <p className="text-xs text-muted mt-1">
                Your community safety contribution score
              </p>
            </div>

            <div className="mt-5 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <span>Earned on Safe Journey:</span>
                <span className="font-bold text-success">+50 TC / trip</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Volunteer Responder Bonus:</span>
                <span className="font-bold text-secondary">+100 TC</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Redeemable for:</span>
                <span className="font-semibold text-primary">Safety gear & coupons</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCoinsModal(false)}
              className="mt-6 w-full min-h-[48px] py-3 bg-primary hover:bg-[#283e6b] text-white font-bold rounded-2xl text-sm transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
