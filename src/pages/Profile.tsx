import React, { useState } from 'react';
import { User, Calendar, Check, AlertCircle } from 'lucide-react';
import { getProfile, setProfile, getPhone } from '../utils/storage';
import { Gender, UserProfile, AppPage } from '../types';

interface ProfileProps {
  onSaveSuccess: (nextPage: AppPage) => void;
  isEditing?: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ onSaveSuccess, isEditing = false }) => {
  const existing = getProfile();
  const phone = getPhone();
  const [name, setName] = useState(existing?.name || '');
  const [age, setAge] = useState(existing?.age?.toString() || '');
  const [gender, setGender] = useState<Gender | ''>(existing?.gender || 'Female');
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please provide a valid age between 1 and 120.');
      return;
    }
    if (!gender) {
      setError('Please select a gender.');
      return;
    }

    setError('');
    const profileData: UserProfile = {
      name: name.trim(),
      age: ageNum,
      gender: gender as Gender,
      phone: phone || undefined,
    };

    setProfile(profileData);
    setSavedSuccess(true);

    setTimeout(() => {
      onSaveSuccess('home');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-[#16223b] to-[#0d1424] flex flex-col justify-center items-center px-4 py-8">
      {/* Brand header */}
      <div className="w-full max-w-sm mb-4 text-center">
        <h1 className="text-[28px] font-bold text-white font-heading">
          Profile Setup
        </h1>
        <p className="text-muted text-sm mt-0.5">
          Tell us about yourself
        </p>
      </div>

      {/* White rounded card */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-error text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-error">*</span>
            </label>
            <div className="flex items-center border border-slate-300 focus-within:border-primary rounded-2xl px-3.5 py-3 bg-slate-50 min-h-[48px] transition-colors">
              <input
                type="text"
                placeholder="Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-slate-900 font-medium outline-none text-sm"
                autoFocus
              />
              <User className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Age <span className="text-error">*</span>
            </label>
            <div className="flex items-center border border-slate-300 focus-within:border-primary rounded-2xl px-3.5 py-3 bg-slate-50 min-h-[48px] transition-colors">
              <input
                type="number"
                placeholder="22"
                min={1}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-transparent text-slate-900 font-medium outline-none text-sm"
              />
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Gender <span className="text-error">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Female', 'Male', 'Other'] as Gender[]).map((opt) => {
                const isSelected = gender === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGender(opt)}
                    className={`min-h-[48px] py-2.5 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savedSuccess}
              className="w-full min-h-[48px] py-3.5 bg-primary hover:bg-[#283e6b] text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save & Continue</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5 text-center text-xs text-muted">
        <span>Emergency contact telemetry configured locally</span>
      </div>
    </div>
  );
};
