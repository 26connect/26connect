
export enum ActivityType {
  MOMENT = 'MOMENT',
  CARPOOL = 'CARPOOL',
  HELP = 'HELP',
  ALERT = 'ALERT',
  USER = 'USER'
}

export enum ExchangeType {
  FREE = 'FREE',
  PRICE = 'PRICE',
  BARTER = 'BARTER' // Troc
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  badges: string[];
  cantonsVisited: number;
}

export interface MarkerItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  distance: string;
  user: User;
  x: number; // Percentage for mock map positioning (0-100)
  y: number; // Percentage for mock map positioning (0-100)
  participants: number;
  maxParticipants: number;
  
  // NOUVEAU: Gestion financière / Troc
  exchangeType: ExchangeType;
  price?: number;          
  barterRequest?: string;  // Ex: "Contre une pizza"
  
  createdAt: number;
}

export interface Canton {
  id: string;
  name: string;
  code: string;
  status: 'visited' | 'active' | 'locked';
  color: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
