export type Gender = 'Female' | 'Male' | 'Other';

export interface UserProfile {
  name: string;
  age: string | number;
  gender: Gender;
  phone?: string;
}

export type RelationType = 
  | 'Family'
  | 'Mother'
  | 'Father'
  | 'Sister'
  | 'Brother'
  | 'Friend'
  | 'Spouse'
  | 'Other'
  | string;

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: RelationType;
  verified: boolean;
}

export type TravelMode = 'Bus' | 'Train' | 'Car' | 'Auto' | 'Walk' | 'Bike';

export interface JourneyHistoryItem {
  id: string;
  destination: string;
  startedAt: string;
  endedAt?: string;
  status: 'active' | 'completed' | 'cancelled';
  mode_travel: TravelMode;
  duration?: string;
  // Additional runtime fields for live journey tracking
  origin?: string;
  eta?: string;
  interval?: number; // 15, 30, 60 mins
  contacts?: string[]; // Contact IDs
  lastCheckIn?: string;
  nextCheckIn?: string;
  originCoords?: {
    lat: number;
    lng: number;
  };
}

export interface TranaEvent {
  type: string;
  location_lat?: number;
  location_lng?: number;
  timestamp: string;
  status: 'active' | 'resolved' | 'cancelled';
  details?: string;
}

export interface RiskLogEntry {
  lat: number;
  lng: number;
  score: number; // 0-100
  timestamp: string;
  poiCount?: number;
  zoneLevel?: 'SAFE' | 'MODERATE' | 'HIGH RISK';
}

export type LifesaverRank = 'Beginner' | 'Helper' | 'Supporter' | 'Guardian' | 'Lifesaver';

export type AppPage = 
  | 'landing'
  | 'login' 
  | 'profile' 
  | 'home' 
  | 'newjourney' 
  | 'activejourney' 
  | 'contacts' 
  | 'sos' 
  | 'settings' 
  | 'history';
