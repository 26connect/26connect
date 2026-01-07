
import React, { useState } from 'react';
import { VIBE_OPTIONS, MOCK_INSTANT_POSTS, TRANSLATIONS } from '../constants';
import { Activity, ServiceType, Language, User } from '../types';
import { Button, Modal, Input, Select, TextArea, CameraInterface, Avatar } from '../components/Shared';
import { 
  Users, Car, HeartHandshake, Plus, Siren, Navigation, Camera, Lock, Map as MapIcon, List, ThumbsUp, ArrowRight, X, Search, Calendar, Info, Settings, Clock, UserCheck
} from 'lucide-react';

interface Props {
  view?: ServiceType;
  onActivityClick: (activity: Activity) => void;
  lang?: Language;
  
  // Data Props (Dynamic Lists)
  rides: Activity[];
  helps: Activity[];
  moments: Activity[];
  onCreateActivity: (act: Activity) => void;
  isPremium?: boolean;
  user: User;
}

export const ServicesModule: React.FC<Props> = ({ view, onActivityClick, lang = 'FR', rides, helps, moments, onCreateActivity, isPremium = false, user }) => {
  const [activeType, setActiveType] = useState<ServiceType>(view || ServiceType.MOMENTS);
  const [filter, setFilter] = useState('All');
  
  // Moments Logic
  const [momentView, setMomentView] = useState<'AGENDA' | 'INSTANT'>('AGENDA');
  const [hasPostedInstant, setHasPostedInstant] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [localInstantPosts, setLocalInstantPosts] = useState(MOCK_INSTANT_POSTS);

  // Ride Logic
  const [rideView, setRideView] = useState<'FIND' | 'ME'>('FIND');
  
  // Ride Search State
  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createMode, setCreateMode] = useState<'RIDE_OFFER' | 'RIDE_REQUEST' | 'HELP_OFFER' | 'HELP_REQUEST' | 'MOMENT' | null>(null);

  // Form States
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formVibe, setFormVibe] = useState('');
  const [formPriceMode, setFormPriceMode] = useState('');
  const [formPriceValue, setFormPriceValue] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formParticipants, setFormParticipants] = useState('3');
  
  // Ride Specifics
  const [formStartCity, setFormStartCity] = useState('');
  const [formEndCity, setFormEndCity] = useState('');
  const [formStartExact, setFormStartExact] = useState('');
  const [formEndExact, setFormEndExact] = useState('');
  const [formArrivalTime, setFormArrivalTime] = useState('');
  const [formCar, setFormCar] = useState('');
  const [formPlate, setFormPlate] = useState('');

  // Help Specifics
  const [formExchange, setFormExchange] = useState('');
  const [formUrgency, setFormUrgency] = useState('NORMAL');

  const t = TRANSLATIONS[lang] || TRANSLATIONS['FR'];

  React.useEffect(() => {
    if (view) setActiveType(view);
  }, [view]);

  const getTitle = () => {
    switch (activeType) {
      case ServiceType.MOMENTS: return t.services.moments;
      case ServiceType.RIDE: return t.services.rides;
      case ServiceType.HELP: return t.services.help;
      default: return "";
    }
  };

  const getActivities = () => {
    let list: Activity[] = [];
    switch(activeType) {
      case ServiceType.MOMENTS: 
        list = moments; 
        if (filter !== 'All') list = list.filter(a => a.category === filter);
        break;
      case ServiceType.RIDE: 
        list = rides; 
        if (rideView === 'ME') {
            list = list.filter(r => r.organizer.id === user.id || r.myStatus === 'PARTICIPANT' || r.myStatus === 'ORGANIZER');
        } else {
            list = list.filter(r => r.organizer.id !== user.id && r.myStatus === 'NONE');
            if (searchStart) list = list.filter(r => r.pickupLocation?.toLowerCase().includes(searchStart.toLowerCase()) || r.title.toLowerCase().includes(searchStart.toLowerCase()));
            if (searchEnd) list = list.filter(r => r.dropoffLocation?.toLowerCase().includes(searchEnd.toLowerCase()) || r.title.toLowerCase().includes(searchEnd.toLowerCase()));
            if (searchDate) list = list.filter(r => r.date.toLowerCase().includes(searchDate.toLowerCase()));
        }
        break;
      case ServiceType.HELP: list = helps; break;
    }
    return list;
  };

  const handleAction = (mode: 'RIDE_OFFER' | 'RIDE_REQUEST' | 'HELP_OFFER' | 'HELP_REQUEST' | 'MOMENT') => {
      setCreateMode(mode);
      setFormTitle(''); setFormDesc(''); setFormAddress(''); setFormVibe(''); setFormPriceMode('');
      setFormPriceValue(''); setFormDate(''); setFormTime(''); setFormArrivalTime('');
      setFormStartCity(''); setFormEndCity(''); setFormStartExact(''); setFormEndExact('');
      setFormCar(''); setFormPlate('');
      setFormParticipants(mode.includes('HELP') ? '1' : '3');
      setShowCreateModal(true);
  };

  const useCurrentPosition = (field: 'START' | 'END' | 'GENERIC') => {
      const pos = '📍 Ma position actuelle';
      if (field === 'START') setFormStartExact(pos);
      else if (field === 'END') setFormEndExact(pos);
      else setFormAddress(pos);
  };

  const handleInstantCapture = () => {
      const newPost = { id: `ip_new_${Date.now()}`, user: user, mainImage: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=600&h=800&fit=crop', selfieImage: user.avatar, postedAt: 'À l\'instant', location: 'Lausanne, Suisse', late: false };
      setLocalInstantPosts(prev => [newPost, ...prev]);
      setHasPostedInstant(true);
      setShowCamera(false);
  };

  const handleSubmit = () => {
      if (!formDate || !formTime) { alert("Veuillez remplir la date et l'heure."); return; }
      const isRide = createMode?.includes('RIDE');
      const newActivity: Activity = {
          id: Date.now().toString(),
          type: createMode === 'MOMENT' ? 'EVENT' : (isRide ? 'RIDE' : 'HELP'),
          subtype: createMode?.includes('OFFER') ? 'OFFER' : 'REQUEST',
          title: isRide ? `${formStartCity} → ${formEndCity}` : formTitle,
          description: formDesc,
          date: formDate,
          time: formTime,
          endTime: createMode === 'MOMENT' ? undefined : formArrivalTime, 
          subtitle: isRide ? `${formStartCity} → ${formEndCity}` : formAddress,
          priceMode: formPriceMode as any,
          priceValue: formPriceValue,
          currency: 'CHF',
          organizer: user,
          participants: 0,
          maxParticipants: parseInt(formParticipants) || 1,
          vibe: formVibe as any,
          pickupLocation: isRide ? (formStartExact || formStartCity) : formStartCity,
          dropoffLocation: isRide ? (formEndExact || formEndCity) : formEndCity,
          vehicleModel: formCar,
          licensePlate: formPlate,
          exchangeDetails: formExchange,
          urgency: formUrgency as any,
          myStatus: 'ORGANIZER',
          candidates: [],
          isDriver: createMode === 'RIDE_OFFER'
      };
      onCreateActivity(newActivity);
      setShowCreateModal(false);
      if (isRide) setRideView('ME');
  };

  const renderActivityCard = (item: Activity, onClick: (a: Activity) => void) => {
      const isRide = item.type === 'RIDE';
      const isHelp = item.type === 'HELP';
      let badgeColor = 'bg-gray-100 text-gray-600';
      let icon = <List size={16}/>;
      let label = t.categories[item.category || 'Other'] || item.category;

      if (isRide) {
          if (item.subtype === 'OFFER') { badgeColor = 'bg-blue-100 text-blue-700'; icon = <Car size={16}/>; label = t.services.driverLabel; } 
          else { badgeColor = 'bg-purple-100 text-purple-700'; icon = <Users size={16}/>; label = t.services.passengerLabel; } 
      } else if (isHelp) {
          if (item.subtype === 'OFFER') { badgeColor = 'bg-teal-100 text-teal-700'; icon = <HeartHandshake size={16}/>; label = t.services.offer; }
          else { badgeColor = 'bg-red-100 text-red-700'; icon = <Siren size={16}/>; label = t.services.request; }
      }

      return (
        <div onClick={() => onClick(item)} key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform cursor-pointer hover:border-brand-200">
            <div className="relative shrink-0">
                <Avatar src={item.organizer.avatar} size="md" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-xs border border-gray-100">
                    {item.type === 'RIDE' ? '🚗' : item.type === 'HELP' ? '🤝' : '📅'}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${badgeColor} mb-1 inline-flex`}>
                        {icon}
                        {label}
                    </span>
                    <span className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-lg">
                        {item.priceMode === 'GRATUIT' ? t.services.free : item.priceMode === 'TROC' ? t.services.trade : `${item.priceValue} ${item.currency}`}
                    </span>
                </div>
                <h4 className="font-bold text-gray-900 truncate text-sm">{item.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        {isRide && <ArrowRight size={12} className="text-gray-400"/>}
                        {isRide ? item.date : (item.subtitle || 'Lieu')}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                </div>
            </div>
        </div>
      );
  };

  // NOUVELLE VUE : "Mes Courses" distincte
  const renderMyRideCard = (item: Activity, onClick: (a: Activity) => void) => {
      const isOrganizer = item.organizer.id === user.id;
      const isOffer = item.subtype === 'OFFER';

      return (
        <div onClick={() => onClick(item)} key={item.id} className={`bg-white p-4 rounded-2xl shadow-md border-l-4 transition-transform active:scale-95 cursor-pointer ${isOrganizer ? 'border-l-blue-600' : 'border-l-brand-600'}`}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isOffer ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                        {isOffer ? <Car size={18}/> : <Users size={18}/>}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {isOrganizer ? "Mon Annonce" : "Ma Réservation"}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-600">{item.date}</span>
                    <Clock size={10} className="text-gray-400" />
                </div>
            </div>

            <h4 className="font-black text-gray-900 text-lg mb-1">{item.title}</h4>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <MapIcon size={12}/> <span className="truncate">{item.pickupLocation}</span>
                <ArrowRight size={10}/> <span className="truncate">{item.dropoffLocation}</span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex items-center gap-2">
                    {!isOrganizer && <Avatar src={item.organizer.avatar} size="xs" />}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">{isOrganizer ? "Places" : "Conducteur"}</span>
                        <span className="text-xs font-bold text-gray-800">{isOrganizer ? `${item.participants}/${item.maxParticipants}` : item.organizer.name}</span>
                    </div>
                </div>
                <Button className="h-8 px-4 text-[10px] font-black uppercase bg-gray-900 text-white rounded-xl shadow-none">Gérer</Button>
            </div>
        </div>
      );
  };

  const vibeOptions = Object.entries(VIBE_OPTIONS).map(([key, label]) => ({ label, value: key }));

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="bg-white shadow-sm z-10 pt-safe-top pb-2 shrink-0">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
            {activeType === ServiceType.MOMENTS && (
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setMomentView('AGENDA')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${momentView === 'AGENDA' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{t.services.agenda}</button>
                    <button onClick={() => setMomentView('INSTANT')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${momentView === 'INSTANT' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{t.services.instant}</button>
                </div>
            )}
            {activeType === ServiceType.RIDE && (
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setRideView('FIND')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${rideView === 'FIND' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{t.services.passenger}</button>
                    <button onClick={() => setRideView('ME')} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${rideView === 'ME' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{t.services.driver}</button>
                </div>
            )}
        </div>
        
        <div className="px-4 pb-2">
            {activeType === ServiceType.RIDE && rideView === 'FIND' && (
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm space-y-2 animate-in slide-in-from-top duration-300">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <MapIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder={t.services.searchStart} value={searchStart} onChange={(e) => setSearchStart(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                        </div>
                        <div className="flex-1 relative">
                            <MapIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder={t.services.searchEnd} value={searchEnd} onChange={(e) => setSearchEnd(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {activeType === ServiceType.MOMENTS && momentView === 'INSTANT' && (
            <div className="space-y-6">
                {!hasPostedInstant ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <div className="w-64 h-80 bg-gray-900 rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center shadow-2xl border border-gray-800">
                            <Lock size={40} className="mb-4 text-brand-400" />
                            <h3 className="font-bold text-xl mb-2">{t.services.instantTitle}</h3>
                            <p className="text-sm text-gray-300 mb-6">{t.services.instantText}</p>
                            <Button onClick={() => setShowCamera(true)} className="bg-brand-600 text-white">
                                <Camera size={18} /> {t.services.instantBtn}
                            </Button>
                        </div>
                    </div>
                ) : (
                    localInstantPosts.map(post => (
                        <div key={post.id} className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg bg-black">
                            <img src={post.mainImage} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                                <Avatar src={post.user.avatar} size="sm" />
                                <span className="text-white text-xs font-bold">{post.user.name}</span>
                            </div>
                            <div className="absolute top-4 right-4 w-20 h-28 rounded-xl overflow-hidden border-2 border-white shadow-xl">
                                <img src={post.selfieImage} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">📍 {post.location}</div>
                        </div>
                    ))
                )}
            </div>
        )}

        {(activeType !== ServiceType.MOMENTS || momentView === 'AGENDA') && (
            <>
                {activeType === ServiceType.RIDE && rideView === 'ME' && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm active:scale-95 transition-transform" onClick={() => handleAction('RIDE_REQUEST')}>
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3"><Users size={24}/></div>
                            <span className="font-bold text-sm text-gray-900 text-center">Chercher Trajet</span>
                            <span className="text-[10px] text-gray-500 mt-1 uppercase font-black tracking-tighter">Passager</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-xl shadow-md active:scale-95 transition-transform" onClick={() => handleAction('RIDE_OFFER')}>
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3"><Car size={24}/></div>
                            <span className="font-bold text-sm text-center">Proposer Trajet</span>
                            <span className="text-[10px] text-blue-200 mt-1 uppercase font-black tracking-tighter">Conducteur</span>
                        </button>
                    </div>
                )}
                
                {activeType === ServiceType.RIDE && rideView === 'ME' ? (
                    <div className="space-y-4 mb-6">
                        {getActivities().length > 0 ? getActivities().map(item => renderMyRideCard(item, onActivityClick)) : (
                            <div className="text-center py-10 opacity-40"><Car size={48} className="mx-auto mb-2"/><p>Aucun trajet en cours.</p></div>
                        )}
                    </div>
                ) : (
                    getActivities().map(item => renderActivityCard(item, onActivityClick))
                )}
            </>
        )}
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title={t.common.create}>
          <div className="space-y-5 pb-6">
             {(createMode === 'RIDE_OFFER' || createMode === 'RIDE_REQUEST') && (
                 <>
                    <div className="space-y-4">
                        <div className={`p-4 rounded-2xl border space-y-3 ${createMode === 'RIDE_OFFER' ? 'bg-blue-50/50 border-blue-100' : 'bg-purple-50/50 border-purple-100'}`}>
                            <h4 className="text-[10px] font-black uppercase text-gray-400">Départ</h4>
                            <Input placeholder="Ville (ex: Genève)" value={formStartCity} onChange={e=>setFormStartCity(e.target.value)} />
                            <div className="relative">
                                <Input placeholder="Lieu précis (ex: Gare)" value={formStartExact} onChange={e=>setFormStartExact(e.target.value)} />
                                <button onClick={() => useCurrentPosition('START')} className="absolute right-3 top-3 text-brand-600"><Navigation size={16}/></button>
                            </div>
                        </div>
                        <div className={`p-4 rounded-2xl border space-y-3 ${createMode === 'RIDE_OFFER' ? 'bg-blue-50/50 border-blue-100' : 'bg-purple-50/50 border-purple-100'}`}>
                            <h4 className="text-[10px] font-black uppercase text-gray-400">Arrivée</h4>
                            <Input placeholder="Ville (ex: Nyon)" value={formEndCity} onChange={e=>setFormEndCity(e.target.value)} />
                            <div className="relative">
                                <Input placeholder="Lieu précis (ex: Parking)" value={formEndExact} onChange={e=>setFormEndExact(e.target.value)} />
                                <button onClick={() => useCurrentPosition('END')} className="absolute right-3 top-3 text-brand-600"><Navigation size={16}/></button>
                            </div>
                        </div>
                    </div>
                    <TextArea label="Description" placeholder="Infos utiles (bagages, musique, itinéraire...)" value={formDesc} onChange={e=>setFormDesc(e.target.value)} />
                    
                    <div className="grid grid-cols-2 gap-3">
                        <Input label={t.form.date} type="date" value={formDate} onChange={e=>setFormDate(e.target.value)} />
                        <Input label="Heure" type="time" value={formTime} onChange={e=>setFormTime(e.target.value)} />
                    </div>

                    {/* COHÉRENCE CONDUCTEUR : champs voiture uniquement si OFFER */}
                    {createMode === 'RIDE_OFFER' ? (
                        <>
                            <div className="grid grid-cols-2 gap-3">
                                <Input label="Heure Arrivée" type="time" value={formArrivalTime} onChange={e=>setFormArrivalTime(e.target.value)} />
                                <Input label="Places" type="number" value={formParticipants} onChange={e=>setFormParticipants(e.target.value)} />
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl space-y-3 border border-gray-100">
                                <Input label="Véhicule" placeholder="Ex: Tesla Model 3" value={formCar} onChange={e=>setFormCar(e.target.value)} />
                                <Input label="Plaque (sécurité)" placeholder="VD 123 456" value={formPlate} onChange={e=>setFormPlate(e.target.value)} />
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                             <Input label="Personnes" type="number" value={formParticipants} onChange={e=>setFormParticipants(e.target.value)} />
                             <Input label="Budget max" placeholder="CHF" type="number" value={formPriceValue} onChange={e=>setFormPriceValue(e.target.value)} />
                        </div>
                    )}

                    <Select label="Ambiance" value={formVibe} onChange={setFormVibe} options={vibeOptions} />
                    
                    {createMode === 'RIDE_OFFER' && (
                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Prix" placeholder="CHF" type="number" value={formPriceValue} onChange={e=>setFormPriceValue(e.target.value)} />
                            <Select label="Paiement" options={[{label:'Twint', value:'TWINT'}, {label:'Cash', value:'CASH'}, {label:'Gratuit', value:'FREE'}]} value={formPriceMode} onChange={setFormPriceMode} />
                        </div>
                    )}
                 </>
             )}
             <Button fullWidth onClick={handleSubmit} className="bg-brand-600 text-white mt-4">{t.common.confirm}</Button>
          </div>
      </Modal>
    </div>
  );
};
