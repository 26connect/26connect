
import React, { useState, useRef } from 'react';
import { User, Activity, Language } from '../types';
import { Modal, Button, Avatar, Input, ConfirmationModal, Toggle, PaymentGateway, BadgeIcon, SOSButton, Checkbox } from '../components/Shared';
import { MOCK_ACTIVITIES, MOCK_HISTORY, TRANSLATIONS, CANTON_FLAGS, INTENTIONS, SILHOUETTE_AVATAR, ALL_BADGES } from '../constants';
import { 
  Settings, Award, ChevronRight, MapPin, LogOut, Edit2, Crown, Eye, Phone, Check, Camera, UserPlus, UserCheck, MessageCircle, Globe, ChevronLeft, Compass, Trash2, Shield, FileText, HelpCircle, Clock, Ghost, UserMinus, Plus, Star, Zap, CreditCard, Search, Lock
} from 'lucide-react';

// --- SECURITY COMPONENT (Updated with Friend Selection via IDs) ---
const SecurityContent: React.FC<any> = ({ friends, sosContacts, setSosContacts, sosPhone, setSosPhone, privacyMode, setPrivacyMode, isPremium, onCancelPremium }) => {
    const [ghostMode, setGhostMode] = useState(false);

    // Use IDs for robustness instead of Names
    const toggleContact = (friendId: string) => {
        if (sosContacts.includes(friendId)) {
            setSosContacts(sosContacts.filter((id: string) => id !== friendId));
        } else {
            if (sosContacts.length < 3) {
                setSosContacts([...sosContacts, friendId]);
            }
        }
    };

    return (
        <div className="space-y-6 pb-6">
            {isPremium && (
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm"><h3 className="font-bold text-yellow-900 flex items-center gap-2"><Crown size={18}/> Mon Abonnement</h3><button onClick={onCancelPremium} className="mt-2 text-xs font-bold text-red-600 underline">Résilier</button></div>
            )}
            
            <div className="bg-white p-4 rounded-xl space-y-4 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Eye size={18}/> Confidentialité</h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Ghost size={20} className={ghostMode ? "text-brand-600" : "text-gray-400"} />
                        <span className="font-medium text-sm">Mode Fantôme (Invisible)</span>
                    </div>
                    {/* FIXED: Wrapper function to match expected type (checked: boolean) => void */}
                    <Toggle checked={ghostMode} onChange={(val) => setGhostMode(val)} />
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase">Qui voit ma localisation ?</p>
                    <div onClick={() => setPrivacyMode('PUBLIC')} className={`p-3 rounded-lg border cursor-pointer flex justify-between ${privacyMode === 'PUBLIC' ? 'bg-brand-50 border-brand-500' : 'bg-white'}`}><span>Tout le monde</span>{privacyMode === 'PUBLIC' && <Check size={16} className="text-brand-600"/>}</div>
                    <div onClick={() => setPrivacyMode('FRIENDS')} className={`p-3 rounded-lg border cursor-pointer flex justify-between ${privacyMode === 'FRIENDS' ? 'bg-brand-50 border-brand-500' : 'bg-white'}`}><span>Amis uniquement</span>{privacyMode === 'FRIENDS' && <Check size={16} className="text-brand-600"/>}</div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl space-y-4 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Phone size={18}/> Urgence & SOS</h3>
                <Input label="Mon Numéro (visible secours)" value={sosPhone} onChange={e => setSosPhone(e.target.value)} />
                
                <div>
                    <label className="text-xs font-bold text-gray-700 mb-2 block">Contacts de confiance ({sosContacts.length}/3)</label>
                    <div className="bg-gray-50 rounded-xl p-2 max-h-40 overflow-y-auto">
                        {friends.map((f: any) => (
                            <div key={f.id} className={`flex items-center justify-between p-2 border-b border-gray-200 last:border-0 ${sosContacts.includes(f.id) ? 'bg-green-50/50 rounded-lg' : ''}`}>
                                <div className="flex items-center gap-2">
                                    <Avatar src={f.avatar} size="xs" />
                                    <span className={`text-sm ${sosContacts.includes(f.id) ? 'font-bold text-green-900' : 'font-medium'}`}>{f.name}</span>
                                </div>
                                <Checkbox 
                                    checked={sosContacts.includes(f.id)} 
                                    onChange={() => toggleContact(f.id)} 
                                    label=""
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 italic">Ces amis recevront une notification prioritaire en cas de déclenchement SOS.</p>
                </div>
            </div>
        </div>
    );
};

// --- PREMIUM COMPONENT (New Professional Design) ---
const PremiumContent: React.FC<any> = ({ onSuccess }) => {
    const [plan, setPlan] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
    return (
        <div className="p-2">
            <div className="bg-gradient-to-br from-brand-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Crown size={120} /></div>
                <h3 className="text-2xl font-black mb-1">26Connect <span className="text-yellow-400">Premium</span></h3>
                <p className="text-white/80 text-sm mb-6">Débloquez tout le potentiel.</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-black">{plan === 'MONTHLY' ? '4.90' : '49.00'}</span>
                    <span className="text-lg font-bold">CHF</span>
                    <span className="text-sm text-white/70">/{plan === 'MONTHLY' ? 'mois' : 'an'}</span>
                </div>

                <div className="bg-white/10 p-1 rounded-full flex relative mb-6 backdrop-blur-sm">
                    <button onClick={() => setPlan('MONTHLY')} className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${plan === 'MONTHLY' ? 'bg-white text-brand-900 shadow-md' : 'text-white/70'}`}>Mensuel</button>
                    <button onClick={() => setPlan('YEARLY')} className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${plan === 'YEARLY' ? 'bg-white text-brand-900 shadow-md' : 'text-white/70'}`}>Annuel (-20%)</button>
                </div>

                <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-sm font-medium"><div className="bg-white/20 p-1 rounded-full"><Check size={12} /></div> Badge Couronne exclusif</li>
                    <li className="flex items-center gap-3 text-sm font-medium"><div className="bg-white/20 p-1 rounded-full"><Check size={12} /></div> Zéro publicité</li>
                    <li className="flex items-center gap-3 text-sm font-medium"><div className="bg-white/20 p-1 rounded-full"><Check size={12} /></div> Filtres de recherche avancés</li>
                </ul>
            </div>
            <PaymentGateway amount={plan === 'MONTHLY' ? 4.90 : 49.00} onSuccess={onSuccess} onClose={()=>{}} />
        </div>
    );
};

// --- BADGES COMPONENT (Redesigned with Progress) ---
const BadgesContent: React.FC<{ userBadges: any[] }> = ({ userBadges }) => {
    const total = ALL_BADGES.length;
    const earned = userBadges.length;
    const progress = Math.round((earned / total) * 100);

    return (
        <div className="pb-6 px-2">
            {/* Header Stats */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white mb-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Ma Collection</h3>
                    <span className="font-black text-2xl">{earned}/{total}</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-indigo-100 font-medium">Continuez d'explorer pour tout débloquer !</p>
            </div>

            <div className="space-y-3">
                {ALL_BADGES.map(badgeDef => {
                    const userHasBadge = userBadges.some(ub => ub.id === badgeDef.id);
                    return (
                        <div key={badgeDef.id} className={`relative p-4 rounded-xl border transition-all duration-300 ${userHasBadge ? 'bg-white border-brand-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-70'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-sm border-2 ${userHasBadge ? 'bg-brand-50 border-brand-100' : 'bg-gray-200 border-gray-300 grayscale'}`}>
                                    {badgeDef.icon}
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className={`font-bold text-base ${userHasBadge ? 'text-gray-900' : 'text-gray-500'}`}>{badgeDef.name}</h4>
                                        {userHasBadge && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">ACQUIS</span>}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{badgeDef.description}</p>
                                </div>
                            </div>
                            {!userHasBadge && (
                                <div className="absolute top-4 right-4 text-gray-300">
                                    <Lock size={18} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- FRIENDS COMPONENT ---
const FriendsContent: React.FC<any> = ({ friends, friendSearch, setFriendSearch, onViewFriend, setFriendToDelete, onChat }) => {
    const filteredFriends = friends.filter((f: any) => f.name.toLowerCase().includes(friendSearch.toLowerCase()));

    const handleInvite = async () => {
        const shareData = {
            title: '26Connect',
            text: 'Rejoins-moi sur 26Connect, l\'app sociale suisse ultime !',
            url: 'https://26connect.ch'
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Partage annulé ou erreur', err);
            }
        } else {
            // Fallback for browsers not supporting web share
            alert(`Lien copié dans le presse-papier : ${shareData.url}`);
        }
    };

    return (
        <div className="flex flex-col h-full pb-6">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Rechercher un ami..." 
                    value={friendSearch} 
                    onChange={(e) => setFriendSearch(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
            </div>
            
            <div className="space-y-3">
                {filteredFriends.length > 0 ? filteredFriends.map((friend: any) => (
                    <div key={friend.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewFriend(friend)}>
                            <div className="relative">
                                <Avatar src={friend.avatar} size="md" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{friend.name}</h4>
                                <span className="text-xs text-gray-500">{friend.canton}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => onChat(friend)} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors">
                                <MessageCircle size={18} />
                            </button>
                            <button onClick={() => setFriendToDelete(friend.id)} className="p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                            <UserMinus size={24} />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun ami trouvé.</p>
                    </div>
                )}
            </div>
            
            <button onClick={handleInvite} className="mt-6 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold flex items-center justify-center gap-2 hover:border-brand-300 hover:text-brand-600 transition-colors">
                <UserPlus size={20} />
                Inviter des amis
            </button>
        </div>
    );
};

export const ProfileModule: React.FC<{ 
    user: User, 
    friends: User[],
    onChat: (u: User) => void,
    onActivityClick: (a: Activity) => void,
    onViewFriend: (u: User) => void,
    onLanguageChange: (l: Language) => void,
    currentLang: Language,
    onUpdateUser: (u: User) => void,
    onRemoveFriend: (id: string) => void,
    onTriggerSOS: () => void,
    onShowGrandTour: () => void,
    onShowLegal: () => void 
}> = ({ user, friends, onChat, onActivityClick, onViewFriend, onLanguageChange, currentLang, onUpdateUser, onRemoveFriend, onTriggerSOS, onShowGrandTour, onShowLegal }) => {
    const [view, setView] = useState<'MAIN' | 'BADGES' | 'SECURITY' | 'PREMIUM' | 'FRIENDS'>('MAIN');
    const [isEditing, setIsEditing] = useState(false);
    const [agendaTab, setAgendaTab] = useState<'UPCOMING' | 'HISTORY'>('UPCOMING');
    const [showLangModal, setShowLangModal] = useState(false);
    
    // Edit State
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email || ''); 
    const [editBio, setEditBio] = useState(user.bio || '');
    const [editCanton, setEditCanton] = useState(user.canton);
    const [editIntention, setEditIntention] = useState(user.intention || 'i5');

    const [friendSearch, setFriendSearch] = useState('');
    const [friendToDelete, setFriendToDelete] = useState<string | null>(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    
    // SOS State
    const [sosContacts, setSosContacts] = useState(user.sosContacts || []);
    const [sosPhone, setSosPhone] = useState(user.sosPhone || '144');
    const [privacyMode, setPrivacyMode] = useState<'PUBLIC' | 'FRIENDS' | 'GHOST'>('PUBLIC');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = TRANSLATIONS[currentLang];
    
    const currentIntentionObj = INTENTIONS.find(i => i.id === (isEditing ? editIntention : user.intention));

    const handleSave = () => {
        onUpdateUser({ ...user, name: editName, email: editEmail, bio: editBio, canton: editCanton, intention: editIntention, sosContacts, sosPhone });
        setIsEditing(false);
    };
    
    const handlePremiumSuccess = () => {
        const premiumBadge = ALL_BADGES.find(b => b.id === 'b8');
        const newBadges = premiumBadge && !user.badges.some(b => b.id === 'b8') 
            ? [...user.badges, {...premiumBadge, earned: true}] 
            : user.badges;
            
        onUpdateUser({
            ...user, 
            isPremium: true,
            badges: newBadges
        });
        setView('MAIN');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { if (typeof reader.result === 'string') { onUpdateUser({ ...user, avatar: reader.result }); } };
            reader.readAsDataURL(file);
        }
    };

    // --- AGENDA UI IMPROVED ---
    const renderActivity = (a: Activity) => {
        const isRide = a.type === 'RIDE';
        const isHelp = a.type === 'HELP';
        
        return (
            <div key={a.id} onClick={() => onActivityClick(a)} className="bg-white p-3 rounded-xl border border-gray-100 flex gap-3 active:scale-95 transition-transform cursor-pointer mb-2">
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 border border-gray-200 ${isRide ? 'bg-blue-50 text-blue-600' : isHelp ? 'bg-teal-50 text-teal-600' : 'bg-purple-50 text-purple-600'}`}>
                     <span className="text-[10px] font-bold uppercase opacity-70">{a.date.substring(0, 3)}</span>
                     <span className="text-lg font-bold">{a.date.match(/\d+/)?.[0] || '?'}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 truncate text-sm">{a.title}</h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${a.myStatus === 'ORGANIZER' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                            {a.myStatus === 'ORGANIZER' ? 'ORG' : 'PART'}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock size={12}/> {a.time} • {a.category || (isRide ? 'Trajet' : 'Aide')}
                    </p>
                </div>
            </div>
        );
    };

    // Main Render
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header / Nav Back */}
            {view !== 'MAIN' && (
                <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-gray-100 pt-safe-top">
                    <button onClick={() => setView('MAIN')} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ChevronLeft size={24} className="text-gray-700"/></button>
                    <h2 className="text-lg font-bold text-gray-900">
                        {view === 'BADGES' ? t.profile.badges : view === 'SECURITY' ? t.profile.security : view === 'PREMIUM' ? t.profile.premium : t.profile.stats.friends}
                    </h2>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                {view === 'MAIN' ? (
                   <>
                     {/* Profile Header */}
                     <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm mb-4 relative overflow-hidden">
                        <div className="flex flex-col items-center relative z-10">
                            <div className="relative mb-3">
                                <Avatar src={user.avatar} size="xl" onClick={() => setIsEditing(true)} />
                                {user.isPremium && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full border-2 border-white shadow-sm"><Crown size={14} fill="currentColor"/></div>}
                                <button onClick={() => setIsEditing(true)} className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm text-gray-600"><Edit2 size={14}/></button>
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-1">{user.name}</h2>
                            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><MapPin size={12}/> {user.canton}</p>
                            
                            {/* Stats */}
                            <div className="flex items-center gap-8 mb-6">
                                <div className="text-center cursor-pointer" onClick={() => onShowGrandTour()}>
                                    <span className="block font-black text-xl text-gray-900">4</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{t.profile.stats.cantons}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div className="text-center">
                                    <span className="block font-black text-xl text-gray-900">{MOCK_HISTORY.length}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{t.profile.stats.activities}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200"></div>
                                <div className="text-center cursor-pointer" onClick={() => setView('FRIENDS')}>
                                    <span className="block font-black text-xl text-gray-900">{friends.length}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{t.profile.stats.friends}</span>
                                </div>
                            </div>

                            {/* Intention Bubble */}
                            {currentIntentionObj && (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentIntentionObj.color} mb-4`}>
                                    <span className="text-lg">{currentIntentionObj.icon}</span>
                                    <span className="font-bold text-sm">{currentIntentionObj.label}</span>
                                </div>
                            )}

                            {/* Bio */}
                            <p className="text-center text-gray-600 text-sm max-w-xs leading-relaxed">"{user.bio || t.profile.bioPlaceholder}"</p>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-50 to-white z-0"></div>
                     </div>

                     {/* Menu Grid */}
                     <div className="px-4 grid grid-cols-2 gap-3 mb-6">
                        <button onClick={() => setView('BADGES')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                            <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center"><Award size={20}/></div>
                            <span className="font-bold text-sm text-gray-900">{t.profile.badges}</span>
                        </button>
                        <button onClick={() => setView('PREMIUM')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform relative overflow-hidden">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-purple-600 text-white rounded-full flex items-center justify-center"><Crown size={20}/></div>
                            <span className="font-bold text-sm text-gray-900">{t.profile.premium}</span>
                            {!user.isPremium && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>}
                        </button>
                        <button onClick={() => setView('SECURITY')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Shield size={20}/></div>
                            <span className="font-bold text-sm text-gray-900">{t.profile.security}</span>
                        </button>
                         <button onClick={onTriggerSOS} className="bg-red-50 p-4 rounded-2xl shadow-sm border border-red-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                            <div className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center shadow-sm"><Phone size={20}/></div>
                            <span className="font-bold text-sm text-red-900">SOS</span>
                        </button>
                     </div>

                     {/* Settings List */}
                     <div className="px-4 space-y-3 mb-8">
                         <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                             <div className="p-4 flex items-center justify-between border-b border-gray-50 cursor-pointer hover:bg-gray-50" onClick={() => setShowLangModal(true)}>
                                 <div className="flex items-center gap-3"><Globe size={18} className="text-gray-400"/><span className="font-medium text-sm text-gray-700">{t.profile.lang}</span></div>
                                 <span className="font-bold text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{currentLang}</span>
                             </div>
                             <div className="p-4 flex items-center justify-between border-b border-gray-50 cursor-pointer hover:bg-gray-50" onClick={onShowLegal}>
                                 <div className="flex items-center gap-3"><HelpCircle size={18} className="text-gray-400"/><span className="font-medium text-sm text-gray-700">{t.profile.help}</span></div>
                                 <ChevronRight size={16} className="text-gray-300"/>
                             </div>
                             <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-50" onClick={() => setShowLogoutConfirm(true)}>
                                 <div className="flex items-center gap-3"><LogOut size={18} className="text-red-400"/><span className="font-medium text-sm text-red-600">{t.profile.logout}</span></div>
                             </div>
                         </div>
                     </div>

                     {/* Agenda Section */}
                     <div className="px-4 pb-12">
                         <h3 className="font-bold text-gray-900 mb-3 ml-1">{t.profile.agenda}</h3>
                         <div className="bg-gray-100 p-1 rounded-xl flex mb-4">
                             <button onClick={() => setAgendaTab('UPCOMING')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${agendaTab === 'UPCOMING' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{t.profile.upcoming}</button>
                             <button onClick={() => setAgendaTab('HISTORY')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${agendaTab === 'HISTORY' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{t.profile.history}</button>
                         </div>
                         <div className="space-y-2">
                             {(agendaTab === 'UPCOMING' ? MOCK_ACTIVITIES.slice(0, 2) : MOCK_HISTORY).map(renderActivity)}
                             {(agendaTab === 'UPCOMING' ? MOCK_ACTIVITIES.slice(0, 2) : MOCK_HISTORY).length === 0 && (
                                 <div className="text-center py-6 text-gray-400 text-xs italic">Aucune activité.</div>
                             )}
                         </div>
                     </div>
                   </>
                ) : (
                    <div className="h-full">
                         {view === 'BADGES' && <BadgesContent userBadges={user.badges} />}
                         {view === 'SECURITY' && <SecurityContent friends={friends} sosContacts={sosContacts} setSosContacts={setSosContacts} sosPhone={sosPhone} setSosPhone={setSosPhone} privacyMode={privacyMode} setPrivacyMode={setPrivacyMode} isPremium={user.isPremium} onCancelPremium={() => onUpdateUser({...user, isPremium: false})} />}
                         {view === 'PREMIUM' && <PremiumContent onSuccess={handlePremiumSuccess} />}
                         {view === 'FRIENDS' && <FriendsContent friends={friends} friendSearch={friendSearch} setFriendSearch={setFriendSearch} onViewFriend={onViewFriend} setFriendToDelete={setFriendToDelete} onChat={onChat} />}
                    </div>
                )}
            </div>

            {/* Modals */}
            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title={t.profile.edit}>
                <div className="space-y-4 pb-6">
                    <div className="flex justify-center mb-4">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Avatar src={user.avatar} size="xl" />
                            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="text-white"/></div>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                        </div>
                    </div>
                    <Input label="Nom" value={editName} onChange={e => setEditName(e.target.value)} />
                    <Input label="Email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                    <Input label="Bio" value={editBio} onChange={e => setEditBio(e.target.value)} />
                    <div className="w-full"><label className="block text-xs font-bold text-gray-700 mb-1 ml-1">Canton</label><select value={editCanton} onChange={e => setEditCanton(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none">{Object.keys(CANTON_FLAGS).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    
                    <div className="w-full">
                        <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">Mon Intention</label>
                        <div className="grid grid-cols-1 gap-2">
                             {INTENTIONS.map(intent => (
                                 <button key={intent.id} onClick={() => setEditIntention(intent.id)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${editIntention === intent.id ? `bg-brand-50 border-brand-500` : 'bg-gray-50 border-transparent'}`}>
                                     <span className="text-xl">{intent.icon}</span>
                                     <span className={`font-bold text-sm ${editIntention === intent.id ? 'text-gray-900' : 'text-gray-500'}`}>{intent.label}</span>
                                 </button>
                             ))}
                        </div>
                    </div>

                    <Button fullWidth onClick={handleSave}>{t.profile.save}</Button>
                </div>
            </Modal>

            <Modal isOpen={showLangModal} onClose={() => setShowLangModal(false)} title={t.profile.lang}>
                <div className="space-y-2">
                    {(['FR', 'DE', 'EN', 'IT', 'ES', 'RM'] as Language[]).map((l) => (
                        <button 
                            key={l}
                            onClick={() => { onLanguageChange(l); setShowLangModal(false); }}
                            className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${currentLang === l ? 'bg-brand-50 border border-brand-200' : 'bg-gray-50 border border-transparent hover:bg-gray-100'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{l === 'FR' ? '🇫🇷' : l === 'DE' ? '🇩🇪' : l === 'IT' ? '🇮🇹' : l === 'EN' ? '🇬🇧' : l === 'RM' ? '🇨🇭' : '🇪🇸'}</span>
                                <span className={`font-bold ${currentLang === l ? 'text-brand-900' : 'text-gray-700'}`}>
                                    {l === 'FR' ? 'Français' : l === 'DE' ? 'Deutsch' : l === 'IT' ? 'Italiano' : l === 'EN' ? 'English' : l === 'RM' ? 'Rumantsch' : 'Español'}
                                </span>
                            </div>
                            {currentLang === l && <Check size={20} className="text-brand-600"/>}
                        </button>
                    ))}
                </div>
            </Modal>

            <ConfirmationModal 
                isOpen={showLogoutConfirm} 
                title={t.profile.logout} 
                message="Voulez-vous vraiment vous déconnecter ?" 
                onConfirm={() => window.location.reload()} 
                onCancel={() => setShowLogoutConfirm(false)} 
            />

            <ConfirmationModal
                isOpen={!!friendToDelete}
                title="Supprimer un ami"
                message="Êtes-vous sûr de vouloir retirer cet ami ?"
                onConfirm={() => { if(friendToDelete) onRemoveFriend(friendToDelete); setFriendToDelete(null); }} 
                onCancel={() => setFriendToDelete(null)}
            />
        </div>
    );
};
