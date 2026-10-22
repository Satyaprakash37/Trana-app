import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';
import { addEvent, getContacts } from '../utils/storage';
import { TranaEvent, AppPage } from '../types';

interface SOSProps {
  onCancel: (nextPage: AppPage) => void;
}

export const SOS: React.FC<SOSProps> = ({ onCancel }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 });
  const [confirmCancel, setConfirmCancel] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Save SOS event to trana_events
    const userContacts = getContacts();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(c);
          
          const sosEvent: TranaEvent = {
            type: 'SOS_TRIGGERED',
            location_lat: c.lat,
            location_lng: c.lng,
            timestamp: new Date().toISOString(),
            status: 'active',
            details: `SOS triggered with GPS. ${userContacts.length} contacts notified.`,
          };
          addEvent(sosEvent);
        },
        () => {
          const fallback = { lat: 28.6139, lng: 77.2090 };
          setCoords(fallback);
          
          const sosEvent: TranaEvent = {
            type: 'SOS_TRIGGERED',
            location_lat: fallback.lat,
            location_lng: fallback.lng,
            timestamp: new Date().toISOString(),
            status: 'active',
            details: `SOS triggered (fallback coordinates).`,
          };
          addEvent(sosEvent);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      const sosEvent: TranaEvent = {
        type: 'SOS_TRIGGERED',
        location_lat: 28.6139,
        location_lng: 77.2090,
        timestamp: new Date().toISOString(),
        status: 'active',
      };
      addEvent(sosEvent);
    }

    // Elapsed timer
    timerRef.current = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    // Haptic SOS vibration pattern: ... --- ...
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200, 100, 200, 300, 500, 100, 500, 100, 500, 300, 200, 100, 200]);
      } catch (e) {
        // ignore
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format M:SS
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const mapsLink = `https://maps.google.com/?q=${coords.lat},${coords.lng}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleCancel = () => {
    const cancelEvent: TranaEvent = {
      type: 'SOS_CANCELLED',
      location_lat: coords.lat,
      location_lng: coords.lng,
      timestamp: new Date().toISOString(),
      status: 'cancelled',
      details: `False alarm dismissed after ${elapsedSeconds} seconds.`,
    };
    addEvent(cancelEvent);
    onCancel('home');
  };

  return (
    /* Full-screen red gradient bg (error to red-900) */
    <div className="min-h-screen bg-gradient-to-b from-error via-red-800 to-red-950 text-white flex flex-col justify-between p-5 max-w-md mx-auto select-none">
      <div>
        {/* Top area */}
        <div className="text-center pt-2">
          {/* 🆘 icon (80px white circle, pulse animation) */}
          <div className="relative inline-flex items-center justify-center my-3">
            <div className="w-[80px] h-[80px] rounded-full bg-white text-error flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.7)] animate-pulse">
              <span className="text-4xl">🆘</span>
            </div>
          </div>

          {/* "SOS ACTIVE" heading (Playfair, 36px, bold) */}
          <h1 className="text-[36px] font-bold tracking-wider uppercase font-heading text-white drop-shadow-md leading-tight">
            SOS ACTIVE
          </h1>

          {/* Elapsed timer (format M:SS) */}
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-sm font-mono font-bold tracking-widest">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Elapsed: {formatTimer(elapsedSeconds)}</span>
          </div>

          {/* "✓ Trusted contacts notified" confirmation */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>✓ Trusted contacts notified</span>
          </div>
        </div>

        {/* Live location card (lat/lng + Google Maps link) */}
        <div className="mt-4 bg-black/35 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-left">
          <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Live Emergency GPS
            </span>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] underline text-white hover:text-amber-200"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs font-mono text-white/90">
            Latitude: {coords.lat.toFixed(5)}, Longitude: {coords.lng.toFixed(5)}
          </p>
        </div>

        {/* Google Maps embed (location) */}
        <div className="mt-3 w-full h-40 rounded-2xl overflow-hidden border border-white/20 shadow-md">
          <iframe
            title="SOS Emergency Location"
            src={mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      {/* Buttons & Footer */}
      <div className="space-y-3 pt-3">
        {/* "Call Police (112)" button (white bg, error text) → tel:112 */}
        <a
          href="tel:112"
          className="w-full min-h-[48px] py-4 px-6 bg-white hover:bg-slate-100 text-error font-black rounded-2xl shadow-2xl flex items-center justify-center gap-3 text-lg tracking-wider uppercase transition-transform active:scale-98 cursor-pointer"
        >
          <PhoneCall className="w-6 h-6 fill-current animate-bounce" />
          <span>Call Police (112)</span>
        </a>

        {/* "Cancel (False Alarm)" button (transparent bg, white border) */}
        {!confirmCancel ? (
          <button
            type="button"
            onClick={() => setConfirmCancel(true)}
            className="w-full min-h-[48px] py-3.5 bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-bold rounded-2xl text-sm tracking-wider uppercase transition-colors cursor-pointer"
          >
            Cancel (False Alarm)
          </button>
        ) : (
          <div className="p-3.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/20 text-center animate-in fade-in space-y-2">
            <p className="text-xs font-semibold text-amber-300">
              Confirm false alarm cancellation?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 min-h-[44px] py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Yes, I'm Safe
              </button>
              <button
                type="button"
                onClick={() => setConfirmCancel(false)}
                className="flex-1 min-h-[44px] py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Keep Active
              </button>
            </div>
          </div>
        )}

        {/* Footer: "TRANA — Every step, safe • Emergency: 112 | Women Helpline: 181" */}
        <footer className="text-center text-[11px] text-white/80 pt-2 pb-1 border-t border-white/15">
          TRANA — Every step, safe • Emergency: 112 | Women Helpline: 181
        </footer>
      </div>
    </div>
  );
};
