
import React, { useState, useRef, useEffect } from 'react';
import { INTENTIONS, CURRENT_USER, MOCK_ACTIVITIES, TRANSLATIONS, CANTON_FLAGS, CGU_TEXT, MOCK_NOTIFICATIONS, VIBE_OPTIONS, MOCK_FRIENDS, MOCK_INSTANT_POSTS, MOCK_RIDES, MOCK_HELP, MOCK_HISTORY, SILHOUETTE_AVATAR, PAYMENT_CONFIG, SUPPORT_USER } from './constants';
import { AppTab, User, Intention, ServiceType, Activity, Language, Badge, Notification, Candidate, ChatContext, Message } from './types';
import { PsittMap } from './modules/PsittMap';
import { ServicesModule } from './modules/Services';
import { ProfileModule } from './modules/Profile';
import { Button, Modal, SOSButton, Input, Checkbox, Avatar, BadgeIcon, Tabs, Select, TextArea } from './components/Shared';
import { 
  User as UserIcon, MapPin, Flame, HandHeart, Car, ChevronLeft, Smartphone, Mail, Lock, Bell, Navigation, Camera, ArrowRight, Calendar, Clock, Euro, Briefcase, PawPrint, MessageCircle, Siren, CheckCircle, XCircle, Send, Award, UserPlus, UserCheck, Users, MessageSquare, Trash2, AlertCircle, Compass, Eye, EyeOff, Luggage, Info, HeartHandshake, Check, X
} from 'lucide-react';

