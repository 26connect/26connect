
export enum AppTab {
  MOI = 'MOI',
  MAINTENANT = 'MAINTENANT',
  MOMENTS = 'MOMENTS',
  ENTRAIDE = 'ENTRAIDE',
  TRAJETS = 'TRAJETS'
}

export enum ServiceType {
  MOMENTS = 'MOMENTS',
  RIDE = 'RIDE',
  HELP = 'HELP'
}

export type Language = 'FR' | 'EN' | 'DE' | 'IT' | 'ES' | 'RM';

export type PaymentProvider = 'APPLE_PAY' | 'GOOGLE_PAY' | 'TWINT' | 'STRIPE' | 'PAYPAL';

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  date: string;
  status: TransactionStatus;
}

export type Vibe = 'SILENT' | 'CHATTY' | 'MUSIC' | 'BUSINESS' | 'DATING' | 'PARTY' | 'NATURE' | 'SPORT';

export interface Notification {
  id: string;
  type: 'ACCEPT' | 'MESSAGE' | 'INFO' | 'ALERT';
  title: string;
  message: string;
  date: string;
  read: boolean;
  targetId?: string; // ID de l'activité ou user lié
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  canton: string;
  email?: string;
  bio?: string;
  intention?: string; // ID of the Intention (e.g., 'i1', 'i3')
  badges: Badge[];
  isSosActive?: boolean;
  sosContacts?: string[]; // IDs
  sosPhone?: string; 
  isPremium?: boolean;
}

export interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}

export interface Candidate {
  user: User;
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
  message?: string;
}

export interface InstantPost {
  id: string;
  user: User;
  mainImage: string;
  selfieImage: string;
  postedAt: string;
  location: string;
  late: boolean;
}

// Support pour le chat de groupe
export interface ChatContext {
    id: string;
    type: 'DIRECT' | 'GROUP';
    title: string;
    avatar: string;
    participants?: string; // ex: "Alice, Bob..."
}

export interface Message {
    id: number;
    text: string;
    senderId: string; // 'me' ou userId
    senderName?: string;
    timestamp: number;
}

export interface Activity {
  id: string;
  type: 'EVENT' | 'RIDE' | 'HELP';
  subtype?: 'OFFER' | 'REQUEST'; 
  title: string;
  subtitle?: string; 
  date: string;
  time: string;
  endTime?: string; // Fin pour events
  arrivalTime?: string; // Arrivée pour trajets
  
  // Status Logic
  myStatus?: 'ORGANIZER' | 'PARTICIPANT' | 'WAITING' | 'NONE';
  candidates?: Candidate[]; 

  // Finance
  priceMode?: 'GRATUIT' | 'PAYANT_TWINT' | 'PAYANT_CASH' | 'TROC' | 'BUDGET';
  priceValue?: string; 
  currency?: string; 
  exchangeDetails?: string;

  participants: number;
  maxParticipants?: number;
  image?: string;
  organizer: User;
  description?: string;
  category?: string;
  
  // Vibe / Ambiance
  vibe?: Vibe;

  // Entraide Spécifique
  urgency?: 'NORMAL' | 'PRIORITY' | 'SOS';
  
  // Trajets Spécifiques
  pickupLocation?: string; 
  dropoffLocation?: string; 
  vehicleModel?: string; 
  licensePlate?: string; 
  baggage?: boolean;
  animals?: boolean;
  isDriver?: boolean;
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  type: 'USER' | 'ACTIVITY';
  data: any;
}

export interface Intention {
  id: string;
  label: string;
  icon: string;
  color: string;
}
