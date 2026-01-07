
import { Activity, User, Intention, Candidate, Language, Notification, Vibe, InstantPost, PaymentProvider, Badge } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  FR: { 
    nav: { moi: "Moi", now: "Maintenant", moments: "Moments", help: "Entraide", rides: "Pouce Express" },
    common: { send: "Envoyer", cancel: "Annuler", close: "Fermer", back: "Retour", next: "Suivant", confirm: "Publier", see: "Voir", loading: "Chargement...", create: "Créer", delete: "Supprimer" },
    auth: { welcome: "Bienvenue", login: "Se connecter", signup: "Créer un compte", email: "Email", pass: "Mot de passe" },
    profile: { 
        title: "Mon Profil", badges: "Tous les Badges", premium: "Premium", security: "Sécurité", 
        lang: "Langue", help: "Aide & Mentions", logout: "Déconnexion", settings: "Paramètres",
        stats: { cantons: "Cantons", activities: "Activités", friends: "Amis" },
        edit: "Modifier", save: "Enregistrer", bioPlaceholder: "Votre phrase...",
        agenda: "Mon Agenda", upcoming: "À venir", history: "Historique",
        namePlaceholder: "Nom", emailPlaceholder: "Email"
    },
    map: { 
        around: "Qui est autour de moi ?", soon: "Bientôt dans le coin", intention: "Intention",
        filters: { all: "Tout", event: "Moments", help: "Entraide", ride: "Pouces", intentions: "Intentions" }
    },
    services: { 
        moments: "Moments", rides: "Pouce Express", help: "Entraide",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Mes trajets", passenger: "Annonces",
        askHelp: "Demander de l'aide", offerHelp: "Proposer de l'aide",
        findRide: "Annonces", manageRide: "Mes Trajets",
        searchStart: "Départ...", searchEnd: "Arrivée...", date: "Date",
        driverLabel: "CONDUCTEUR", passengerLabel: "PASSAGER", offer: "OFFRE", request: "DEMANDE",
        free: "Gratuit", trade: "Troc",
        instantTitle: "C'est flou ?", instantText: "Poste ton Instant du jour pour voir ce que font tes amis.", instantBtn: "C'est l'heure !"
    },
    form: {
        title: "Titre", desc: "Description", category: "Catégorie", vibe: "Ambiance / Vibe",
        date: "Date", timeStart: "Heure Début", timeEnd: "Heure Fin", participants: "Participants",
        priceType: "Type de prix", price: "Prix", location: "Lieu", myPos: "Ma position",
        start: "Départ", end: "Arrivée", car: "Voiture", plate: "Plaque",
        exchange: "En échange de quoi ?", urgency: "Urgence"
    },
    categories: {
        All: "Tout", Sport: "Sport", Culture: "Culture", Nature: "Nature", Social: "Social", 
        Gastronomy: "Gastronomie", Wellness: "Bien-être", Business: "Business", Games: "Jeux", Other: "Autre",
        DIY: "Bricolage", Moving: "Déménagement", Courses: "Cours", Service: "Service", Animals: "Animaux"
    },
    chat: {
        organizer: "Chat Organisateur", group: "Chat Groupe", placeholder: "Écrire un message...",
        online: "En ligne", participants: "participants", title: "Messagerie", noConv: "Aucune conversation",
        select: "Sélectionnez une conversation"
    },
    status: {
        full: "COMPLET", participating: "Vous participez", registered: "Inscrit ✓", join: "Rejoindre",
        book: "Réserver", propose: "Proposer", contact: "Contacter"
    },
    modals: {
        intentionTitle: "Votre intention",
        grandTourTitle: "Grand Tour 🇨🇭",
        visited: "Cantons Visités",
        publicProfile: "Profil Public",
        addFriend: "Ajouter",
        friendSent: "Demande envoyée ✓",
        message: "Message"
    }
  },
  RM: { 
    nav: { moi: "Jau", now: "Ussa", moments: "Moments", help: "Agid", rides: "Viadis" },
    common: { send: "Trametter", cancel: "Annular", close: "Serrar", back: "Enavos", next: "Sut", confirm: "Publitgar", see: "Vair", loading: "Chargiar...", create: "Crear", delete: "Stizzar" },
    auth: { welcome: "Bainvegni", login: "S'annunziar", signup: "Crear in conto", email: "Email", pass: "Parola d'onur" },
    profile: { 
        title: "Miu Profil", badges: "Tuts ils badges", premium: "Premium", security: "Segirtad", 
        lang: "Lingua", help: "Agid & Legal", logout: "Sortir", settings: "Parameters",
        stats: { cantons: "Cantuns", activities: "Activitads", friends: "Amis" },
        edit: "Modifitgar", save: "Memorisar", bioPlaceholder: "Vossa frasa...",
        agenda: "Miu Agenda", upcoming: "Proximamain", history: "Istoric",
        namePlaceholder: "Num", emailPlaceholder: "Email"
    },
    map: { 
        around: "Tgi è enturn mai?", soon: "Gia baud qua", intention: "Intenziun",
        filters: { all: "Tut", event: "Moments", help: "Agid", ride: "Viadis", intentions: "Intenziuns" }
    },
    services: { 
        moments: "Moments", rides: "Viadi Express", help: "Agid communabel",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Mias rutes", passenger: "Anunzias",
        askHelp: "Tschertgar agid", offerHelp: "Porscher agid",
        findRide: "Anunzias", manageRide: "Mias rutes",
        searchStart: "Partenza...", searchEnd: "Destinaziun...", date: "Data",
        driverLabel: "SCHOFFER", passengerLabel: "PASSAGIER", offer: "PROPOSTA", request: "DOMANDA",
        free: "Gratis", trade: "Barat",
        instantTitle: "È quai tschifflà?", instantText: "Posta tiu Instant per vesair tge che tes amis fan.", instantBtn: "I è l'ura!"
    },
    form: {
        title: "Titel", desc: "Descripziun", category: "Categoria", vibe: "Atmosphere",
        date: "Data", timeStart: "Ura partenza", timeEnd: "Ura arriv", participants: "Participants",
        priceType: "Pretsch", price: "Pretsch", location: "Lieu", myPos: "Mia posiziun",
        start: "Partenza", end: "Destinaziun", car: "Auto", plate: "Numer",
        exchange: "En barat per tge?", urgency: "Urgentscha"
    },
    categories: {
        All: "Tut", Sport: "Sport", Culture: "Cultura", Nature: "Natura", Social: "Social", 
        Gastronomy: "Gastronomia", Wellness: "Wellness", Business: "Business", Games: "Gieus", Other: "Auter",
        DIY: "Bricolage", Moving: "Tramudar", Courses: "Curs", Service: "Servetsch", Animals: "Animals"
    },
    chat: {
        organizer: "Chat Organisatur", group: "Chat da gruppa", placeholder: "Scriver in messadi...",
        online: "Online", participants: "participants", title: "Messadis", noConv: "Nagina conversaziun",
        select: "Tscherni ina conversaziun"
    },
    status: {
        full: "PLAIN", participating: "Ti participeschas", registered: "Inscrit ✓", join: "S'unir",
        book: "Reseravar", propose: "Proponer", contact: "Contactar"
    },
    modals: {
        intentionTitle: "Tia intenziun",
        grandTourTitle: "Grand Tour 🇨🇭",
        visited: "Cantuns visitads",
        publicProfile: "Profil public",
        addFriend: "Agiuntar",
        friendSent: "Dumanda tramessa ✓",
        message: "Messadi"
    }
  },
  EN: { 
    nav: { moi: "Me", now: "Now", moments: "Moments", help: "Help", rides: "Rides" },
    common: { send: "Send", cancel: "Cancel", close: "Close", back: "Back", next: "Next", confirm: "Publish", see: "See", loading: "Loading...", create: "Create", delete: "Delete" },
    auth: { welcome: "Welcome", login: "Login", signup: "Sign Up", email: "Email", pass: "Password" },
    profile: { 
        title: "My Profile", badges: "All Badges", premium: "Premium", security: "Security", 
        lang: "Language", help: "Help & Legal", logout: "Logout", settings: "Settings",
        stats: { cantons: "Cantons", activities: "Activities", friends: "Friends" },
        edit: "Edit", save: "Save", bioPlaceholder: "Your bio...",
        agenda: "My Agenda", upcoming: "Upcoming", history: "History",
        namePlaceholder: "Name", emailPlaceholder: "Email"
    },
    map: { 
        around: "Who is around?", soon: "Coming up nearby", intention: "Intention",
        filters: { all: "All", event: "Moments", help: "Help", ride: "Rides", intentions: "Intentions" }
    },
    services: { 
        moments: "Moments", rides: "Thumb Express", help: "Community Help",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "My Rides", passenger: "Find a Ride",
        askHelp: "Ask for help", offerHelp: "Offer help",
        findRide: "Ads", manageRide: "My Rides",
        searchStart: "From...", searchEnd: "To...", date: "Date",
        driverLabel: "DRIVER", passengerLabel: "PASSENGER", offer: "OFFER", request: "REQUEST",
        free: "Free", trade: "Trade",
        instantTitle: "It's blurry?", instantText: "Post your daily Instant to see what your friends are up to.", instantBtn: "It's time!"
    },
    form: {
        title: "Title", desc: "Description", category: "Category", vibe: "Vibe",
        date: "Date", timeStart: "Start Time", timeEnd: "End Time", participants: "Participants",
        priceType: "Price Type", price: "Price", location: "Location", myPos: "My Position",
        start: "From", end: "To", car: "Car Model", plate: "License Plate",
        exchange: "In exchange for?", urgency: "Urgency"
    },
    categories: {
        All: "All", Sport: "Sport", Culture: "Culture", Nature: "Nature", Social: "Social", 
        Gastronomy: "Gastronomy", Wellness: "Wellness", Business: "Business", Games: "Games", Other: "Other",
        DIY: "DIY", Moving: "Moving", Courses: "Courses", Service: "Service", Animals: "Animals"
    },
    chat: {
        organizer: "Organizer Chat", group: "Group Chat", placeholder: "Type a message...",
        online: "Online", participants: "participants", title: "Messages", noConv: "No conversations",
        select: "Select a conversation"
    },
    status: {
        full: "FULL", participating: "You are joining", registered: "Joined ✓", join: "Join",
        book: "Book", propose: "Propose", contact: "Contact"
    },
    modals: {
        intentionTitle: "Your intention",
        grandTourTitle: "Grand Tour 🇨🇭",
        visited: "Cantons Visited",
        publicProfile: "Public Profile",
        addFriend: "Add",
        friendSent: "Request sent ✓",
        message: "Message"
    }
  },
  DE: { 
    nav: { moi: "Ich", now: "Jetzt", moments: "Momente", help: "Hilfe", rides: "Fahrten" },
    common: { send: "Senden", cancel: "Abbrechen", close: "Schließen", back: "Zurück", next: "Weiter", confirm: "Veröffentlichen", see: "Sehen", loading: "Laden...", create: "Erstellen", delete: "Löschen" },
    auth: { welcome: "Willkommen", login: "Anmelden", signup: "Registrieren", email: "E-Mail", pass: "Passwort" },
    profile: { 
        title: "Mein Profil", badges: "Alle Abzeichen", premium: "Premium", security: "Sicherheit", 
        lang: "Sprache", help: "Hilfe & Recht", logout: "Abmelden", settings: "Einstellungen",
        stats: { cantons: "Kantone", activities: "Aktivitäten", friends: "Freunde" },
        edit: "Bearbeiten", save: "Speichern", bioPlaceholder: "Deine Bio...",
        agenda: "Mein Kalender", upcoming: "Kommend", history: "Verlauf",
        namePlaceholder: "Name", emailPlaceholder: "E-Mail"
    },
    map: { 
        around: "Wer ist in der Nähe?", soon: "Bald in der Nähe", intention: "Absicht",
        filters: { all: "Alles", event: "Momente", help: "Hilfe", ride: "Fahrten", intentions: "Absichten" }
    },
    services: { 
        moments: "Momente", rides: "Daumen Express", help: "Nachbarschaftshilfe",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Meine Fahrten", passenger: "Fahrt finden",
        askHelp: "Hilfe suchen", offerHelp: "Hilfe anbieten",
        findRide: "Anzeigen", manageRide: "Meine Fahrten",
        searchStart: "Von...", searchEnd: "Nach...", date: "Datum",
        driverLabel: "FAHRER", passengerLabel: "PASSAGIER", offer: "ANGEBOT", request: "ANFRAGE",
        free: "Kostenlos", trade: "Tausch",
        instantTitle: "Alles verschwommen?", instantText: "Poste deinen Instant, um zu sehen, was deine Freunde machen.", instantBtn: "Es ist Zeit!"
    },
    form: {
        title: "Titel", desc: "Beschreibung", category: "Kategorie", vibe: "Stimmung / Vibe",
        date: "Datum", timeStart: "Startzeit", timeEnd: "Endzeit", participants: "Teilnehmer",
        priceType: "Preistyp", price: "Preis", location: "Ort", myPos: "Mein Standort",
        start: "Von", end: "Nach", car: "Auto", plate: "Nummernschild",
        exchange: "Im Austausch gegen?", urgency: "Dringlichkeit"
    },
    categories: {
        All: "Alles", Sport: "Sport", Culture: "Kultur", Nature: "Natur", Social: "Sozial", 
        Gastronomy: "Gastronomie", Wellness: "Wellness", Business: "Business", Games: "Spiele", Other: "Andere",
        DIY: "Heimwerken", Moving: "Umzug", Courses: "Kurse", Service: "Dienst", Animals: "Tiere"
    },
    chat: {
        organizer: "Organisator Chat", group: "Gruppenchat", placeholder: "Nachricht schreiben...",
        online: "Online", participants: "teilnehmer", title: "Nachrichten", noConv: "Keine Unterhaltungen",
        select: "Wähle eine Unterhaltung"
    },
    status: {
        full: "VOLL", participating: "Du nimmst teil", registered: "Angemeldet ✓", join: "Beitreten",
        book: "Buchen", propose: "Vorschlagen", contact: "Kontaktieren"
    },
    modals: {
        intentionTitle: "Deine Absicht",
        grandTourTitle: "Grand Tour 🇨🇭",
        visited: "Besuchte Kantone",
        publicProfile: "Öffentliches Profil",
        addFriend: "Hinzufügen",
        friendSent: "Anfrage gesendet ✓",
        message: "Nachricht"
    }
  },
  IT: { 
    nav: { moi: "Io", now: "Adesso", moments: "Momenti", help: "Aiuto", rides: "Passaggi" },
    common: { send: "Invia", cancel: "Annulla", close: "Chiudi", back: "Indietro", next: "Avanti", confirm: "Pubblicare", see: "Vedere", loading: "Caricamento...", create: "Creare", delete: "Elimina" },
    auth: { welcome: "Benvenuto", login: "Accedi", signup: "Iscriviti", email: "Email", pass: "Password" },
    profile: { 
        title: "Il mio profilo", badges: "Tutti i badge", premium: "Premium", security: "Sicurezza", 
        lang: "Lingua", help: "Aiuto & Legale", logout: "Disconnettersi", settings: "Impostazioni",
        stats: { cantons: "Cantoni", activities: "Attività", friends: "Amici" },
        edit: "Modifica", save: "Salva", bioPlaceholder: "La tua bio...",
        agenda: "La mia agenda", upcoming: "In arrivo", history: "Cronologia",
        namePlaceholder: "Nome", emailPlaceholder: "Email"
    },
    map: { 
        around: "Chi c'è intorno?", soon: "Presto in zona", intention: "Intenzione",
        filters: { all: "Tutto", event: "Momenti", help: "Aiuto", ride: "Passaggi", intentions: "Intenzioni" }
    },
    services: { 
        moments: "Momenti", rides: "Pollice Express", help: "Aiuto Reciproco",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "I miei passaggi", passenger: "Trova passaggio",
        askHelp: "Chiedere aiuto", offerHelp: "Offrire aiuto",
        findRide: "Annunci", manageRide: "I miei passaggi",
        searchStart: "Da...", searchEnd: "A...", date: "Data",
        driverLabel: "AUTISTA", passengerLabel: "PASSEGGERO", offer: "OFFERTA", request: "RICHIESTA",
        free: "Gratuito", trade: "Scambio",
        instantTitle: "È sfocato?", instantText: "Pubblica il tuo Instant per vederere cosa fanno i tuoi amici.", instantBtn: "È ora!"
    },
    form: {
        title: "Titolo", desc: "Descrizione", category: "Categoria", vibe: "Atmosfera",
        date: "Data", timeStart: "Ora Inizio", timeEnd: "Ora Fine", participants: "Partecipanti",
        priceType: "Tipo Prezzo", price: "Prezzo", location: "Luogo", myPos: "La mia posizione",
        start: "Da", end: "A", car: "Auto", plate: "Targa",
        exchange: "In cambio di?", urgency: "Urgenza"
    },
    categories: {
        All: "Tutto", Sport: "Sport", Culture: "Cultura", Nature: "Natura", Social: "Sociale", 
        Gastronomy: "Gastronomia", Wellness: "Benessere", Business: "Business", Games: "Giochi", Other: "Altro",
        DIY: "Fai da te", Moving: "Trasloco", Courses: "Corsi", Service: "Servizio", Animals: "Animali"
    },
    chat: {
        organizer: "Chat Organizzatore", group: "Chat di Gruppo", placeholder: "Scrivi un messaggio...",
        online: "Online", participants: "partecipanti", title: "Messaggi", noConv: "Nessuna conversazione",
        select: "Seleziona una conversazione"
    },
    status: {
        full: "PIENO", participating: "Partecipi", registered: "Iscritto ✓", join: "Unisciti",
        book: "Prenota", propose: "Proponi", contact: "Contatta"
    },
    modals: {
        intentionTitle: "La tua intenzione",
        grandTourTitle: "Grand Tour 🇨🇭",
        visited: "Cantoni Visitati",
        publicProfile: "Profilo Pubblico",
        addFriend: "Aggiungi",
        friendSent: "Richiesta inviata ✓",
        message: "Messaggio"
    }
  },
  ES: { 
    nav: { moi: "Yo", now: "Ahora", moments: "Momentos", help: "Ayuda", rides: "Viajes" },
    common: { send: "Enviar", cancel: "Cancelar", close: "Cerrar", back: "Atrás", next: "Siguiente", confirm: "Publicar", see: "Ver", loading: "Cargando...", create: "Crear", delete: "Eliminar" },
    auth: { welcome: "Bienvenido", login: "Iniciar sesión", signup: "Registrarse", email: "Email", pass: "Contraseña" },
    profile: { 
        title: "Mi Perfil", badges: "Todas las insignias", premium: "Premium", security: "Seguridad", 
        lang: "Idioma", help: "Ayuda y Legal", logout: "Cerrar sesión", settings: "Ajustes",
        stats: { cantons: "Cantones", activities: "Actividades", friends: "Amigos" },
        edit: "Editar", save: "Guardar", bioPlaceholder: "Tu bio...",
        agenda: "Mi Agenda", upcoming: "Próximamente", history: "Historial",
        namePlaceholder: "Nombre", emailPlaceholder: "Email"
    },
    map: { 
        around: "¿Quién está cerca?", soon: "Pronto cerca", intention: "Intención",
        filters: { all: "Todo", event: "Momentos", help: "Ayuda", ride: "Viajes", intentions: "Intenciones" }
    },
    services: { 
        moments: "Momentos", rides: "Dedo Express", help: "Ayuda Mutua",
        instant: "Instant 📸", agenda: "Agenda 📅",
        driver: "Mis viajes", passenger: "Buscar viaje",
        askHelp: "Pedir ayuda", offerHelp: "Ofrecer ayuda",
        findRide: "Anuncios", manageRide: "Mis Viajes",
        searchStart: "De...", searchEnd: "A...", date: "Fecha",
        driverLabel: "CONDUCTOR", passengerLabel: "PASAJERO", offer: "OFERTA", request: "SOLICITUD",
        free: "Gratis", trade: "Intercambio",
        instantTitle: "¿Está borroso?", instantText: "Publica tu Instant para ver qué hacen tus amigos.", instantBtn: "¡Es hora!"
    },
    form: {
        title: "Título", desc: "Descripción", category: "Categoría", vibe: "Ambiente",
        date: "Fecha", timeStart: "Hora Inicio", timeEnd: "Hora Fine", participants: "Participantes",
        priceType: "Tipo de Precio", price: "Precio", location: "Ubicación", myPos: "Mi posición",
        start: "De", end: "A", car: "Coche", plate: "Matrícula",
        exchange: "¿A cambio de qué?", urgency: "Urgencia"
    },
    categories: {
        All: "Todo", Sport: "Deporte", Culture: "Cultura", Nature: "Naturaleza", Social: "Social", 
        Gastronomy: "Gastronomía", Wellness: "Bienestar", Business: "Negocios", Games: "Juegos", Other: "Otro",
        DIY: "Bricolaje", Moving: "Mudanza", Courses: "Cursos", Service: "Servicio", Animals: "Animales"
    },
    chat: {
        organizer: "Chat Organizador", group: "Chat de Grupo", placeholder: "Escribe un mensaje...",
        online: "En línea", participants: "participantes", title: "Mensajes", noConv: "Sin conversaciones",
        select: "Selecciona una conversación"
    },
    status: {
        full: "COMPLETO", participating: "Estás participando", registered: "Inscrito ✓", join: "Unirse",
        book: "Reservar", propose: "Proponer", contact: "Contactar"
    },
    modals: {
        intentionTitle: "Tu intención",
        grandTourTitle: "Grand Tour 🇨🇭",
        visited: "Cantons Visited",
        publicProfile: "Profil Público",
        addFriend: "Añadir",
        friendSent: "Solicitud enviada ✓",
        message: "Message"
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

// Silhouette par défaut (Image grise neutre)
export const SILHOUETTE_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e5e7eb' stroke='%239ca3af' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";

export const DEFAULT_AVATARS = []; 

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
    AR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Wappen_Appenzell_Ausserrhoden_matt.svg/100px-Appenzell_Ausserrhoden_matt.svg.png',
    AI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Wappen_Appenzell_Innerrhoden_matt.svg/100px-Appenzell_Innerrhoden_matt.svg.png',
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

export const ALL_BADGES: Badge[] = [
    { id: 'b1', icon: '🫕', name: 'Fondue', description: 'Participez à 5 événements conviviaux.', earned: false },
    { id: 'b2', icon: '🏔️', name: 'Alpin', description: 'Participez à une activité en montagne.', earned: false },
    { id: 'b3', icon: '🤝', name: 'Voisin', description: 'Rendez service 3 fois via l\'Entraide.', earned: false },
    { id: 'b4', icon: '🚗', name: 'Pilote', description: 'Proposez 5 trajets en covoiturage.', earned: false },
    { id: 'b5', icon: '📸', name: 'Artiste', description: 'Postez 10 Instants.', earned: false },
    { id: 'b6', icon: '🏃‍♀️', name: 'Sportif', description: 'Participez à 5 activités sportives.', earned: false },
    { id: 'b7', icon: '⭐', name: 'Populaire', description: 'Ayez 20 amis sur la plateforme.', earned: false },
    { id: 'b8', icon: '👑', name: 'Premium', description: 'Membre Premium 26Connect.', earned: false },
];

// --- SEPARATE MOCK USER FROM CURRENT USER STATE ---

// The "Real" Thomas used in Mock Data (Activities)
export const MOCK_USER_THOMAS: User = {
  id: 'u_thomas_mock',
  name: 'Thomas',
  email: 'thomas.swiss@mail.ch',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  canton: 'Vaud',
  bio: 'Passionné de montagne et de fromage.',
  intention: 'i5',
  badges: [ALL_BADGES[0], ALL_BADGES[1], ALL_BADGES[2]],
  isSosActive: false,
  sosContacts: [],
  sosPhone: '144',
  isPremium: false
};

// Initial Empty State for the User of the App
export const CURRENT_USER: User = {
  id: '',
  name: '',
  email: '',
  avatar: SILHOUETTE_AVATAR,
  canton: '',
  bio: '',
  intention: 'i1',
  badges: [],
  isSosActive: false,
  sosContacts: [],
  sosPhone: '144',
  isPremium: false
};

export const SUPPORT_USER: User = {
    id: 'support',
    name: 'Support 26Connect',
    avatar: 'https://ui-avatars.com/api/?name=Support+26&background=9333ea&color=fff',
    canton: 'CH',
    badges: [],
    bio: 'Équipe de support.',
    intention: 'i1'
};

const UserPaul: User = { id: 'c1', name: 'Paul', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop', canton: 'GE', badges: [], bio: 'Dispo !', intention: 'i2' };
const UserMarie: User = { id: 'c2', name: 'Marie', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', canton: 'VD', badges: [], bio: 'Je suis intéressée.', intention: 'i1' };

const MockCandidates: Candidate[] = [
    { user: UserPaul, status: 'PENDING', message: "Bonjour, je suis très intéressé par ce trajet !" },
    { user: UserMarie, status: 'ACCEPTED', message: "C'est ok pour moi :)" }
];

export const MOCK_FRIENDS = [
  { 
      id: 'f1', name: 'Alice', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', canton: 'VD', intention: 'i4',
      bio: 'Fan de ski et de raclette. J\'adore explorer le canton de Vaud !',
      badges: [{ id: 'b1', icon: '⛷️', name: 'Skieuse', description: 'A dévalé 5 pistes noires.', earned: true }, { id: 'b2', icon: '📸', name: 'Insta', description: 'A posté 10 moments.', earned: true }]
  },
  { 
      id: 'f2', name: 'Bob', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', canton: 'GE', intention: 'i3',
      bio: 'Toujours partant pour un verre au bord du lac. Covoiturage frequent.',
      badges: [{ id: 'b3', icon: '🚗', name: 'Pilote', description: 'A proposé 5 trajets.', earned: true }]
  },
  { 
      id: 'f3', name: 'Charlie', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', canton: 'VS', intention: 'i5',
      bio: 'Rando ? Grimpe ? Je suis votre homme. Valaisan fier !',
      badges: [{ id: 'b2', icon: '🏔️', name: 'Alpin', description: 'A grimpé un 4000m.', earned: true }]
  },
  { 
      id: 'f4', name: 'David', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', canton: 'FR', intention: 'i1',
      bio: 'Photographe amateur. Je cherche des spots sympas.',
      badges: [{ id: 'b2', icon: '📸', name: 'Artiste', description: 'A gagné un concours photo.', earned: true }]
  },
  { 
      id: 'f5', name: 'Emma', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', canton: 'NE', intention: 'i4',
      bio: 'Sportive du dimanche, mais motivée !',
      badges: [{ id: 'b4', icon: '🏃‍♀️', name: 'Runner', description: 'A couru 50km.', earned: true }]
  },
  { 
      id: 'f6', name: 'Sophie', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop', canton: 'JU', intention: 'i2',
      bio: 'J\'aime les balades à cheval.',
      badges: []
  },
  { 
      id: 'f7', name: 'Marc', avatar: 'https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?w=200&h=200&fit=crop', canton: 'ZH', intention: 'i2',
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
    organizer: { id: 'u2', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', canton: 'VD', badges: [], bio: 'Prof de Yoga certifiée.', intention: 'i4' },
    category: 'Sport', description: 'Réveil musculaire en douceur au parc. Tapis non fournis.', priceMode: 'GRATUIT', myStatus: 'PARTICIPANT', vibe: 'NATURE'
  },
  {
    id: 'a2', type: 'EVENT', subtype: 'OFFER', title: 'Concert Jazz', subtitle: 'Caveau de Morges',
    date: 'Demain', time: '20:00', endTime: '23:00', participants: 12, maxParticipants: 50,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=200&fit=crop',
    organizer: { id: 'u3', name: 'Band', avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop', canton: 'VD', badges: [], bio: 'Groupe de Jazz local.', intention: 'i5' },
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

// UPDATED TO USE MOCK_USER_THOMAS instead of CURRENT_USER
export const MOCK_RIDES: Activity[] = [
  {
    id: 'r1', type: 'RIDE', subtype: 'OFFER', title: 'Lausanne → Nyon', date: '28 Oct.', time: '08:00', arrivalTime: '08:45',
    priceMode: 'PAYANT_TWINT', priceValue: '10', currency: 'CHF', participants: 1, maxParticipants: 3,
    organizer: MOCK_USER_THOMAS, myStatus: 'NONE', candidates: MockCandidates, isDriver: true,
    baggage: true, animals: false, description: 'Départ gare de Lausanne, je peux déposer à la gare de Nyon.',
    pickupLocation: 'Gare de Lausanne, Dépose-minute', dropoffLocation: 'Gare de Nyon, Côté Lac',
    vehicleModel: 'Tesla Model 3 Blanche', licensePlate: 'VD 123 456', vibe: 'SILENT'
  },
  {
    id: 'r2', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Morges → Bern', date: '29 Oct.', time: '09:00', arrivalTime: '10:30',
    priceMode: 'BUDGET', priceValue: '15', currency: 'CHF', participants: 1, maxParticipants: 1,
    organizer: { id: 'u5', name: 'Julie', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', canton: 'VD', badges: [], bio: 'Étudiante à Bern.', intention: 'i2' },
    isDriver: false, baggage: true, animals: true, pickupLocation: 'Morges Centre', dropoffLocation: 'Bern Wankdorf',
    description: 'J\'ai un petit chat en caisse de transport.', myStatus: 'NONE', vibe: 'CHATTY'
  },
  {
    id: 'r3', type: 'RIDE', subtype: 'REQUEST', title: 'Cherche: Genève → Lyon', date: '30 Oct.', time: '18:00', arrivalTime: '19:45',
    priceMode: 'BUDGET', priceValue: '25', currency: 'CHF', participants: 1, maxParticipants: 1,
    organizer: MOCK_USER_THOMAS, myStatus: 'NONE', isDriver: false, baggage: true,
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
    participants: 0, maxParticipants: 1, organizer: { id: 'u6', name: 'Tom', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', canton: 'BE', badges: [], bio: 'Bricoleur du dimanche.', intention: 'i3' },
    description: 'Bonjour, j\'ai besoin de percer 2 trous dans du béton. Urgent !', urgency: 'PRIORITY', category: 'Bricolage', myStatus: 'NONE'
  },
  {
    id: 'h2', type: 'HELP', subtype: 'OFFER', title: 'Garde Chat / Chien', subtitle: 'Nyon et alentours',
    date: 'Weekend', time: 'Flex', priceMode: 'PAYANT_CASH', priceValue: '20', currency: 'CHF/h',
    participants: 0, maxParticipants: 1, organizer: { id: 'u7', name: 'Lisa', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop', canton: 'VD', badges: [], bio: 'Amoureuse des animaux.', intention: 'i5' },
    description: 'Je suis disponible pour garder vos animaux ce weekend.', urgency: 'NORMAL', category: 'Garde d\'animaux', myStatus: 'NONE'
  },
  {
    id: 'h3', type: 'HELP', subtype: 'REQUEST', title: 'Déménagement Léger', subtitle: 'Lausanne Sous-Gare',
    date: 'Samedi', time: '10:00', priceMode: 'PAYANT_TWINT', priceValue: '50', currency: 'CHF',
    participants: 0, maxParticipants: 2, organizer: MOCK_USER_THOMAS, myStatus: 'NONE',
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
        organizer: MOCK_USER_THOMAS, participants: 5, myStatus: 'ORGANIZER',
        description: 'Apéro détente au bord du lac.'
    },
    {
        id: 'hist2', type: 'RIDE', subtype: 'REQUEST', title: 'Genève → Lausanne', subtitle: '',
        date: '05 Oct.', time: '10:00', priceMode: 'PAYANT_TWINT', priceValue: '15', currency: 'CHF',
        organizer: MOCK_USER_THOMAS, participants: 1, myStatus: 'PARTICIPANT',
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
