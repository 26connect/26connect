
import { Activity, User, Intention, Candidate, Language, Notification, Vibe, InstantPost, PaymentProvider } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  FR: { 
    nav: { moi: "Moi", now: "Maintenant", moments: "Moments", help: "Entraide", rides: "Pouce Express" },
    common: { send: "Envoyer", cancel: "Annuler", close: "Fermer", back: "Retour", next: "Suivant", confirm: "Publier" },
    auth: { welcome: "Bienvenue", login: "Se connecter", signup: "Créer un compte", email: "Email", pass: "Mot de passe" },
    profile: { 
        title: "Mon Profil", badges: "Tous les Badges", premium: "Premium", security: "Sécurité", 
        lang: "Langue", help: "Aide & Mentions", logout: "Déconnexion", settings: "Paramètres",
        stats: { cantons: "Cantons", activities: "Activités", friends: "Amis" }
    },
    map: { around: "Qui est autour de moi ?", soon: "Bientôt dans le coin", intention: "Intention" },
    services: { 
        moments: "Moments", rides: "Pouce Express", help: "Entraide",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Mes trajets", passenger: "Annonces",
        askHelp: "Demander de l'aide", offerHelp: "Proposer de l'aide",
        findRide: "Annonces", manageRide: "Mes Trajets",
        searchStart: "Départ...", searchEnd: "Arrivée...", date: "Date"
    }
  },
  EN: { 
    nav: { moi: "Me", now: "Now", moments: "Moments", help: "Help", rides: "Rides" },
    common: { send: "Send", cancel: "Cancel", close: "Close", back: "Back", next: "Next", confirm: "Publish" },
    auth: { welcome: "Welcome", login: "Login", signup: "Sign Up", email: "Email", pass: "Password" },
    profile: { 
        title: "My Profile", badges: "All Badges", premium: "Premium", security: "Security", 
        lang: "Language", help: "Help & Legal", logout: "Logout", settings: "Settings",
        stats: { cantons: "Cantons", activities: "Activities", friends: "Friends" }
    },
    map: { around: "Who is around?", soon: "Coming up nearby", intention: "Intention" },
    services: { 
        moments: "Moments", rides: "Thumb Express", help: "Community Help",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "My Rides", passenger: "Find a Ride",
        askHelp: "Ask for help", offerHelp: "Offer help",
        findRide: "Ads", manageRide: "My Rides",
        searchStart: "From...", searchEnd: "To...", date: "Date"
    }
  },
  DE: { 
    nav: { moi: "Ich", now: "Jetzt", moments: "Momente", help: "Hilfe", rides: "Fahrten" },
    common: { send: "Senden", cancel: "Abbrechen", close: "Schließen", back: "Zurück", next: "Weiter", confirm: "Veröffentlichen" },
    auth: { welcome: "Willkommen", login: "Anmelden", signup: "Registrieren", email: "E-Mail", pass: "Passwort" },
    profile: { 
        title: "Mein Profil", badges: "Alle Abzeichen", premium: "Premium", security: "Sicherheit", 
        lang: "Sprache", help: "Hilfe & Recht", logout: "Abmelden", settings: "Einstellungen",
        stats: { cantons: "Kantone", activities: "Aktivitäten", friends: "Freunde" }
    },
    map: { around: "Wer ist in der Nähe?", soon: "Bald in der Nähe", intention: "Absicht" },
    services: { 
        moments: "Momente", rides: "Daumen Express", help: "Nachbarschaftshilfe",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Meine Fahrten", passenger: "Fahrt finden",
        askHelp: "Hilfe suchen", offerHelp: "Hilfe anbieten",
        findRide: "Anzeigen", manageRide: "Meine Fahrten",
        searchStart: "Von...", searchEnd: "Nach...", date: "Datum"
    }
  },
  IT: { 
    nav: { moi: "Io", now: "Adesso", moments: "Momenti", help: "Aiuto", rides: "Passaggi" },
    common: { send: "Invia", cancel: "Annulla", close: "Chiudi", back: "Indietro", next: "Avanti", confirm: "Pubblicare" },
    auth: { welcome: "Benvenuto", login: "Accedi", signup: "Iscriviti", email: "Email", pass: "Password" },
    profile: { 
        title: "Il mio profilo", badges: "Tutti i badge", premium: "Premium", security: "Sicurezza", 
        lang: "Lingua", help: "Aiuto & Legale", logout: "Disconnettersi", settings: "Impostazioni",
        stats: { cantons: "Cantoni", activities: "Attività", friends: "Amici" }
    },
    map: { around: "Chi c'è intorno?", soon: "Presto in zona", intention: "Intenzione" },
    services: { 
        moments: "Momenti", rides: "Pollice Express", help: "Aiuto Reciproco",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "I miei passaggi", passenger: "Trova passaggio",
        askHelp: "Chiedere aiuto", offerHelp: "Offrire aiuto",
        findRide: "Annunci", manageRide: "I miei passaggi",
        searchStart: "Da...", searchEnd: "A...", date: "Data"
    }
  },
  ES: { 
    nav: { moi: "Yo", now: "Ahora", moments: "Momentos", help: "Ayuda", rides: "Viajes" },
    common: { send: "Enviar", cancel: "Cancelar", close: "Cerrar", back: "Atrás", next: "Siguiente", confirm: "Publicar" },
    auth: { welcome: "Bienvenido", login: "Iniciar sesión", signup: "Registrarse", email: "Email", pass: "Contraseña" },
    profile: { 
        title: "Mi Perfil", badges: "Todas las insignias", premium: "Premium", security: "Seguridad", 
        lang: "Idioma", help: "Ayuda y Legal", logout: "Cerrar sesión", settings: "Ajustes",
        stats: { cantons: "Cantones", activities: "Actividades", friends: "Amigos" }
    },
    map: { around: "¿Quién está cerca?", soon: "Pronto cerca", intention: "Intención" },
    services: { 
        moments: "Momentos", rides: "Dedo Express", help: "Ayuda Mutua",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Mis viajes", passenger: "Buscar viaje",
        askHelp: "Pedir ayuda", offerHelp: "Ofrecer ayuda",
        findRide: "Anuncios", manageRide: "Mis Viajes",
        searchStart: "De...", searchEnd: "A...", date: "Fecha"
    }
  }
};