// --- Global Chat Content (Handles Direct & Group) ---
const GlobalChatContent: React.FC<{ 
    context: ChatContext | null, 
    messages: Record<string, Message[]>, 
    onSendMessage: (contextId: string, text: string) => void,
    onClose: () => void,
    onSelectContext: (c: ChatContext) => void,
    lang: Language
}> = ({ context, messages, onSendMessage, onClose, onSelectContext, lang }) => {
    const [msg, setMsg] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const t = TRANSLATIONS[lang];

    const activeConversations: ChatContext[] = [
        { id: 'group_a1', type: 'GROUP', title: 'Yoga Matin @ Lausanne', avatar: '', participants: '3 participants' },
        { id: 'u2', type: 'DIRECT', title: 'Sarah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
        { id: 'u_thomas_mock', type: 'DIRECT', title: 'Thomas', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' }
    ];

    const currentMessages = context ? (messages[context.id] || []) : [];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [currentMessages, context]);

    const handleSend = () => { 
        if(!msg.trim() || !context) return; 
        onSendMessage(context.id, msg);
        setMsg(''); 
    };

    if (!context) {
        return (
            <div className="h-[500px] flex flex-col bg-white -m-6 sm:m-0 rounded-b-2xl">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">{t.chat.title}</h2>
                    <button onClick={onClose}><XCircle size={24} className="text-gray-400" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {activeConversations.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">{t.chat.noConv}</div>
                    ) : (
                        <div className="space-y-1">
                            {activeConversations.map(conv => (
                                <div key={conv.id} onClick={() => onSelectContext(conv)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer active:scale-95 transition-transform border-b border-gray-50 last:border-0">
                                    <div className="relative">
                                        {conv.type === 'GROUP' ? (
                                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 border border-brand-200">
                                                <Users size={20}/>
                                            </div>
                                        ) : (
                                            <Avatar src={conv.avatar} size="md" />
                                        )}
                                        {conv.type === 'DIRECT' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-900 truncate">{conv.title}</h4>
                                            <span className="text-[10px] text-gray-400">12:30</span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">
                                            {messages[conv.id] ? messages[conv.id][messages[conv.id].length - 1]?.text : "Nouvelle conversation"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="h-[500px] flex flex-col bg-gray-50 -m-6 sm:m-0 rounded-b-2xl">
            <div className="bg-white p-3 shadow-sm flex items-center gap-3 z-10 border-b border-gray-100">
                <button onClick={() => onSelectContext(null as any)} className="p-1 -ml-1 rounded-full hover:bg-gray-100"><ChevronLeft size={24} className="text-gray-600"/></button>
                {context.type === 'DIRECT' ? (
                     <div className="relative">
                         <Avatar src={context.avatar} size="sm"/>
                         <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                     </div>
                ) : (
                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 border border-brand-200">
                        <Users size={16}/>
                    </div>
                )}
                <div>
                    <span className="font-bold block text-sm text-gray-900">{context.title}</span>
                    <span className="text-[10px] text-gray-500 font-medium">
                        {context.type === 'DIRECT' ? t.chat.online : `${context.participants || '3'} ${t.chat.participants}`}
                    </span>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
                {currentMessages.length === 0 && (
                    <div className="text-center text-xs text-gray-400 mt-4">Début de la conversation</div>
                )}
                {currentMessages.map(m => {
                    const isMe = m.senderId === 'me';
                    return (
                        <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            {!isMe && context.type === 'GROUP' && <span className="text-[10px] text-gray-500 ml-1 mb-0.5">{m.senderName}</span>}
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                                {m.text}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <Input 
                    value={msg} 
                    onChange={e=>setMsg(e.target.value)} 
                    placeholder={t.chat.placeholder} 
                    className="bg-gray-100 border-none focus:ring-1" 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                />
                <button onClick={handleSend} disabled={!msg.trim()} className="bg-brand-600 text-white p-3 rounded-xl hover:bg-brand-700 active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"><Send size={20}/></button>
            </div>
        </div>
    );
};

const NotificationsContent: React.FC<{ notifications: Notification[], onRead: (id: string) => void }> = ({ notifications, onRead }) => (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto -mx-2 px-2">
        {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Aucune notification</div>
        ) : (
            notifications.map((n) => (
                <div 
                    key={n.id} 
                    onClick={() => !n.read && onRead(n.id)}
                    className={`p-3 border rounded-xl flex gap-3 cursor-pointer transition-colors ${n.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'}`}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                        {n.type === 'MESSAGE' ? <MessageCircle size={18}/> : n.type === 'ACCEPT' ? <CheckCircle size={18}/> : n.type === 'ALERT' ? <AlertCircle size={18}/> : <Info size={18}/>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h4 className={`text-sm ${n.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{n.title}</h4>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{n.date}</span>
                        </div>
                        <p className={`text-xs mt-0.5 line-clamp-2 ${n.read ? 'text-gray-500' : 'text-gray-800'}`}>{n.message}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>}
                </div>
            ))
        )}
    </div>
);

const ActivityDetailContent: React.FC<{ 
    activity: Activity, 
    onClose: () => void, 
    onChat: (context: ChatContext) => void, 
    onJoin: (a: Activity) => void,
    onValidateCandidate: (actId: string, candId: string, status: 'ACCEPTED' | 'REFUSED') => void,
    lang: Language
}> = ({ activity, onClose, onChat, onJoin, onValidateCandidate, lang }) => {
    const isRide = activity.type === 'RIDE';
    const isHelp = activity.type === 'HELP';
    const isEvent = activity.type === 'EVENT';
    const isOrganizer = activity.organizer.id === CURRENT_USER.id;
    const isParticipating = activity.myStatus === 'PARTICIPANT' || activity.myStatus === 'WAITING' || isOrganizer;

    const organizerIntention = INTENTIONS.find(i => i.id === activity.organizer.intention);
    const t = TRANSLATIONS[lang];

    const handleGroupChat = () => {
        onChat({
            id: `group_${activity.id}`,
            type: 'GROUP',
            title: activity.title,
            avatar: activity.image || activity.organizer.avatar, 
            participants: `${activity.participants + 1} ${t.chat.participants}`
        });
    };

    const handleOrganizerChat = () => {
        onChat({
            id: activity.organizer.id,
            type: 'DIRECT',
            title: activity.organizer.name,
            avatar: activity.organizer.avatar
        });
    };

    const categoryLabel = t.categories[activity.category || 'Other'] || activity.category || 'Autre';

    return (
        <div className="flex flex-col h-full -mx-6 -my-4 sm:mx-0 sm:my-0">
            <div className="relative h-48 bg-gray-100 shrink-0">
                {isEvent && activity.image ? (
                    <img src={activity.image} className="w-full h-full object-cover" />
                ) : isRide ? (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover"></div>
                        <div className="flex items-center gap-4 z-10">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                                <div className="h-10 w-0.5 border-l-2 border-dashed border-blue-400"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                            </div>
                            <div className="flex flex-col h-16 justify-between py-1">
                                <span className="text-xs font-bold bg-white px-2 py-0.5 rounded shadow-sm text-blue-900">{activity.pickupLocation || 'Départ'}</span>
                                <span className="text-xs font-bold bg-white px-2 py-0.5 rounded shadow-sm text-blue-900">{activity.dropoffLocation || 'Arrivée'}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${activity.urgency === 'SOS' ? 'bg-red-50' : 'bg-teal-50'}`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${activity.urgency === 'SOS' ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-600'}`}>
                            {activity.urgency === 'SOS' ? <Siren size={40} className="animate-pulse" /> : <HandHeart size={40} />}
                        </div>
                    </div>
                )}
                
                <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 text-gray-800 shadow-sm z-20 sm:hidden">
                    <Trash2 size={20} className="rotate-45" />
                </button>
                
                <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg font-black text-gray-900 flex items-center gap-1">
                    {activity.priceMode === 'GRATUIT' ? t.services.free : activity.priceMode === 'TROC' ? t.services.trade : `${activity.priceValue} CHF`}
                </div>
            </div>

            <div className="p-6 bg-white flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className={`text-[10px] font-bold px-2 py-1 rounded-md text-white ${isRide ? 'bg-blue-600' : isHelp ? (activity.urgency === 'SOS' ? 'bg-red-600 animate-pulse' : 'bg-teal-600') : 'bg-purple-600'}`}>
                                 {isRide ? t.nav.rides.toUpperCase() : isHelp ? (activity.urgency === 'SOS' ? 'SOS URGENCE' : t.nav.help.toUpperCase()) : t.nav.moments.toUpperCase()}
                             </span>
                             <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-bold uppercase">{categoryLabel}</span>
                             {activity.vibe && <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-bold flex items-center gap-1">✨ {VIBE_OPTIONS[activity.vibe]}</span>}
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-1">{activity.title}</h2>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <Clock size={16}/> {activity.date} | {activity.time} {activity.endTime && `➔ ${activity.endTime}`}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-6 border border-gray-100 relative">
                    <Avatar src={activity.organizer.avatar} size="lg" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{activity.organizer.name}</h3>
                            {organizerIntention && (
                                <div className={`text-[10px] px-1.5 py-0.5 rounded border ${organizerIntention.color.replace('bg-', 'border-').replace('text-', 'text-opacity-80 text-')} bg-white`}>
                                    {organizerIntention.icon} {organizerIntention.label}
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">{activity.organizer.bio || "Membre de la communauté"}</p>
                    </div>
                    {!isOrganizer && (
                         <button onClick={handleOrganizerChat} className="p-2 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-brand-600 active:scale-95 transition-transform"><MessageCircle size={20}/></button>
                    )}
                </div>

                <div className="space-y-6">
                    {isRide && (
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-3">
                            <h4 className="font-bold text-blue-900 flex items-center gap-2"><Car size={18}/> Infos Trajet</h4>
                            <div className="relative pl-4 border-l-2 border-blue-200 ml-2 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                                    <p className="text-xs font-bold text-blue-500">DÉPART {activity.time}</p>
                                    <p className="font-bold text-gray-900">{activity.pickupLocation}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-900 rounded-full border-2 border-white"></div>
                                    <p className="text-xs font-bold text-blue-500">ARRIVÉE ~{activity.arrivalTime || '...'}</p>
                                    <p className="font-bold text-gray-900">{activity.dropoffLocation}</p>
                                </div>
                            </div>
                            <div className="border-t border-blue-200 pt-3 flex gap-4 text-sm text-blue-800">
                                {activity.vehicleModel && <div className="flex items-center gap-1"><Car size={14}/> {activity.vehicleModel}</div>}
                                {activity.baggage && <div className="flex items-center gap-1"><Luggage size={14}/> Bagages OK</div>}
                            </div>
                        </div>
                    )}

                    {isOrganizer && isRide && activity.candidates && activity.candidates.some(c => c.status === 'PENDING') && (
                        <div className="space-y-3">
                            <h4 className="font-bold text-gray-900 flex items-center gap-2"><Users size={18}/> Demandes à valider</h4>
                            {activity.candidates.filter(c => c.status === 'PENDING').map((cand, idx) => (
                                <div key={idx} className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar src={cand.user.avatar} size="sm" />
                                        <div className="min-w-0">
                                            <span className="text-sm font-bold text-gray-900">{cand.user.name}</span>
                                            <p className="text-[10px] text-gray-500 truncate">{cand.message || 'Souhaite rejoindre'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => onValidateCandidate(activity.id, cand.user.id, 'ACCEPTED')} className="p-2 bg-green-500 text-white rounded-full shadow-sm active:scale-95 transition-transform"><Check size={16}/></button>
                                        <button onClick={() => onValidateCandidate(activity.id, cand.user.id, 'REFUSED')} className="p-2 bg-red-500 text-white rounded-full shadow-sm active:scale-95 transition-transform"><X size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">À propos</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{activity.description || "Aucune description fournie."}</p>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <h4 className="font-bold text-gray-900">Participants ({activity.participants}/{activity.maxParticipants || '?'})</h4>
                            {activity.participants >= (activity.maxParticipants || 100) && <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">{t.status.full}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="flex -space-x-2">
                                 {Array.from({length: Math.min(activity.participants, 5)}).map((_, i) => (
                                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                         <img src={`https://i.pravatar.cc/150?u=${activity.id}${i}`} className="w-full h-full object-cover" />
                                     </div>
                                 ))}
                                 {isParticipating && !isOrganizer && (
                                     <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative z-10">
                                         <img src={CURRENT_USER.avatar} className="w-full h-full object-cover" />
                                     </div>
                                 )}
                             </div>
                             {(activity.participants > 5) && <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+{activity.participants - 5}</div>}
                        </div>
                        {isParticipating && <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1"><CheckCircle size={12}/> {t.status.participating}</p>}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0 pb-8 sm:pb-4">
                {isOrganizer ? (
                     <div className="grid grid-cols-2 gap-3">
                         <Button variant="secondary" fullWidth onClick={() => alert('Fonctionnalité de modification à venir')}>Modifier</Button>
                         <Button variant="primary" fullWidth onClick={handleGroupChat}><MessageCircle size={18}/> {t.chat.group}</Button>
                     </div>
                ) : (
                    <div className="flex gap-3">
                         {isParticipating ? (
                            <div className="flex gap-3 w-full">
                                <Button variant="secondary" className="flex-1" onClick={handleOrganizerChat}><MessageCircle size={18}/> {t.chat.organizer}</Button>
                                <Button variant="primary" className="flex-1" onClick={handleGroupChat}><Users size={18}/> {t.chat.group}</Button>
                            </div>
                         ) : (
                             <>
                                <Button variant="secondary" className="px-4" onClick={handleOrganizerChat}><MessageCircle /></Button>
                                <Button 
                                    fullWidth 
                                    onClick={() => onJoin(activity)} 
                                    className={isRide ? 'bg-blue-600' : isHelp ? 'bg-teal-600' : 'bg-purple-600'}
                                >
                                    {isRide ? (activity.subtype === 'OFFER' ? t.status.book : t.status.propose) : t.status.join}
                                </Button>
                             </>
                         )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- AUTH COMPONENTS (Definitions Hoisted BEFORE App) ---
const AuthLogin: React.FC<{ onLogin: () => void, onSignup: () => void }> = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white p-8 animate-in slide-in-from-right duration-300">
       <div className="flex-1 flex flex-col items-center justify-center">
           <div className="w-24 h-24 bg-brand-600 rounded-3xl flex items-center justify-center shadow-xl mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
               <span className="text-white font-black text-4xl">26</span>
           </div>
           <h1 className="text-3xl font-black text-gray-900 mb-2">26Connect<span className="text-brand-600">.ch</span></h1>
           <p className="text-gray-500 text-center mb-10 px-4">La Suisse connectée. Partagez, bougez, vivez.</p>

           <div className="w-full space-y-4">
               <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border-gray-200" />
               <div className="relative">
                   <Input placeholder="Mot de passe" type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-50 border-gray-200" />
                   <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400">
                       {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                   </button>
               </div>
               <div className="flex justify-end">
                   <button className="text-xs font-bold text-brand-600">Mot de passe oublié ?</button>
               </div>
           </div>
       </div>
       <div className="pb-8 space-y-4">
           <Button fullWidth onClick={onLogin} className="bg-brand-600 text-white shadow-brand-500/30">Se connecter</Button>
           <button onClick={onSignup} className="w-full text-center text-sm font-bold text-gray-500 py-2">Créer un compte</button>
       </div>
    </div>
  );
};

const AuthSignup: React.FC<{ onNext: (email: string) => void, onBack: () => void }> = ({ onNext, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
      if (password !== confirmPass) {
          setError('Les mots de passe ne correspondent pas.');
          return;
      }
      if (password.length < 6) {
          setError('Le mot de passe doit faire 6 caractères min.');
          return;
      }
      setError('');
      onNext(email);
  };

  return (
    <div className="flex flex-col h-full bg-white p-8 animate-in fade-in duration-500">
       <div className="flex-1 flex flex-col items-center justify-center">
           <div className="w-20 h-20 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 hover:rotate-6 transition-transform">
               <span className="text-white font-black text-3xl">26</span>
           </div>
           <h2 className="text-3xl font-black text-gray-900 mb-2">Inscription</h2>
           <p className="text-gray-500 text-center mb-8">Rejoignez la communauté 26Connect.</p>

           <div className="w-full space-y-4">
               <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 border-gray-200" />
               <div className="relative">
                   <Input placeholder="Mot de passe" type={showPass ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} className="bg-gray-50 border-gray-200" />
                   <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400">
                       {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                   </button>
               </div>
               <Input placeholder="Confirmer mot de passe" type="password" value={confirmPass} onChange={e => { setConfirmPass(e.target.value); setError(''); }} className="bg-gray-50 border-gray-200" error={error} />
           </div>
       </div>
       <div className="pb-8 space-y-4">
           <Button fullWidth onClick={handleNext} disabled={!email || !password || !confirmPass} className="bg-brand-600 text-white shadow-brand-500/30">Continuer</Button>
           <button onClick={onBack} className="w-full text-center text-sm font-bold text-gray-500 py-2">J'ai déjà un compte</button>
       </div>
    </div>
  );
};

const AuthCGU: React.FC<any> = ({ onNext, onBack }) => (
    <div className="p-6 h-full flex flex-col bg-white animate-in slide-in-from-right">
        <button onClick={onBack} className="mb-4"><ChevronLeft/></button>
        <h2 className="text-2xl font-bold mb-4">CGU</h2>
        <div className="flex-1 overflow-auto text-xs text-gray-600 bg-gray-50 p-4 rounded-xl mb-4 leading-relaxed whitespace-pre-line">{CGU_TEXT}</div>
        <Button onClick={onNext}>Accepter & Continuer</Button>
    </div>
);

const AuthProfile: React.FC<{ onNext: (name: string, canton: string, bio: string, avatar: string) => void }> = ({ onNext }) => { 
  const [name, setName] = useState(''); 
  const [canton, setCanton] = useState('');
  const [bio, setBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(SILHOUETTE_AVATAR); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => { if (typeof reader.result === 'string') setSelectedAvatar(reader.result); };
          reader.readAsDataURL(file);
      }
  };

  const cantonOptions = Object.keys(CANTON_FLAGS).map(c => ({ label: c, value: c }));

  return (
    <div className="flex flex-col h-full p-6 animate-in slide-in-from-right duration-300 bg-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Création de Profil</h2>
        <p className="text-gray-500 text-sm mb-8 text-center">Dites-nous en plus sur vous.</p>
        <div className="relative mb-8 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Avatar src={selectedAvatar} size="xl" />
            <div className="absolute bottom-0 right-0 bg-brand-600 rounded-full p-2 border-2 border-white shadow-md"><Camera size={18} className="text-white" /></div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
        <div className="w-full space-y-5">
            <Input label="Prénom" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ton Prénom" className="font-bold text-lg" />
            <Select label="Canton de résidence" options={cantonOptions} value={canton} onChange={setCanton} placeholder="Choisir un canton" />
            <Input label="Ta phrase (Bio)" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Passionné de..." />
        </div>
      </div>
      <div className="pb-6 space-y-3">
        <Button fullWidth onClick={() => onNext(name, canton, bio, selectedAvatar)} disabled={!name || !canton} className={name && canton ? "bg-brand-600 text-white" : "bg-gray-300"}>Suivant</Button>
      </div>
    </div>
  ); 
};

const AuthIntention: React.FC<any> = ({ onNext }) => (<div className="p-6 h-full flex flex-col justify-center bg-white"><h2 className="text-2xl font-bold mb-6 text-center">Ton Mood Actuel ?</h2><div className="space-y-3">{INTENTIONS.map(i => <button key={i.id} className="w-full p-4 rounded-xl border border-gray-200 flex items-center gap-4 hover:bg-gray-50 active:scale-95 transition-transform text-left" onClick={()=>onNext(i.id)}><div className="text-2xl">{i.icon}</div><span className="font-bold text-gray-900">{i.label}</span></button>)}</div></div>);

// --- APP COMPONENT ---
const App: React.FC = () => {
  const [authStep, setAuthStep] = useState<'LOGIN' | 'SIGNUP' | 'CGU' | 'PROFILE' | 'INTENTION' | 'APP'>('SIGNUP');
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.MAINTENANT);
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [friends, setFriends] = useState<User[]>(MOCK_FRIENDS);
  const [signupEmail, setSignupEmail] = useState('');
  const [lang, setLang] = useState<Language>('FR');
  const [showIntentions, setShowIntentions] = useState(false);
  const [activeIntention, setActiveIntention] = useState<Intention | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null); // NEW: SOS Countdown State
  const [showGrandTour, setShowGrandTour] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  
  // DATA STATE (PERSISTENT MOCK)
  const [rides, setRides] = useState<Activity[]>(MOCK_RIDES);
  const [helps, setHelps] = useState<Activity[]>(MOCK_HELP);
  const [moments, setMoments] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  
  // MESSAGING STATE (PERSISTENT MOCK)
  const [messages, setMessages] = useState<Record<string, Message[]>>({
      'group_a1': [{id: 1, text: "Salut tout le monde ! J'amène le tapis ?", senderId: 'u2', senderName: 'Sarah', timestamp: Date.now()}],
  });
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | null>(null);
  const [globalDetailActivity, setGlobalDetailActivity] = useState<Activity | null>(null);
  const [viewOrganizer, setViewOrganizer] = useState<User | null>(null);
  const [friendStatus, setFriendStatus] = useState<Record<string, boolean>>({}); // Track added friends locally
  
  const t = TRANSLATIONS[lang];

  // --- SOS LOGIC ---
  const triggerSosSequence = () => {
      setSosCountdown(3);
  };

  useEffect(() => {
      if (sosCountdown === null) return;
      if (sosCountdown > 0) {
          const timer = setTimeout(() => setSosCountdown(sosCountdown - 1), 1000);
          return () => clearTimeout(timer);
      } else if (sosCountdown === 0) {
          setSosCountdown(null);
          setSosActive(true);
      }
  }, [sosCountdown]);

  const cancelSos = () => {
      setSosCountdown(null);
      setSosActive(false);
  };
  // ----------------

  const handleIntentionSelect = (int: Intention) => { setActiveIntention(int); setShowIntentions(false); setTimeout(() => setShowGrandTour(true), 1500); };
  const handleCreateActivity = (newActivity: Activity) => { if (newActivity.type === 'RIDE') setRides([newActivity, ...rides]); else if (newActivity.type === 'HELP') setHelps([newActivity, ...helps]); else setMoments([newActivity, ...moments]); };
  
  // --- CORE ACTIONS ---
  
  // Updated Chat Handler (Supports Generic Context)
  const handleOpenChat = (context: ChatContext) => {
      setChatContext(context);
      setGlobalDetailActivity(null); // Close detail if open
      setViewOrganizer(null); // Close profile if open
      setShowGlobalChat(true);
  };

  // Deprecated wrapper to maintain compatibility with older calls (ProfileModule etc)
  const handleChatWithUser = (targetUser: User) => {
      handleOpenChat({
          id: targetUser.id,
          type: 'DIRECT',
          title: targetUser.name,
          avatar: targetUser.avatar
      });
  };

  const handleSendMessage = (contextId: string, text: string) => {
      setMessages(prev => ({
          ...prev,
          [contextId]: [...(prev[contextId] || []), {
              id: Date.now(),
              text: text,
              senderId: 'me',
              timestamp: Date.now()
          }]
      }));
  };

  const handleReadNotification = (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
  };

  const handleJoinActivity = (activity: Activity) => {
      const isRide = activity.type === 'RIDE';
      const newStatus = isRide ? 'WAITING' : 'PARTICIPANT';

      const updatedActivity: Activity = { 
          ...activity, 
          myStatus: newStatus as any, 
          participants: isRide ? activity.participants : activity.participants + 1,
          candidates: isRide ? [...(activity.candidates || []), { user: user, status: 'PENDING', message: 'Je souhaite rejoindre ce trajet.' }] : activity.candidates
      };
      
      // Update in correct list
      if(activity.type === 'RIDE') setRides(rides.map(r => r.id === activity.id ? updatedActivity : r));
      else if(activity.type === 'HELP') setHelps(helps.map(h => h.id === activity.id ? updatedActivity : h));
      else setMoments(moments.map(m => m.id === activity.id ? updatedActivity : m));

      // Update currently viewed detailed activity
      setGlobalDetailActivity(updatedActivity);
      
      // Add a local notification
      setNotifications([
          {id: `n_${Date.now()}`, type: 'INFO', title: isRide ? 'Demande envoyée' : 'Inscription confirmée', message: isRide ? `Votre demande pour ${activity.title} a été transmise.` : `Vous participez à : ${activity.title}`, date: 'À l\'instant', read: false},
          ...notifications
      ]);
  };

  const handleValidateCandidate = (actId: string, candId: string, status: 'ACCEPTED' | 'REFUSED') => {
      const updateList = (list: Activity[]) => list.map(a => {
          if (a.id === actId) {
              const newCandidates = (a.candidates || []).map(c => c.user.id === candId ? { ...c, status } : c);
              const acceptedCount = newCandidates.filter(c => c.status === 'ACCEPTED').length;
              return { ...a, candidates: newCandidates, participants: acceptedCount };
          }
          return a;
      });

      setRides(updateList(rides));
      const act = rides.concat(helps).concat(moments).find(a => a.id === actId);
      if (act) {
          const newCandidates = (act.candidates || []).map(c => c.user.id === candId ? { ...c, status } : c);
          setGlobalDetailActivity({ ...act, candidates: newCandidates, participants: newCandidates.filter(c => c.status === 'ACCEPTED').length });
      }
  };

  const handleAddFriend = (targetUser: User) => {
      setFriendStatus(prev => ({...prev, [targetUser.id]: true}));
  };

  const handleRemoveFriend = (friendId: string) => {
      setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const Header26 = () => (
      <div className="bg-brand-600 px-4 py-3 pt-safe-top flex items-center justify-between shadow-md z-50 relative shrink-0">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"><span className="text-brand-600 font-black text-lg">26</span></div><span className="text-white font-bold text-lg tracking-tight">Connect.ch</span></div>
          <div className="flex items-center gap-3">
              <button onClick={() => { setShowGlobalChat(true); setChatContext(null); }} className="p-2 rounded-full hover:bg-brand-700 transition-colors text-white"><MessageSquare size={24} /></button>
              <button onClick={() => setShowNotifications(true)} className="relative p-2 rounded-full hover:bg-brand-700 transition-colors"><Bell className="text-white" size={24} />{unreadCount > 0 && <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-brand-600"></div>}</button>
              <div className="relative cursor-pointer" onClick={() => setCurrentTab(AppTab.MOI)}><div className="w-8 h-8 rounded-full bg-brand-700 border-2 border-brand-500 overflow-hidden"><img src={user.avatar} className="w-full h-full object-cover" /></div><div className="w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-brand-600 absolute bottom-0 right-0"></div></div>
          </div>
      </div>
  );

  // AUTH FLOW RENDER
  if (authStep === 'LOGIN') return <AuthLogin onLogin={() => setAuthStep('APP')} onSignup={() => setAuthStep('SIGNUP')} />;
  if (authStep === 'SIGNUP') return <AuthSignup onNext={(email) => { setSignupEmail(email); setAuthStep('CGU'); }} onBack={() => setAuthStep('LOGIN')} />;
  if (authStep === 'CGU') return <AuthCGU onNext={() => setAuthStep('PROFILE')} onBack={() => setAuthStep('SIGNUP')} />;
  if (authStep === 'PROFILE') return <AuthProfile onNext={(name, canton, bio, avatar) => { setUser({...CURRENT_USER, id: `u_${Date.now()}`, name, email: signupEmail, canton, bio, avatar, badges: [], isPremium: false }); setAuthStep('INTENTION'); }} />;
  if (authStep === 'INTENTION') return <AuthIntention onNext={(intentionId: string) => { setUser(u => ({...u, intention: intentionId })); setAuthStep('APP'); }} />;

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <Header26 />
      <div className="flex-1 relative overflow-hidden bg-gray-100 flex flex-col">
        {currentTab === AppTab.MOI && <ProfileModule user={user} friends={friends} onChat={handleChatWithUser} onActivityClick={setGlobalDetailActivity} onViewFriend={(f) => setViewOrganizer(f as any)} onLanguageChange={setLang} currentLang={lang} onUpdateUser={setUser} onRemoveFriend={handleRemoveFriend} onTriggerSOS={triggerSosSequence} onShowGrandTour={() => setShowGrandTour(true)} onShowLegal={() => setShowLegal(true)} />}
        {currentTab === AppTab.MAINTENANT && (<div className="h-full relative w-full flex-1"><PsittMap lang={lang} onPinClick={(id, type) => { if(type==='ACTIVITY'){ const act = moments.concat(rides).concat(helps).find(a=>a.id===id); if(act) setGlobalDetailActivity(act); } else if(type==='USER') { const friend = MOCK_FRIENDS.find(f=>f.id===id); const organizer = moments.concat(rides).concat(helps).find(a=>a.organizer.id===id)?.organizer; const u = friend || organizer; if(u) setViewOrganizer(u as any); } }} onIntentionClick={() => setShowIntentions(true)} onMyPositionClick={() => setCurrentTab(AppTab.MOI)} activeIntention={activeIntention} /></div>)}
        {(currentTab === AppTab.MOMENTS || currentTab === AppTab.ENTRAIDE || currentTab === AppTab.TRAJETS) && 
            <ServicesModule 
                view={currentTab === AppTab.MOMENTS ? ServiceType.MOMENTS : currentTab === AppTab.ENTRAIDE ? ServiceType.HELP : ServiceType.RIDE} 
                onActivityClick={setGlobalDetailActivity} 
                lang={lang} 
                rides={rides} 
                helps={helps} 
                moments={moments} 
                onCreateActivity={handleCreateActivity} 
                isPremium={user.isPremium} 
                user={user}
            />
        }
      </div>
      <div className="bg-white border-t border-gray-100 pb-safe-bottom relative bottom-0 w-full z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.02)] shrink-0"><div className="flex justify-between items-end px-2 h-16 pb-1"><NavButton active={currentTab === AppTab.MOI} icon={<UserIcon size={26} strokeWidth={currentTab === AppTab.MOI ? 2.5 : 2} />} label={t.nav.moi} onClick={() => setCurrentTab(AppTab.MOI)} /><NavButton active={currentTab === AppTab.MAINTENANT} icon={<MapPin size={26} strokeWidth={currentTab === AppTab.MAINTENANT ? 2.5 : 2} />} label={t.nav.now} onClick={() => setCurrentTab(AppTab.MAINTENANT)} isMain /><NavButton active={currentTab === AppTab.MOMENTS} icon={<Flame size={26} strokeWidth={currentTab === AppTab.MOMENTS ? 2.5 : 2} />} label={t.nav.moments} onClick={() => setCurrentTab(AppTab.MOMENTS)} /><NavButton active={currentTab === AppTab.ENTRAIDE} icon={<HandHeart size={26} strokeWidth={currentTab === AppTab.ENTRAIDE ? 2.5 : 2} />} label={t.nav.help} onClick={() => setCurrentTab(AppTab.ENTRAIDE)} /><NavButton active={currentTab === AppTab.TRAJETS} icon={<Car size={26} strokeWidth={currentTab === AppTab.TRAJETS ? 2.5 : 2} />} label={t.nav.rides} onClick={() => setCurrentTab(AppTab.TRAJETS)} /></div></div>
      
      {/* MODALS */}
      <Modal isOpen={showIntentions} onClose={() => setShowIntentions(false)} title="Votre intention"><div className="grid grid-cols-1 gap-1 pb-4">{INTENTIONS.map(intent => (<button key={intent.id} onClick={() => handleIntentionSelect(intent)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all text-left group"><div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gray-100 group-hover:bg-white shadow-sm">{intent.icon}</div><div className="flex-1 border-b border-gray-100 pb-3 group-last:border-0"><h4 className="font-bold text-gray-900 text-sm">{intent.label}</h4></div></button>))}</div></Modal>
      
      {/* FIXED GRAND TOUR DISPLAY (Improved Grid & Styling) */}
      <Modal isOpen={showGrandTour} onClose={() => setShowGrandTour(false)} title="Grand Tour 🇨🇭">
          <div className="p-4">
              <h3 className="font-bold text-center mb-6 text-xl">Cantons Visités (4/26)</h3>
              <div className="grid grid-cols-4 gap-4">
                  {Object.keys(CANTON_FLAGS).map((c, i) => (
                      <div key={c} className={`flex flex-col items-center gap-1 ${i < 4 ? 'opacity-100' : 'opacity-40 grayscale'} transition-all`}>
                          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm p-2">
                              <img src={CANTON_FLAGS[c]} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase">{c}</span>
                      </div>
                  ))}
              </div>
          </div>
      </Modal>

      <Modal isOpen={showLegal} onClose={() => setShowLegal(false)} title="Aide & Mentions">
          <div className="flex flex-col h-full">
              <div className="p-4 text-xs leading-relaxed whitespace-pre-line text-gray-600 flex-1 overflow-auto">
                  {CGU_TEXT}
              </div>
              <div className="p-4 border-t border-gray-100">
                  <Button fullWidth onClick={() => { setShowLegal(false); handleChatWithUser(SUPPORT_USER); }}>
                      <MessageCircle className="mr-2" size={18}/> Contacter le Support
                  </Button>
              </div>
          </div>
      </Modal>
      
      {/* SOS COUNTDOWN & ACTIVE MODALS */}
      {sosCountdown !== null && (
          <div className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center text-white animate-in zoom-in duration-200">
              <h1 className="text-6xl font-black mb-4 animate-ping">{sosCountdown}</h1>
              <p className="font-bold text-xl mb-12">SOS dans...</p>
              <Button onClick={cancelSos} className="bg-white text-red-600 px-12 py-4 rounded-full text-xl shadow-xl">ANNULER</Button>
          </div>
      )}

      {sosActive && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
              <div className="bg-gray-800 w-full max-w-sm rounded-2xl p-6 text-white text-center shadow-2xl border border-gray-700">
                  <div className="w-16 h-16 bg-red-600 rounded-lg mx-auto flex items-center justify-center mb-4 shadow-lg shadow-red-900/50">
                      <span className="text-2xl animate-ping">🚨</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">SOS ENVOYÉ</h2>
                  <p className="text-gray-300 text-sm mb-6">Vos proches et les secours ont été notifiés avec votre position.</p>
                  <Button onClick={cancelSos} className="w-full bg-gray-700 hover:bg-gray-600 text-blue-400 border-t border-gray-600 py-3 rounded-none rounded-b-xl">{t.common.cancel}</Button>
              </div>
          </div>
      )}
      
      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
          <NotificationsContent notifications={notifications} onRead={handleReadNotification} />
      </Modal>
      
      {/* GLOBAL CHAT MODAL */}
      <Modal isOpen={showGlobalChat} onClose={() => { setShowGlobalChat(false); setChatContext(null); }} title="">
          <GlobalChatContent 
              context={chatContext} 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              onClose={() => setShowGlobalChat(false)}
              onSelectContext={(c) => setChatContext(c)} 
              lang={lang} 
            />
      </Modal>
      
      {/* RICH DETAIL MODAL */}
      {globalDetailActivity && (
          <Modal isOpen={!!globalDetailActivity} onClose={() => setGlobalDetailActivity(null)} title="">
              <ActivityDetailContent 
                  activity={globalDetailActivity} 
                  onClose={() => setGlobalDetailActivity(null)} 
                  onChat={handleOpenChat} 
                  onJoin={handleJoinActivity}
                  onValidateCandidate={handleValidateCandidate}
                  lang={lang}
              />
          </Modal>
      )}
      
      {/* PUBLIC PROFILE MODAL (FIXED: INTENTION VISIBLE & ADD FRIEND LOGIC) */}
      {viewOrganizer && (<Modal isOpen={!!viewOrganizer} onClose={() => setViewOrganizer(null)} title="Profil Public">
          <div className="flex flex-col items-center p-4">
              <Avatar src={viewOrganizer.avatar} size="xl" />
              <h2 className="text-xl font-bold mt-3">{viewOrganizer.name}</h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold mt-1 mb-2">{viewOrganizer.canton}</span>
              
              {/* Show Intention */}
              {INTENTIONS.find(i => i.id === viewOrganizer.intention) && (
                  <div className={`mt-2 px-4 py-2 rounded-xl flex items-center gap-2 ${INTENTIONS.find(i => i.id === viewOrganizer.intention)?.color}`}>
                      <span className="text-xl">{INTENTIONS.find(i => i.id === viewOrganizer.intention)?.icon}</span>
                      <span className="font-bold text-sm">{INTENTIONS.find(i => i.id === viewOrganizer.intention)?.label}</span>
                  </div>
              )}

              <p className="text-center italic text-gray-600 mb-6 mt-4">"{viewOrganizer.bio || 'Pas de bio'}"</p>
              
              <div className="w-full grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl text-center"><span className="block font-bold text-lg">{viewOrganizer.badges.length}</span><span className="text-[10px] uppercase text-gray-400">Badges</span></div>
                  <div className="bg-gray-50 p-3 rounded-xl text-center"><span className="block font-bold text-lg">?</span><span className="text-[10px] uppercase text-gray-400">Amis</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button variant="secondary" fullWidth onClick={() => handleChatWithUser(viewOrganizer)}>Message</Button>
                <Button 
                    fullWidth 
                    onClick={() => handleAddFriend(viewOrganizer)}
                    disabled={friendStatus[viewOrganizer.id]}
                    className={friendStatus[viewOrganizer.id] ? "bg-green-600 text-white" : ""}
                >
                    {friendStatus[viewOrganizer.id] ? "Demande envoyée ✓" : "Ajouter"}
                </Button>
              </div>
          </div>
      </Modal>)}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void; isMain?: boolean }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-1/5 h-full transition-all group pt-2 select-none active:scale-95 duration-100`}>
    <div className={`mb-1 p-1.5 rounded-2xl transition-all duration-300 ${active ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 -translate-y-1' : 'text-gray-400 group-hover:text-gray-600'}`}>{icon}</div>
    <span className={`text-[10px] font-medium transition-colors ${active ? 'text-brand-600 font-bold' : 'text-gray-400'}`}>{label}</span>
  </button>
);

export default App;
