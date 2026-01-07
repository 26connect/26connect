
import { ActivityType, Canton, MarkerItem, User, Message, ExchangeType } from './types';

export const MOCK_USER: User = {
  id: 'me',
  name: 'Sophie',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  isVerified: true,
  rating: 4.8,
  badges: ['Eco-Warrior', 'Super Voisin'],
  cantonsVisited: 7
};

export const CANTONS: Canton[] = [
  { id: '1', name: 'Vaud', code: 'VD', status: 'active', color: '#2A9D8F' },
  { id: '2', name: 'Genève', code: 'GE', status: 'visited', color: '#0066CC' },
  { id: '3', name: 'Valais', code: 'VS', status: 'visited', color: '#FF0000' },
  { id: '4', name: 'Zürich', code: 'ZH', status: 'locked', color: '#CBD5E1' },
  { id: '5', name: 'Bern', code: 'BE', status: 'locked', color: '#CBD5E1' },
  { id: '6', name: 'Fribourg', code: 'FR', status: 'visited', color: '#1D3557' },
];

export const MAP_ITEMS: MarkerItem[] = [
  {
    id: '1',
    type: ActivityType.MOMENT,
    title: 'Yoga au bord du lac',
    description: 'Séance détente au coucher du soleil. Tous niveaux bienvenus !',
    time: 'Dans 20 min',
    distance: '300m',
    x: 45,
    y: 40,
    participants: 3,
    maxParticipants: 10,
    exchangeType: ExchangeType.FREE,
    price: 0,
    createdAt: Date.now(),
    user: { ...MOCK_USER, name: 'Camille', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
  },
  {
    id: '2',
    type: ActivityType.CARPOOL,
    title: 'Lausanne → Genève',
    description: 'Départ imminent, je passe par la gare. Participation aux frais demandée.',
    time: 'Départ 18h15',
    distance: '1.2km',
    x: 60,
    y: 55,
    participants: 1,
    maxParticipants: 3,
    exchangeType: ExchangeType.PRICE,
    price: 12, // CHF
    createdAt: Date.now(),
    user: { ...MOCK_USER, name: 'Marc', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
  },
  {
    id: '3',
    type: ActivityType.HELP,
    title: 'Monter une armoire',
    description: 'Besoin de bras forts pour monter une armoire IKEA. Pizza offerte !',
    time: 'Maintenant',
    distance: '50m',
    x: 30,
    y: 50,
    participants: 0,
    maxParticipants: 2,
    exchangeType: ExchangeType.BARTER,
    barterRequest: 'Pizza + Bière',
    price: 0,
    createdAt: Date.now(),
    user: { ...MOCK_USER, name: 'Thomas', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
  },
  {
    id: '4',
    type: ActivityType.ALERT,
    title: 'Déchets sauvages',
    description: 'Dépôt illégal près du parc. Signalé à la commune.',
    time: 'Il y a 10 min',
    distance: '500m',
    x: 75,
    y: 30,
    participants: 0,
    maxParticipants: 0,
    exchangeType: ExchangeType.FREE,
    createdAt: Date.now(),
    user: { ...MOCK_USER, name: 'Julie', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'Marc', text: 'Salut Sophie ! Je pars dans 5 min.', time: '18:10', isMe: false },
  { id: '2', sender: 'Sophie', text: 'Parfait, je suis à l\'arrêt de bus.', time: '18:11', isMe: true },
  { id: '3', sender: 'Marc', text: 'Top, à toute de suite !', time: '18:12', isMe: false },
];