export const PAYMENT_CONFIG: Record<PaymentProvider, { label: string, icon: string, color: string }> = {
    APPLE_PAY: { label: 'Apple Pay', icon: '🍎', color: 'bg-black text-white' },
    GOOGLE_PAY: { label: 'Google Pay', icon: '🇬', color: 'bg-white text-gray-900 border border-gray-200' },
    TWINT: { label: 'TWINT', icon: '📲', color: 'bg-green-600 text-white' },
    STRIPE: { label: 'Carte Bancaire', icon: '💳', color: 'bg-blue-600 text-white' },
    PAYPAL: { label: 'PayPal', icon: '🅿️', color: 'bg-[#003087] text-white' }
};

export const CGU_TEXT = `
CONDITIONS GÉNÉRALES D'UTILISATION (CGU) ET DE VENTE (CGV) - 26CONNECT

1. PRÉAMBULE
L'application 26Connect (ci-après "l'Application") est éditée par 26Connect SA, sise en Suisse. L'accès et l'utilisation de l'Application sont soumis aux présentes conditions. En créant un compte, l'Utilisateur accepte sans réserve les présentes CGU/CGV.

2. ACCÈS AU SERVICE
L'inscription est réservée aux personnes physiques majeures (18 ans révolus) et capables de discernement. L'Utilisateur garantit l'exactitude des informations fournies.

3. SÉCURITÉ ET COMPORTEMENT
26Connect favorise l'entraide et la convivialité. Tout comportement abusif, harcèlement, ou contenu illégal entraînera une suspension immédiate du compte. L'Utilisateur est seul responsable de ses interactions physiques. 26Connect ne peut être tenu responsable des incidents survenant lors des rencontres (trajets, activités).

4. GÉOLOCALISATION
L'Application utilise la géolocalisation pour connecter les membres. L'Utilisateur peut à tout moment désactiver ce partage ou passer en "Mode Fantôme". Les données de localisation ne sont pas vendues à des tiers.

5. SERVICES PAYANTS ET PREMIUM
L'abonnement Premium est facturé via les plateformes (Apple App Store / Google Play). Il est renouvelé automatiquement sauf résiliation 24h avant l'échéance.
- Droit de rétractation : Conformément à la loi, l'Utilisateur dispose d'un délai de 14 jours, sauf si le service a été pleinement exécuté avant la fin de ce délai.

6. LIMITATION DE RESPONSABILITÉ
26Connect agit comme un intermédiaire technique. Nous ne garantissons pas la véracité des annonces de covoiturage ou d'entraide.

7. DROIT APPLICABLE ET FOR
Les présentes conditions sont soumises au droit suisse. Le for juridique est établi à Lausanne, Suisse.

Dernière mise à jour : 04 Décembre 2025.
`;

