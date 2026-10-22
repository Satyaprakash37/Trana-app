import React from 'react';
import { Home, MapPin, Users } from 'lucide-react';
import { AppPage } from '../types';

interface BottomNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  hasActiveJourney?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  hasActiveJourney = false,
}) => {
  const isJourneyActive = currentPage === 'newjourney' || currentPage === 'activejourney';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] max-w-md mx-auto">
      <div className="flex justify-around items-center h-16 px-4">
        {/* Home 🏠 */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`min-h-[48px] min-w-[64px] flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            currentPage === 'home'
              ? 'text-secondary font-bold scale-105'
              : 'text-slate-500 hover:text-primary'
          }`}
        >
          <Home className={`w-5 h-5 mb-1 ${currentPage === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] tracking-wide">Home</span>
        </button>

        {/* Journey 🗺️ */}
        <button
          type="button"
          onClick={() => onNavigate(hasActiveJourney ? 'activejourney' : 'newjourney')}
          className={`min-h-[48px] min-w-[64px] flex flex-col items-center justify-center py-1 transition-all relative cursor-pointer ${
            isJourneyActive
              ? 'text-secondary font-bold scale-105'
              : 'text-slate-500 hover:text-primary'
          }`}
        >
          {hasActiveJourney && (
            <span className="absolute top-1 right-5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
          )}
          <MapPin className={`w-5 h-5 mb-1 ${isJourneyActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] tracking-wide">Journey</span>
        </button>

        {/* Contacts 👥 */}
        <button
          type="button"
          onClick={() => onNavigate('contacts')}
          className={`min-h-[48px] min-w-[64px] flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            currentPage === 'contacts'
              ? 'text-secondary font-bold scale-105'
              : 'text-slate-500 hover:text-primary'
          }`}
        >
          <Users className={`w-5 h-5 mb-1 ${currentPage === 'contacts' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] tracking-wide">Contacts</span>
        </button>
      </div>
    </nav>
  );
};
