import React, { useState } from 'react';
import { ShieldCheck, Phone, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { setLoggedIn, setPhone, getProfile } from '../utils/storage';
import { AppPage } from '../types';

interface LoginProps {
  onLoginSuccess: (nextPage: AppPage) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
    }, 500);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const cleanDigit = val.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanDigit;
    setOtp(newOtp);

    // Auto focus next input
    if (cleanDigit && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // In dev mode, any 10-digit phone + any 6-digit OTP is accepted
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      setPhone(cleanPhone);
      setLoggedIn(true);
      setIsLoading(false);

      // Save to localStorage, then go to Profile as specified
      const existingProfile = getProfile();
      if (existingProfile && existingProfile.name) {
        onLoginSuccess('profile'); // or profile setup
      } else {
        onLoginSuccess('profile');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-[#16223b] to-[#0d1424] flex flex-col justify-center items-center px-4 py-8">
      {/* Brand area */}
      <div className="flex flex-col items-center mb-6 text-center animate-fade-in">
        {/* Shield 🛡️ logo (80px circle, primary bg) */}
        <div className="w-[80px] h-[80px] rounded-full bg-primary border-2 border-secondary shadow-[0_8px_30px_rgba(255,153,51,0.25)] flex items-center justify-center mb-3">
          <ShieldCheck className="w-10 h-10 text-secondary" />
        </div>
        
        {/* "TRANA" heading (Playfair, 30px, bold) */}
        <h1 className="text-[30px] font-bold text-white font-heading tracking-wide">
          TRANA
        </h1>
        
        {/* "Every step, safe" subtitle (muted) */}
        <p className="text-muted text-sm font-medium tracking-wider mt-0.5">
          Every step, safe
        </p>
      </div>

      {/* White rounded card */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20">
        {!isOtpSent ? (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-primary font-heading">
                Mobile Sign In
              </h2>
              <p className="text-muted text-xs mt-1">
                Enter your 10-digit mobile number to proceed
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-error text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Number
                </label>
                <div className="flex items-center border-2 border-slate-200 focus-within:border-secondary rounded-2xl px-3 py-2.5 transition-colors bg-slate-50 min-h-[48px]">
                  <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-300 text-slate-700 font-semibold text-sm">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-3 bg-transparent text-slate-900 font-semibold tracking-wider outline-none text-base"
                    autoFocus
                  />
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-warning flex items-center gap-1.5">
                <span className="font-bold">Dev Mode:</span>
                <span>Any 10-digit number accepted</span>
              </div>

              <button
                type="submit"
                disabled={isLoading || phoneNumber.length < 10}
                className="w-full min-h-[48px] py-3.5 px-4 bg-primary hover:bg-[#283e6b] disabled:bg-slate-300 text-white font-semibold rounded-2xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-primary font-semibold mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Number</span>
              </button>

              <h2 className="text-xl font-bold text-primary font-heading">
                Enter OTP
              </h2>
              <p className="text-muted text-xs mt-0.5">
                Sent to <span className="font-semibold text-primary">+91 {phoneNumber}</span>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-error text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  6-Digit OTP Code
                </label>
                <div className="flex justify-between gap-1.5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-11 h-12 text-center text-2xl font-bold text-primary bg-slate-50 border-2 border-slate-200 focus:border-secondary rounded-xl outline-none transition-all shadow-inner"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-success flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Dev Mode: Any 6 digits accepted (e.g. 123456)</span>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join('').length < 6}
                className="w-full min-h-[48px] py-3.5 px-4 bg-secondary hover:bg-[#e88825] disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg shadow-secondary/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Verify</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2.5 text-center text-xs text-muted">
        <button
          type="button"
          onClick={() => onLoginSuccess('landing')}
          className="text-slate-300 hover:text-white underline cursor-pointer font-semibold transition-colors"
        >
          ← Back to Landing
        </button>
        <span>Protected with TRANA emergency safety response</span>
      </div>
    </div>
  );
};