export const DEFAULT_AVATARS = [
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Felix',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Grandma',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Caleb',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Leo',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Molly',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Bear',
    'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sky'
];

export const CANTON_FLAGS: Record<string, string> = {
    ZH: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Wappen_Z%C3%BCrich_matt.svg/100px-Wappen_Z%C3%BCrich_matt.svg.png',
    BE: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Wappen_Bern_matt.svg/100px-Wappen_Bern_matt.svg.png',
    LU: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wappen_Luzern_matt.svg/100px-Wappen_Luzern_matt.svg.png',
    UR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wappen_Uri_matt.svg/100px-Wappen_Uri_matt.svg.png',
    SZ: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Wappen_Schwyz_matt.svg/100px-Wappen_Schwyz_matt.svg.png',
    OW: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Wappen_Obwalden_matt.svg/100px-Wappen_Obwalden_matt.svg.png',
    NW: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Wappen_Nidwalden_matt.svg/100px-Wappen_Nidwalden_matt.svg.png',
    GL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wappen_Glarus_matt.svg/100px-Wappen_Glarus_matt.svg.png',
    ZG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Wappen_Zug_matt.svg/100px-Wappen_Zug_matt.svg.png',
    FR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wappen_Freiburg_matt.svg/100px-Wappen_Freiburg_matt.svg.png',
    SO: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Wappen_Solothurn_matt.svg/100px-Wappen_Solothurn_matt.svg.png',
    BS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Wappen_Basel-Stadt_matt.svg/100px-Wappen_Basel-Stadt_matt.svg.png',
    BL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Wappen_Basel-Landschaft_matt.svg/100px-Wappen_Basel-Landschaft_matt.svg.png',
    SH: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Wappen_Schaffhausen_matt.svg/100px-Wappen_Schaffhausen_matt.svg.png',
    AR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Wappen_Appenzell_Ausserrhoden_matt.svg/100px-Wappen_Appenzell_Ausserrhoden_matt.svg.png',
    AI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Wappen_Appenzell_Innerrhoden_matt.svg/100px-Wappen_Appenzell_Innerrhoden_matt.svg.png',
    SG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Wappen_St._Gallen_matt.svg/100px-Wappen_St._Gallen_matt.svg.png',
    GR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Wappen_Graub%C3%BCnden_matt.svg/100px-Wappen_Graub%C3%BCnden_matt.svg.png',
    AG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Wappen_Aargau_matt.svg/100px-Wappen_Aargau_matt.svg.png',
    TG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Wappen_Thurgau_matt.svg/100px-Wappen_Thurgau_matt.svg.png',
    TI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wappen_Tessin_matt.svg/100px-Wappen_Tessin_matt.svg.png',
    VD: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Wappen_Waadt_matt.svg/100px-Wappen_Waadt_matt.svg.png',
    VS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Wappen_Wallis_matt.svg/100px-Wappen_Wallis_matt.svg.png',
    NE: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Wappen_Neuenburg_matt.svg/100px-Wappen_Neuenburg_matt.svg.png',
    GE: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Wappen_Genf_matt.svg/100px-Wappen_Genf_matt.svg.png',
    JU: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Wappen_Jura_matt.svg/100px-Wappen_Jura_matt.svg.png'
};

export const VIBE_OPTIONS: Record<Vibe, string> = {
    SILENT: '🤫 Voiture/Ambiance Silencieuse',
    CHATTY: '🗣️ Bavard / Social',
    MUSIC: '🎵 En musique',
    BUSINESS: '💼 Réseautage / Pro',
    DATING: '❤️ Ouvert aux rencontres',
    PARTY: '🎉 Festif',
    NATURE: '🌲 Nature & Chill',
    SPORT: '💪 Sport intensif'
};

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', type: 'ACCEPT', title: 'Demande acceptée', message: 'Paul a validé votre covoiturage pour Bern.', date: '2 min', read: false },
    { id: 'n2', type: 'MESSAGE', title: 'Nouveau message', message: 'Sarah: On se retrouve où exactement ?', date: '1h', read: false },
    { id: 'n3', type: 'INFO', title: 'Bienvenue Premium', message: 'Merci de votre abonnement ! Profitez du badge couronne.', date: '1j', read: true },
    { id: 'n4', type: 'ALERT', title: 'Info Trafic', message: 'Bouchons signalés sur l\'A1 vers Lausanne.', date: '3h', read: true }
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Thomas',
  email: 'thomas.swiss@mail.ch',
  avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Thomas',
  canton: 'Vaud',
  bio: 'Passionné de montagne et de fromage. Toujours partant pour une rando !',
  badges: [
    { id: 'b1', icon: '🫕', name: 'Fondue', description: 'Participez à 5 événements conviviaux.', earned: true },
    { id: 'b2', icon: '🏔️', name: 'Alpin', description: 'Participez à une activité en montagne.', earned: true },
    { id: 'b3', icon: '🤝', name: 'Voisin', description: 'Rendez service 3 fois via l\'Entraide.', earned: true },
    { id: 'b4', icon: '🚗', name: 'Pilote', description: 'Proposez 5 trajets en covoiturage.', earned: false },
  ],
  isSosActive: false,
  sosContacts: [],
  sosPhone: '144',
  isPremium: false
};

