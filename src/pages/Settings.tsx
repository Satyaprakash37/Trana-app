import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  HeartHandshake, 
  LogOut, 
  ShieldCheck, 
  Edit3, 
  Info,
  Check
} from 'lucide-react';
import { 
  getProfile, 
  getPhone, 
  isVolunteer, 
  setVolunteer, 
  clearAllData, 
  getLivesHelped, 
  getCoins, 
  getLifesaverRank 
} from '../utils/storage';
import { AppPage } from '../types';

interface SettingsProps {
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
  onEditProfile: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate, onLogout, onEditProfile }) => {
  const [profile, setProfileState] = useState(getProfile());
  const [phone, setPhoneState] = useState(getPhone());
  const [volunteerStatus, setVolunteerStatus] = useState(isVolunteer());
  const [livesHelped, setLivesHelpedState] = useState(getLivesHelped());
  const [coins, setCoinsState] = useState(getCoins());
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setProfileState(getProfile());
    setPhoneState(getPhone());
    setVolunteerStatus(isVolunteer());
    setLivesHelpedState(getLivesHelped());
    setCoinsState(getCoins());
  }, []);

  const handleToggleVolunteer = () => {
    const nextVal = !volunteerStatus;
    setVolunteerStatus(nextVal);
    setVolunteer(nextVal);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out? All local session data will be reset.')) {
      clearAllData();
      onLogout();
    }
  };

  const rankInfo = getLifesaverRank(livesHelped);

  return (
    <div className="min-h-screen bg-background pb-28 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* Back button + "Settings" heading */}
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
              Settings
            </h1>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            v1.0.0
          </span>
        </header>

        {showToast && (
          <div className="mx-4 mt-3 p-3 bg-primary text-white rounded-2xl shadow-md text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>
              {volunteerStatus 
                ? 'Volunteer mode active: You will be alerted for nearby emergencies.' 
                : 'Volunteer mode turned off.'}
            </span>
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* Profile Section (name, phone, age, gender) + "Edit Profile" button */}
          <section className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">
                    {profile?.name || 'Priya Sharma'}
                  </h3>
                  <p className="text-xs text-muted">
                    {phone || '+91 9876543210'}
                  </p>
                </div>
              </div>

              {/* Edit Profile icon button */}
              <button
                type="button"
                onClick={onEditProfile}
                className="p-2 text-secondary hover:bg-amber-50 rounded-xl transition-colors cursor-pointer touch-target flex items-center justify-center"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3.5">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Age</span>
                <p className="text-sm font-bold text-primary mt-0.5">{profile?.age ? `${profile.age} yrs` : '22 yrs'}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Gender</span>
                <p className="text-sm font-bold text-primary mt-0.5">{profile?.gender || 'Female'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onEditProfile}
              className="mt-3.5 w-full min-h-[48px] py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Profile</span>
            </button>
          </section>

          {/* "Become a Volunteer" toggle → trana_is_volunteer */}
          <section className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-secondary flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">Become a Volunteer</h3>
                  <p className="text-xs text-muted mt-0.5 max-w-[200px]">
                    Lend immediate help to nearby sisters in distress before police arrives.
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={handleToggleVolunteer}
                className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer touch-target ${
                  volunteerStatus ? 'bg-success' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transition-transform transform ${
                    volunteerStatus ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {volunteerStatus && (
              <div className="mt-3 p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-success flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Enrolled in Local First-Responder Mesh</span>
              </div>
            )}
          </section>

          {/* Lifesaver Rank details */}
          <section className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Community Impact</span>
              <h4 className="text-sm font-bold text-primary mt-0.5">{rankInfo.rank} Guardian</h4>
              <p className="text-xs text-muted">{livesHelped} lives helped • {coins} TC</p>
            </div>
            <div className="px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-secondary font-bold text-xs">
              💎 {coins} Coins
            </div>
          </section>

          {/* About: "TRANA v1.0.0 — Police se pehle, apahe log." */}
          <section className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-center">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-indigo-50 text-primary flex items-center justify-center mb-2">
              <Info className="w-5 h-5 text-secondary" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
              About TRANA
            </h4>
            <p className="text-sm font-bold text-primary mt-1 font-heading">
              TRANA v1.0.0 — Police se pehle, apahe log.
            </p>
            <p className="text-xs text-muted mt-1">
              "Every step, safe" • Women safety companion PWA
            </p>
          </section>

          {/* "View TRANA Landing Page & Mission" button */}
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="w-full min-h-[48px] py-3.5 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>View TRANA Landing Page & Mission</span>
          </button>

          {/* "Logout" button (error bg, white text) → clear ALL trana_* from localStorage → go to Landing */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full min-h-[48px] py-3.5 bg-error hover:bg-[#b02c41] text-white font-bold rounded-2xl shadow-lg shadow-error/25 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
