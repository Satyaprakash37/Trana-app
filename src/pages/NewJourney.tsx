import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation2, 
  Clock, 
  Shield, 
  Users, 
  ChevronDown, 
  Calendar,
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react';
import { getContacts, setJourneyHistory, getJourneyHistory, getActiveJourney } from '../utils/storage';
import { TravelMode, Contact, JourneyHistoryItem, AppPage } from '../types';

interface NewJourneyProps {
  onNavigate: (page: AppPage) => void;
  onJourneyStarted: () => void;
}

export const NewJourney: React.FC<NewJourneyProps> = ({ onNavigate, onJourneyStarted }) => {
  const [contacts, setContactsState] = useState<Contact[]>([]);
  const [origin, setOrigin] = useState('Detecting current GPS...');
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [destination, setDestination] = useState('');
  
  // Expected Arrival (datetime-local default 35 mins from now)
  const getDefaultEta = () => {
    const d = new Date(Date.now() + 35 * 60 * 1000);
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  const [eta, setEta] = useState(getDefaultEta());
  const [interval, setInterval] = useState<number>(15); // 15, 30, 60
  const [mode, setMode] = useState<TravelMode>('Auto');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLocating, setIsLocating] = useState(true);

  useEffect(() => {
    const active = getActiveJourney();
    if (active) {
      onNavigate('activejourney');
      return;
    }

    const loadedContacts = getContacts();
    setContactsState(loadedContacts);
    setSelectedContacts(loadedContacts.map((c) => c.id));

    // Auto-detect geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setOriginCoords({ lat, lng });
          setOrigin(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
          setIsLocating(false);
        },
        (err) => {
          console.log('Location error:', err);
          const fallback = { lat: 28.6139, lng: 77.2090 };
          setOriginCoords(fallback);
          setOrigin(`Lat: ${fallback.lat.toFixed(5)}, Lng: ${fallback.lng.toFixed(5)} (Default)`);
          setIsLocating(false);
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    } else {
      const fallback = { lat: 28.6139, lng: 77.2090 };
      setOriginCoords(fallback);
      setOrigin(`Lat: ${fallback.lat.toFixed(5)}, Lng: ${fallback.lng.toFixed(5)}`);
      setIsLocating(false);
    }
  }, []);

  const toggleContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((cid) => cid !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleStartJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError('Please enter your destination.');
      return;
    }

    const now = new Date();
    const nextCheckInTime = new Date(now.getTime() + interval * 60 * 1000).toISOString();

    const newJourney: JourneyHistoryItem = {
      id: `journey_${Date.now()}`,
      destination: destination.trim(),
      startedAt: now.toISOString(),
      status: 'active',
      mode_travel: mode,
      origin: origin || 'Current Location',
      eta,
      interval,
      contacts: selectedContacts,
      lastCheckIn: now.toISOString(),
      nextCheckIn: nextCheckInTime,
      originCoords,
    };

    const history = getJourneyHistory();
    const updatedHistory = [newJourney, ...history];
    setJourneyHistory(updatedHistory);

    onJourneyStarted();
  };

  const travelModes: TravelMode[] = ['Bus', 'Train', 'Car', 'Auto', 'Walk', 'Bike'];

  return (
    <div className="min-h-screen bg-background pb-28 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* Back button + "New Journey" heading */}
        <div className="px-5 pt-6 pb-4 bg-white border-b border-slate-200/70 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-primary transition-colors cursor-pointer touch-target flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-primary font-heading">
              New Journey
            </h1>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-success border border-emerald-200">
            AI Protected
          </span>
        </div>

        {/* Form Container */}
        <form onSubmit={handleStartJourney} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-error text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Start Point (auto-detect via geolocation, show lat/lng) */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Start Point (Auto-Detected GPS)
            </label>
            <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-slate-50 min-h-[48px]">
              <MapPin className="w-4 h-4 text-success mr-2 shrink-0" />
              <input
                type="text"
                readOnly
                value={origin}
                className="w-full bg-transparent text-xs text-slate-800 font-mono font-semibold outline-none"
              />
              {isLocating && (
                <span className="inline-block w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></span>
              )}
            </div>
          </div>

          {/* Destination input (text) */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Destination <span className="text-error">*</span>
            </label>
            <div className="flex items-center border border-slate-300 focus-within:border-primary rounded-2xl px-3.5 py-3 bg-white min-h-[48px] transition-colors">
              <MapPin className="w-4 h-4 text-error mr-2 shrink-0" />
              <input
                type="text"
                placeholder="e.g. Connaught Place / Home"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 font-medium outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Expected Arrival (datetime-local picker) */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Expected Arrival (ETA)
            </label>
            <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-slate-50 min-h-[48px]">
              <Calendar className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
              <input
                type="datetime-local"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 font-semibold outline-none"
              />
            </div>
          </div>

          {/* Check-in Interval (3 buttons: 15/30/60 min) */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Check-in Interval
              </label>
              <span className="text-xs font-bold text-secondary">
                {interval} min
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setInterval(mins)}
                  className={`min-h-[48px] py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                    interval === mins
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Travel Mode (dropdown: Bus/Train/Car/Auto/Walk/Bike) */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Travel Mode
            </label>
            <div className="relative">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as TravelMode)}
                className="w-full min-h-[48px] appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-2xl px-4 py-3 outline-none focus:border-primary cursor-pointer"
              >
                {travelModes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Trusted Contacts multi-select (from trana_contacts, show name+phone, checkbox) */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Trusted Contacts ({selectedContacts.length})
              </label>
              <button
                type="button"
                onClick={() => onNavigate('contacts')}
                className="text-xs font-semibold text-secondary hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>

            {contacts.length === 0 ? (
              /* Yellow warning if no contacts */
              <div className="p-3.5 bg-yellow-50 border border-yellow-200 rounded-2xl text-xs text-warning flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">No contacts yet. Add from Contacts tab.</p>
                  <button
                    type="button"
                    onClick={() => onNavigate('contacts')}
                    className="mt-1 text-xs font-bold text-primary underline"
                  >
                    Go to Contacts tab
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {contacts.map((contact) => {
                  const isChecked = selectedContacts.includes(contact.id);
                  return (
                    <div
                      key={contact.id}
                      onClick={() => toggleContact(contact.id)}
                      className={`min-h-[48px] p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-success/40 bg-emerald-50/60'
                          : 'border-slate-200 bg-slate-50 opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-success shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-bold text-primary">{contact.name}</p>
                          <p className="text-[11px] text-muted">+91 {contact.phone}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                        {contact.relation}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* "Start Journey" button (success bg) */}
          <button
            type="submit"
            className="w-full min-h-[48px] py-4 bg-success hover:bg-[#386d49] text-white font-bold rounded-2xl shadow-lg shadow-success/25 transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shield className="w-5 h-5" />
            <span>Start Journey</span>
          </button>
        </form>
      </div>
    </div>
  );
};