const UserPaul: User = { id: 'c1', name: 'Paul', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Paul', canton: 'GE', badges: [], bio: 'Dispo !' };
const UserMarie: User = { id: 'c2', name: 'Marie', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Marie', canton: 'VD', badges: [], bio: 'Je suis intéressée.' };

const MockCandidates: Candidate[] = [
    { user: UserPaul, status: 'PENDING', message: "Bonjour, je suis très intéressé par ce trajet !" },
    { user: UserMarie, status: 'ACCEPTED', message: "C'est ok pour moi :)" }
];

export const MOCK_FRIENDS = [
  { 
      id: 'f1', name: 'Alice', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Alice', canton: 'VD', 
      bio: 'Fan de ski et de raclette. J\'adore explorer le canton de Vaud !',
      badges: [{ id: 'b1', icon: '⛷️', name: 'Skieuse', description: 'A dévalé 5 pistes noires.', earned: true }, { id: 'b2', icon: '📸', name: 'Insta', description: 'A posté 10 moments.', earned: true }]
  },
  { 
      id: 'f2', name: 'Bob', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Bob', canton: 'GE', 
      bio: 'Toujours partant pour un verre au bord du lac. Covoiturage frequent.',
      badges: [{ id: 'b3', icon: '🚗', name: 'Pilote', description: 'A proposé 5 trajets.', earned: true }]
  },
  { 
      id: 'f3', name: 'Charlie', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Charlie', canton: 'VS', 
      bio: 'Rando ? Grimpe ? Je suis votre homme. Valaisan fier !',
      badges: [{ id: 'b2', icon: '🏔️', name: 'Alpin', description: 'A grimpé un 4000m.', earned: true }]
  },
  { 
      id: 'f4', name: 'David', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=David', canton: 'FR', 
      bio: 'Photographe amateur. Je cherche des spots sympas.',
      badges: [{ id: 'b2', icon: '📸', name: 'Artiste', description: 'A gagné un concours photo.', earned: true }]
  },
  { 
      id: 'f5', name: 'Emma', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Emma', canton: 'NE', 
      bio: 'Sportive du dimanche, mais motivée !',
      badges: [{ id: 'b4', icon: '🏃‍♀️', name: 'Runner', description: 'A couru 50km.', earned: true }]
  },
  { 
      id: 'f6', name: 'Sophie', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sophie', canton: 'JU', 
      bio: 'J\'aime les balades à cheval.',
      badges: []
  },
  { 
      id: 'f7', name: 'Marc', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Marc', canton: 'ZH', 
      bio: 'Travaille dans la finance, dispo pour afterwork.',
      badges: []
  },
];

export const MOCK_INSTANT_POSTS: InstantPost[] = [
    { id: 'ip1', user: MOCK_FRIENDS[0], mainImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=600&fit=crop', selfieImage: MOCK_FRIENDS[0].avatar, postedAt: '09:42', location: 'Verbier', late: false },
    { id: 'ip2', user: MOCK_FRIENDS[1], mainImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=600&fit=crop', selfieImage: MOCK_FRIENDS[1].avatar, postedAt: '12:30', location: 'Genève', late: true },
    { id: 'ip3', user: MOCK_FRIENDS[2], mainImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=600&fit=crop', selfieImage: MOCK_FRIENDS[2].avatar, postedAt: '14:15', location: 'Zermatt', late: true },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1', type: 'EVENT', subtype: 'OFFER', title: 'Yoga Matin @ Lausanne', subtitle: 'Parc de Mon Repos',
    date: 'Aujourd\'hui', time: '18:00', endTime: '19:30', participants: 3, maxParticipants: 10,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=200&fit=crop',
    organizer: { id: 'u2', name: 'Sarah', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sarah', canton: 'VD', badges: [], bio: 'Prof de Yoga certifiée.' },
    category: 'Sport', description: 'Réveil musculaire en douceur au parc. Tapis non fournis.', priceMode: 'GRATUIT', myStatus: 'PARTICIPANT', vibe: 'NATURE'
  },
  {
    id: 'a2', type: 'EVENT', subtype: 'OFFER', title: 'Concert Jazz', subtitle: 'Caveau de Morges',
    date: 'Demain', time: '20:00', endTime: '23:00', participants: 12, maxParticipants: 50,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=200&fit=crop',
    organizer: { id: 'u3', name: 'Band', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Band', canton: 'VD', badges: [], bio: 'Groupe de Jazz local.' },
    category: 'Culture', priceMode: 'PAYANT_TWINT', priceValue: '20', currency: 'CHF', myStatus: 'NONE', vibe: 'PARTY', description: 'Soirée Jazz live avec des classiques et des impros. Ambiance feutrée et vins locaux.'
  },
  {
    id: 'a3', type: 'EVENT', subtype: 'OFFER', title: 'Afterwork Lac', subtitle: 'Jet d\'eau, Genève',
    date: 'Vendredi', time: '17:30', endTime: '22:00', participants: 8, maxParticipants: 20,
    image: 'https://images.unsplash.com/photo-1546552356-3fae876a61ca?w=400&h=200&fit=crop',
    organizer: MOCK_FRIENDS[1], category: 'Social', priceMode: 'GRATUIT', myStatus: 'NONE', vibe: 'PARTY',
    description: 'On profite du soleil couchant aux Eaux-Vives. Chacun amène un truc !'
  },
  {
    id: 'a4', type: 'EVENT', subtype: 'OFFER', title: 'Rando Salève', subtitle: 'Téléphérique du Salève',
    date: 'Samedi', time: '09:00', endTime: '14:00', participants: 4, maxParticipants: 8,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop',
    organizer: MOCK_FRIENDS[2], category: 'Sport', priceMode: 'GRATUIT', myStatus: 'NONE', vibe: 'NATURE',
    description: 'Montée par le sentier des Buis. Niveau moyen. Pique-nique au sommet.'
  },
  {
    id: 'a5', type: 'EVENT', subtype: 'OFFER', title: 'Tournoi Padel', subtitle: 'Padel Center Vernier',
    date: 'Dimanche', time: '10:00', endTime: '16:00', participants: 16, maxParticipants: 32,
    image: 'https://images.unsplash.com/photo-1627627256672-0279553f9447?w=400&h=200&fit=crop',
    organizer: MOCK_FRIENDS[4], category: 'Sport', priceMode: 'PAYANT_CASH', priceValue: '40', currency: 'CHF', myStatus: 'NONE', vibe: 'SPORT',
    description: 'Tournoi amical de Padel. Niveau intermédiaire.'
  },
  {
    id: 'a6', type: 'EVENT', subtype: 'OFFER', title: 'Dégustation Vin', subtitle: 'Lavaux Vinorama',
    date: 'Dimanche', time: '14:00', endTime: '18:00', participants: 5, maxParticipants: 10,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=200&fit=crop',
    organizer: MOCK_FRIENDS[3], category: 'Gastronomie', priceMode: 'PAYANT_TWINT', priceValue: '35', currency: 'CHF', myStatus: 'NONE', vibe: 'CHATTY',
    description: 'Découverte des cépages du Lavaux avec un sommelier.'
  },
  // NOUVELLES ACTIVITÉS
  { id: 'a7', type: 'EVENT', subtype: 'OFFER', title: 'Soirée Jeux', subtitle: 'Lausanne Centre', date: 'Samedi', time: '19:00', endTime: '23:00', participants: 4, maxParticipants: 6, image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=200&fit=crop', organizer: MOCK_FRIENDS[5], category: 'Jeux', priceMode: 'GRATUIT', myStatus: 'NONE', vibe: 'CHATTY', description: 'Jeux de société (Catan, Ticket to Ride). Ambiance cool.' },
  { id: 'a8', type: 'EVENT', subtype: 'OFFER', title: 'Networking Tech', subtitle: 'EPFL Innovation Park', date: 'Mardi', time: '18:00', endTime: '20:00', participants: 25, maxParticipants: 50, image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop', organizer: MOCK_FRIENDS[6], category: 'Business', priceMode: 'GRATUIT', myStatus: 'NONE', vibe: 'BUSINESS', description: 'Rencontre entrepreneurs et dev. Pizza offerte.' },
  { id: 'a9', type: 'EVENT', subtype: 'OFFER', title: 'Méditation', subtitle: 'Bord du Lac, Vevey', date: 'Dimanche', time: '08:00', endTime: '09:00', participants: 2, maxParticipants: 15, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop', organizer: MOCK_FRIENDS[0], category: 'Bien-être', priceMode: 'GRATUIT', myStatus: 'NONE', vibe: 'SILENT', description: 'Respiration et calme face au lac.' }
];

export const MOCK_RIDES: Activity[] = [
  {
    id: 'r1', type: 'RIDE', subtype: 'OFFER', title: 'Lausanne → Nyon', date: '28 Oct.', time: '08:00', arrivalTime: '08:45',
    priceMode: 'PAYANT_TWINT', priceValue: '10', currency: 'CHF', participants: 1, maxParticipants: 3,
    organizer: CURRENT_USER, myStatus: 'ORGANIZER', candidates: MockCandidates, isDriver: true,
    baggage: true, animals: false, description: 'Départ gare de Lausanne, je peux déposer à la gare de Nyon.',
    pickupLocation: 'Gare de Lausanne, Dépose-minute', dropoffLocation: 'Gare de Nyon, Côté Lac',
    vehicleModel: 'Tesla Model 3 Blanche', licensePlate: 'VD 123 456', vibe: 'SILENT'
  },
  {
    id: 'r2', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Morges → Bern', date: '29 Oct.', time: '09:00', arrivalTime: '10:30',
    priceMode: 'BUDGET', priceValue: '15', currency: 'CHF', participants: 1, maxParticipants: 1,
    organizer: { id: 'u5', name: 'Julie', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Julie', canton: 'VD', badges: [], bio: 'Étudiante à Bern.' },
    isDriver: false, baggage: true, animals: true, pickupLocation: 'Morges Centre', dropoffLocation: 'Bern Wankdorf',
    description: 'J\'ai un petit chat en caisse de transport.', myStatus: 'NONE', vibe: 'CHATTY'
  },
  {
    id: 'r3', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Genève → Lyon', date: '30 Oct.', time: '18:00', arrivalTime: '19:45',
    priceMode: 'BUDGET', priceValue: '25', currency: 'CHF', participants: 1, maxParticipants: 1,
    organizer: CURRENT_USER, myStatus: 'ORGANIZER', isDriver: false, baggage: true,
    pickupLocation: 'Genève Cornavin', dropoffLocation: 'Lyon Part-Dieu', description: 'Retour de week-end.', vibe: 'MUSIC'
  },
  {
    id: 'r4', type: 'RIDE', subtype: 'OFFER', title: 'Nyon → Zurich HB', date: 'Dimanche', time: '16:00', arrivalTime: '19:00',
    priceMode: 'PAYANT_TWINT', priceValue: '25', currency: 'CHF', participants: 0, maxParticipants: 4,
    organizer: MOCK_FRIENDS[3], myStatus: 'NONE', isDriver: true, baggage: true,
    pickupLocation: 'Nyon Gare', dropoffLocation: 'Zurich HB Sihlquai', vehicleModel: 'VW Golf Noire', licensePlate: 'VD 999 888', vibe: 'BUSINESS', description: 'Trajet direct, musique calme.'
  },
  {
    id: 'r5', type: 'RIDE', subtype: 'OFFER', title: 'Genève → Lausanne', date: 'Lun. 8h', time: '08:00', arrivalTime: '08:50',
    priceMode: 'PAYANT_TWINT', priceValue: '10', currency: 'CHF', participants: 0, maxParticipants: 3,
    organizer: MOCK_FRIENDS[0], myStatus: 'NONE', isDriver: true, pickupLocation: 'Eaux-Vives', dropoffLocation: 'Ouchy',
    vehicleModel: 'Fiat 500', licensePlate: 'GE 12345', vibe: 'MUSIC', description: 'Trajet régulier boulot.'
  },
  {
    id: 'r6', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Zurich → Bern', date: 'Mar. 17h', time: '17:00', arrivalTime: '18:15',
    priceMode: 'BUDGET', priceValue: '20', currency: 'CHF', participants: 0, maxParticipants: 1,
    organizer: MOCK_FRIENDS[4], myStatus: 'NONE', isDriver: false, pickupLocation: 'Zurich HB', dropoffLocation: 'Bern Gare',
    vibe: 'SILENT', description: 'Besoin de calme pour bosser.'
  },
  {
    id: 'r7', type: 'RIDE', subtype: 'OFFER', title: 'Fribourg → Bulle', date: 'Mer. 18h', time: '18:00', arrivalTime: '18:30',
    priceMode: 'GRATUIT', priceValue: '', currency: 'CHF', participants: 1, maxParticipants: 4,
    organizer: MOCK_FRIENDS[2], myStatus: 'NONE', isDriver: true, pickupLocation: 'Fribourg Gare', dropoffLocation: 'Bulle Centre',
    vehicleModel: 'Subaru Impreza', licensePlate: 'FR 555 666', vibe: 'CHATTY', description: 'Je rentre du travail, je prends du monde volontiers.'
  },
  {
    id: 'r8', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Sion → Martigny', date: 'Jeu. 07h', time: '07:30', arrivalTime: '08:00',
    priceMode: 'BUDGET', priceValue: '5', currency: 'CHF', participants: 0, maxParticipants: 1,
    organizer: MOCK_FRIENDS[5], myStatus: 'NONE', isDriver: false, pickupLocation: 'Sion Gare', dropoffLocation: 'Martigny Gare',
    vibe: 'MUSIC', description: 'Pour aller aux cours.'
  },
  {
    id: 'r9', type: 'RIDE', subtype: 'OFFER', title: 'Neuchâtel → La Chaux-de-Fonds', date: 'Ven. 20h', time: '20:00', arrivalTime: '20:30',
    priceMode: 'PAYANT_TWINT', priceValue: '8', currency: 'CHF', participants: 0, maxParticipants: 3,
    organizer: MOCK_FRIENDS[6], myStatus: 'NONE', isDriver: true, pickupLocation: 'Place Pury', dropoffLocation: 'La Chaux-de-Fonds Gare',
    vehicleModel: 'Audi A3', licensePlate: 'NE 222 333', vibe: 'PARTY', description: 'On monte pour la soirée !'
  },
  // NOUVELLES ACTIVITÉS
  { id: 'r10', type: 'RIDE', subtype: 'OFFER', title: 'Yverdon → Lausanne', date: 'Lun. 07:30', time: '07:30', arrivalTime: '08:15', priceMode: 'PAYANT_TWINT', priceValue: '8', currency: 'CHF', participants: 1, maxParticipants: 3, organizer: MOCK_FRIENDS[1], myStatus: 'NONE', isDriver: true, pickupLocation: 'Yverdon Gare', dropoffLocation: 'Lausanne Flon', vehicleModel: 'Renault Clio', licensePlate: 'VD 444 555', vibe: 'CHATTY', description: 'Trajet quotidien.' },
  { id: 'r11', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Vevey → Montreux', date: 'Sam. 19h', time: '19:00', arrivalTime: '19:15', priceMode: 'GRATUIT', priceValue: '', currency: 'CHF', participants: 0, maxParticipants: 2, organizer: MOCK_FRIENDS[2], myStatus: 'NONE', isDriver: false, pickupLocation: 'Vevey Gare', dropoffLocation: 'Montreux Casino', vibe: 'PARTY', description: 'Pour le festival.' },
  { id: 'r12', type: 'RIDE', subtype: 'OFFER', title: 'Genève → Annecy', date: 'Dim. 10h', time: '10:00', arrivalTime: '11:00', priceMode: 'PAYANT_TWINT', priceValue: '12', currency: 'CHF', participants: 0, maxParticipants: 4, organizer: MOCK_FRIENDS[0], myStatus: 'NONE', isDriver: true, pickupLocation: 'Stade de Genève', dropoffLocation: 'Annecy Gare', vehicleModel: 'Peugeot 3008', licensePlate: 'GE 888 777', vibe: 'NATURE', description: 'Sortie dimanche.' }
];

export const MOCK_HELP: Activity[] = [
  {
    id: 'h1', type: 'HELP', subtype: 'REQUEST', title: 'Besoin perceuse', subtitle: 'Bern - Quartier Kirchenfeld',
    date: 'Aujourd\'hui', time: '14:00', priceMode: 'TROC', exchangeDetails: 'Un pack de bières artisanales',
    participants: 0, maxParticipants: 1, organizer: { id: 'u6', name: 'Tom', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Tom', canton: 'BE', badges: [], bio: 'Bricoleur du dimanche.' },
    description: 'Bonjour, j\'ai besoin de percer 2 trous dans du béton. Urgent !', urgency: 'PRIORITY', category: 'Bricolage', myStatus: 'NONE'
  },
  {
    id: 'h2', type: 'HELP', subtype: 'OFFER', title: 'Garde Chat / Chien', subtitle: 'Nyon et alentours',
    date: 'Weekend', time: 'Flex', priceMode: 'PAYANT_CASH', priceValue: '20', currency: 'CHF/h',
    participants: 0, maxParticipants: 1, organizer: { id: 'u7', name: 'Lisa', avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Lisa', canton: 'VD', badges: [], bio: 'Amoureuse des animaux.' },
    description: 'Je suis disponible pour garder vos animaux ce weekend.', urgency: 'NORMAL', category: 'Garde d\'animaux', myStatus: 'NONE'
  },
  {
    id: 'h3', type: 'HELP', subtype: 'REQUEST', title: 'Déménagement Léger', subtitle: 'Lausanne Sous-Gare',
    date: 'Samedi', time: '10:00', priceMode: 'PAYANT_TWINT', priceValue: '50', currency: 'CHF',
    participants: 0, maxParticipants: 2, organizer: CURRENT_USER, myStatus: 'ORGANIZER',
    description: 'Besoin de 2 bras pour descendre un canapé 3 étages. Ascenseur en panne.', urgency: 'NORMAL', category: 'Déménagement'
  },
  {
    id: 'h4', type: 'HELP', subtype: 'OFFER', title: 'Cours de Maths', subtitle: 'Genève Plainpalais',
    date: 'Mercredi', time: '14:00', priceMode: 'PAYANT_TWINT', priceValue: '25', currency: 'CHF/h',
    participants: 0, maxParticipants: 1, organizer: MOCK_FRIENDS[1], myStatus: 'NONE',
    description: 'Je donne des cours de maths niveau gymnase.', urgency: 'NORMAL', category: 'Cours'
  },
  {
    id: 'h5', type: 'HELP', subtype: 'REQUEST', title: 'Prêt Appareil Raclette', subtitle: 'Fribourg',
    date: 'Vendredi', time: '19:00', priceMode: 'TROC', exchangeDetails: 'Une bouteille de blanc',
    participants: 0, maxParticipants: 1, organizer: MOCK_FRIENDS[3], myStatus: 'NONE',
    description: 'J\'ai une soirée et mon appareil est cassé. Help !', urgency: 'SOS', category: 'Prêt'
  },
  // NOUVELLES AIDES
  { id: 'h6', type: 'HELP', subtype: 'OFFER', title: 'Montage Meubles IKEA', subtitle: 'Meyrin', date: 'Samedi', time: 'Matin', priceMode: 'PAYANT_TWINT', priceValue: '30', currency: 'CHF/h', participants: 0, maxParticipants: 1, organizer: MOCK_FRIENDS[6], myStatus: 'NONE', description: 'Je suis pro du montage, rapide et équipé.', urgency: 'NORMAL', category: 'Bricolage' },
  { id: 'h7', type: 'HELP', subtype: 'REQUEST', title: 'Arrosage plantes', subtitle: 'Lausanne Chailly', date: '10-15 Nov.', time: 'Flex', priceMode: 'TROC', exchangeDetails: 'Chocolats suisses', participants: 0, maxParticipants: 1, organizer: MOCK_FRIENDS[0], myStatus: 'NONE', description: 'Je pars en vacances, besoin de quelqu\'un pour passer 2x.', urgency: 'NORMAL', category: 'Service' }
];

export const MOCK_HISTORY: Activity[] = [
    {
        id: 'hist1', type: 'EVENT', subtype: 'OFFER', title: 'Apéro Lac', subtitle: 'Lausanne Ouchy',
        date: '12 Oct.', time: '18:00', priceMode: 'GRATUIT', category: 'Social',
        organizer: CURRENT_USER, participants: 5, myStatus: 'ORGANIZER',
        description: 'Apéro détente au bord du lac.'
    },
    {
        id: 'hist2', type: 'RIDE', subtype: 'REQUEST', title: 'Genève → Lausanne', subtitle: '',
        date: '05 Oct.', time: '10:00', priceMode: 'PAYANT_TWINT', priceValue: '15', currency: 'CHF',
        organizer: CURRENT_USER, participants: 1, myStatus: 'PARTICIPANT',
        description: 'Trajet pour le travail.'
    }
];

export const INTENTIONS: Intention[] = [
  { id: 'i1', label: 'Discuter', icon: '💬', color: 'bg-gray-100 text-gray-600' },
  { id: 'i2', label: 'Réseauter', icon: '🤝', color: 'bg-blue-50 text-blue-600' },
  { id: 'i3', label: 'Rencontrer', icon: '❤️', color: 'bg-red-50 text-red-600' },
  { id: 'i4', label: 'Sport', icon: '🏃', color: 'bg-green-50 text-green-600' },
  { id: 'i5', label: 'Découvrir', icon: '🧭', color: 'bg-yellow-50 text-yellow-600' },
];
