import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Navigation, 
  Calendar 
} from 'lucide-react';
import { getJourneyHistory } from '../utils/storage';
import { JourneyHistoryItem, AppPage } from '../types';

interface HistoryProps {
  onNavigate: (page: AppPage) => void;
}

export const History: React.FC<HistoryProps> = ({ onNavigate }) => {
  const [journeys, setJourneys] = useState<JourneyHistoryItem[]>([]);

  useEffect(() => {
    const list = getJourneyHistory();
    // Sort by most recent first
    list.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
    setJourneys(list);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getModeEmoji = (mode: string) => {
    switch (mode) {
      case 'Bus': return '🚌';
      case 'Train': return '🚆';
      case 'Car': return '🚗';
      case 'Auto': return '🛺';
      case 'Walk': return '🚶';
      case 'Bike': return '🏍️';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* Back button + "Journey History" heading */}
        <header className="px-5 pt-6 pb-4 bg-white border-b border-slate-200/70 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-primary transition-colors cursor-pointer touch-target flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-primary font-heading">
              Journey History
            </h1>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {journeys.length} {journeys.length === 1 ? 'Trip' : 'Trips'}
          </span>
        </header>

        {/* List of past journeys from trana_journey_history */}
        <div className="p-5 space-y-3.5">
          {journeys.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200/80 text-center shadow-xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 text-secondary flex items-center justify-center text-3xl">
                📜
              </div>
              <h3 className="text-base font-bold text-primary font-heading">
                No journeys yet. Start your first journey!
              </h3>
              <p className="text-xs text-muted max-w-xs mx-auto mt-1 mb-5">
                Every time you travel with TRANA's active safety tracking, your routes will be listed here.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('newjourney')}
                className="min-h-[48px] py-3 px-6 bg-secondary hover:bg-[#e88825] text-white font-bold rounded-2xl text-xs shadow-md transition-all cursor-pointer"
              >
                Start a Journey
              </button>
            </div>
          ) : (
            journeys.map((j) => (
              <div
                key={j.id}
                className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Each card: destination, date, status (completed/active), mode, duration */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                      {getModeEmoji(j.mode_travel)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary">
                        {j.destination}
                      </h4>
                      <p className="text-[11px] text-muted">
                        Mode: {j.mode_travel}
                      </p>
                    </div>
                  </div>

                  {/* Status: completed / active / cancelled */}
                  <div>
                    {j.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-success border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                    {j.status === 'active' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-secondary border border-amber-200 animate-pulse">
                        <Navigation className="w-3 h-3" />
                        Active
                      </span>
                    )}
                    {j.status === 'cancelled' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 text-xs text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(j.startedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">
                      {j.duration || 'Ongoing'}
                    </span>
                    {j.status === 'active' && (
                      <button
                        type="button"
                        onClick={() => onNavigate('activejourney')}
                        className="text-xs font-bold text-secondary hover:underline cursor-pointer"
                      >
                        View &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* "Back" button */}
      <div className="px-5 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="w-full min-h-[48px] py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};
