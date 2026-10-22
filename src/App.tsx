import React, { useState, useEffect } from 'react';
import { 
  isLoggedIn, 
  getProfile, 
  getActiveJourney 
} from './utils/storage';
import { AppPage } from './types';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';
import { NewJourney } from './pages/NewJourney';
import { ActiveJourney } from './pages/ActiveJourney';
import { Contacts } from './pages/Contacts';
import { SOS } from './pages/SOS';
import { Settings } from './pages/Settings';
import { History } from './pages/History';

// Navigation
import { BottomNav } from './components/BottomNav';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    // On first visit (no trana_logged_in), show Landing page instead of Login
    if (!isLoggedIn()) {
      return 'landing';
    }
    const profile = getProfile();
    if (!profile || !profile.name) {
      return 'profile';
    }
    return 'home';
  });

  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [hasActiveJourney, setHasActiveJourney] = useState<boolean>(false);

  // Sync active journey state periodically
  useEffect(() => {
    const checkActive = () => {
      const active = getActiveJourney();
      setHasActiveJourney(!!active);
    };
    checkActive();
    const interval = setInterval(checkActive, 2000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const handleNavigate = (page: AppPage) => {
    setIsEditingProfile(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerSOS = () => {
    setCurrentPage('sos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setCurrentPage('profile');
  };

  const showBottomNav = ['home', 'newjourney', 'activejourney', 'contacts'].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between selection:bg-[#FF9933] selection:text-white">
      <main className={`flex-1 w-full ${currentPage === 'landing' ? 'w-full' : 'max-w-md mx-auto'}`}>
        {currentPage === 'landing' && (
          <Landing onLaunchDemo={() => handleNavigate('login')} />
        )}

        {currentPage === 'login' && (
          <div>
            <div className="pt-3 px-4 max-w-sm mx-auto flex items-center justify-between text-xs text-slate-300">
              <button
                type="button"
                onClick={() => handleNavigate('landing')}
                className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>← Back to Overview</span>
              </button>
            </div>
            <Login onLoginSuccess={(nextPage) => handleNavigate(nextPage)} />
          </div>
        )}

        {currentPage === 'profile' && (
          <Profile 
            isEditing={isEditingProfile} 
            onSaveSuccess={(nextPage) => handleNavigate(nextPage)} 
          />
        )}

        {currentPage === 'home' && (
          <Home 
            onNavigate={handleNavigate} 
            onTriggerSOS={handleTriggerSOS} 
          />
        )}

        {currentPage === 'newjourney' && (
          <NewJourney 
            onNavigate={handleNavigate} 
            onJourneyStarted={() => handleNavigate('activejourney')} 
          />
        )}

        {currentPage === 'activejourney' && (
          <ActiveJourney 
            onNavigate={handleNavigate} 
            onTriggerSOS={handleTriggerSOS} 
          />
        )}

        {currentPage === 'contacts' && (
          <Contacts onNavigate={handleNavigate} />
        )}

        {currentPage === 'sos' && (
          <SOS onCancel={handleNavigate} />
        )}

        {currentPage === 'settings' && (
          <div>
            <Settings 
              onNavigate={handleNavigate} 
              onLogout={handleLogout} 
              onEditProfile={handleEditProfile} 
            />
            <div className="px-5 pb-6 text-center">
              <button
                type="button"
                onClick={() => handleNavigate('landing')}
                className="text-xs font-semibold text-slate-500 hover:text-primary underline cursor-pointer"
              >
                View TRANA Landing Page & Mission
              </button>
            </div>
          </div>
        )}

        {currentPage === 'history' && (
          <History onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent Bottom Navigation for primary mobile app screens */}
      {showBottomNav && (
        <BottomNav 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          hasActiveJourney={hasActiveJourney} 
        />
      )}
    </div>
  );
};

export default App;
