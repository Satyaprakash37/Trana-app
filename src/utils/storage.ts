import { 
  UserProfile, 
  Contact, 
  JourneyHistoryItem, 
  TranaEvent, 
  RiskLogEntry, 
  LifesaverRank 
} from '../types';

export const STORAGE_KEYS = {
  LOGGED_IN: 'trana_logged_in',
  PHONE: 'trana_phone',
  PROFILE: 'trana_profile',
  CONTACTS: 'trana_contacts',
  JOURNEY_HISTORY: 'trana_journey_history',
  EVENTS: 'trana_events',
  COINS: 'trana_coins',
  LIVES_HELPED: 'trana_lives_helped',
  IS_VOLUNTEER: 'trana_is_volunteer',
  RISK_LOG: 'trana_risk_log',
} as const;

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.LOGGED_IN) === 'true';
};

export const setLoggedIn = (val: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.LOGGED_IN, val ? 'true' : 'false');
};

export const getPhone = (): string => {
  return localStorage.getItem(STORAGE_KEYS.PHONE) || '';
};

export const setPhone = (phone: string): void => {
  // Ensure +91 prefix
  const cleaned = phone.replace(/[^\d+]/g, '');
  const formatted = cleaned.startsWith('+91') 
    ? cleaned 
    : `+91${cleaned.replace(/^0+/, '')}`;
  localStorage.setItem(STORAGE_KEYS.PHONE, formatted);
};

export const getProfile = (): UserProfile | null => {
  const profileStr = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!profileStr) return null;
  try {
    return JSON.parse(profileStr);
  } catch {
    return null;
  }
};

export const setProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getContacts = (): Contact[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const setContacts = (contacts: Contact[]): void => {
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
};

export const getCoins = (): number => {
  const c = localStorage.getItem(STORAGE_KEYS.COINS);
  return c !== null ? parseInt(c, 10) || 0 : 0;
};

export const setCoins = (coins: number): void => {
  localStorage.setItem(STORAGE_KEYS.COINS, coins.toString());
};

export const addCoins = (amount: number): number => {
  const current = getCoins();
  const updated = current + amount;
  setCoins(updated);
  return updated;
};

export const getLivesHelped = (): number => {
  const l = localStorage.getItem(STORAGE_KEYS.LIVES_HELPED);
  return l !== null ? parseInt(l, 10) || 0 : 0;
};

export const setLivesHelped = (lives: number): void => {
  localStorage.setItem(STORAGE_KEYS.LIVES_HELPED, lives.toString());
};

export const isVolunteer = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.IS_VOLUNTEER) === 'true';
};

export const setVolunteer = (val: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.IS_VOLUNTEER, val ? 'true' : 'false');
};

export const getJourneyHistory = (): JourneyHistoryItem[] => {
  const data = localStorage.getItem(STORAGE_KEYS.JOURNEY_HISTORY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const setJourneyHistory = (history: JourneyHistoryItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.JOURNEY_HISTORY, JSON.stringify(history));
};

export const getActiveJourney = (): JourneyHistoryItem | null => {
  const list = getJourneyHistory();
  return list.find((j) => j.status === 'active') || null;
};

export const getEvents = (): TranaEvent[] => {
  const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const addEvent = (event: TranaEvent): void => {
  const list = getEvents();
  list.unshift(event);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
};

export const getRiskLog = (): RiskLogEntry[] => {
  const data = localStorage.getItem(STORAGE_KEYS.RISK_LOG);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const addRiskLogEntry = (entry: RiskLogEntry): void => {
  const list = getRiskLog();
  list.unshift(entry);
  // Keep last 50 logs for performance
  localStorage.setItem(STORAGE_KEYS.RISK_LOG, JSON.stringify(list.slice(0, 50)));
};

export const getLifesaverRank = (lives: number): { 
  rank: LifesaverRank; 
  color: string; 
  badgeClass: string; 
  min: number; 
  next: number | null 
} => {
  if (lives >= 30) {
    return { 
      rank: 'Lifesaver', 
      color: '#D97706', 
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300', 
      min: 30, 
      next: null 
    };
  } else if (lives >= 15) {
    return { 
      rank: 'Guardian', 
      color: '#7C3AED', 
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-300', 
      min: 15, 
      next: 30 
    };
  } else if (lives >= 5) {
    return { 
      rank: 'Supporter', 
      color: '#2563EB', 
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300', 
      min: 5, 
      next: 15 
    };
  } else if (lives >= 1) {
    return { 
      rank: 'Helper', 
      color: '#438158', 
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', 
      min: 1, 
      next: 5 
    };
  } else {
    return { 
      rank: 'Beginner', 
      color: '#787F83', 
      badgeClass: 'bg-gray-100 text-gray-700 border-gray-300', 
      min: 0, 
      next: 1 
    };
  }
};

export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
};
