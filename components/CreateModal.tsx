
import React, { useState } from 'react';
import { X, MapPin, Clock, Zap, Car, Heart, AlertTriangle, Users, Wallet, RefreshCw } from 'lucide-react';
import { ActivityType, ExchangeType } from '../types';
import { useApp } from '../store';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: ActivityType;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, initialType }) => {
  const { addActivity } = useApp();
  const [type, setType] = useState<ActivityType>(initialType || ActivityType.MOMENT);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('Dans 10 min');
  
  // Champs avancés
  const [maxParticipants, setMaxParticipants] = useState<number>(5);
  const [exchangeType, setExchangeType] = useState<ExchangeType>(ExchangeType.FREE);
  const [price, setPrice] = useState<string>(''); 
  const [barterRequest, setBarterRequest] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    // Simulate random position
    const x = 40 + Math.random() * 20;
    const y = 40 + Math.random() * 20;

    addActivity({
      type,
      title,
      description,
      time,
      distance: 'Ici',
      x,
      y,
      maxParticipants: maxParticipants || 0,
      exchangeType: exchangeType,
      price: exchangeType === ExchangeType.PRICE ? (price ? parseFloat(price) : 0) : 0,
      barterRequest: exchangeType === ExchangeType.BARTER ? barterRequest : undefined
    });
    
    // Reset
    setTitle('');
    setDescription('');
    setPrice('');
    setBarterRequest('');
    setExchangeType(ExchangeType.FREE);
    setMaxParticipants(5);
    onClose();
  };

  const types = [
    { id: ActivityType.MOMENT, label: 'Moment', icon: <Zap className="w-4 h-4" />, color: 'bg-swiss-red' },
    { id: ActivityType.CARPOOL, label: 'Trajet', icon: <Car className="w-4 h-4" />, color: 'bg-canton-blue' },
    { id: ActivityType.HELP, label: 'Entraide', icon: <Heart className="w-4 h-4" />, color: 'bg-alpine-green' },
    { id: ActivityType.ALERT, label: 'Alerte', icon: <AlertTriangle className="w-4 h-4" />, color: 'bg-alert' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 pointer-events-auto animate-in slide-in-from-bottom duration-300 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark">Créer une activité</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {types.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
                  ${type === t.id ? `${t.color} text-white shadow-md scale-105` : 'bg-gray-100 text-gray-500'}
                `}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Titre</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={type === ActivityType.HELP ? "Ex: Besoin d'une perceuse" : "Titre de l'activité"}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium focus:ring-2 focus:ring-swiss-red focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails..."
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium focus:ring-2 focus:ring-swiss-red focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Quand ?</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 font-medium appearance-none"
                  >
                    <option>Maintenant</option>
                    <option>Dans 15 min</option>
                    <option>Ce soir 18h</option>
                  </select>
                </div>
               </div>
               <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Places</label>
                <div className="relative">
                     <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                     <input 
                        type="number" 
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                        min={1}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 font-medium focus:outline-none"
                     />
                </div>
               </div>
            </div>

            {/* SECTION ÉCHANGE (Sauf pour Alerte) */}
            {type !== ActivityType.ALERT && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Compensation</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                        type="button"
                        onClick={() => setExchangeType(ExchangeType.FREE)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${exchangeType === ExchangeType.FREE ? 'bg-white border-2 border-alpine-green text-alpine-green shadow-sm' : 'bg-gray-100 text-gray-400'}`}
                    >
                        Gratuit
                    </button>
                    <button
                        type="button"
                        onClick={() => setExchangeType(ExchangeType.PRICE)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${exchangeType === ExchangeType.PRICE ? 'bg-white border-2 border-canton-blue text-canton-blue shadow-sm' : 'bg-gray-100 text-gray-400'}`}
                    >
                        Prix (CHF)
                    </button>
                    <button
                        type="button"
                        onClick={() => setExchangeType(ExchangeType.BARTER)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${exchangeType === ExchangeType.BARTER ? 'bg-white border-2 border-purple-500 text-purple-500 shadow-sm' : 'bg-gray-100 text-gray-400'}`}
                    >
                        Troc ⇄
                    </button>
                </div>

                {exchangeType === ExchangeType.PRICE && (
                    <div className="relative animate-in slide-in-from-top-1">
                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-canton-blue" />
                        <input 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Montant en CHF"
                            className="w-full bg-white border border-gray-200 rounded-xl p-3 pl-10 font-medium focus:outline-none focus:border-canton-blue"
                        />
                    </div>
                )}

                {exchangeType === ExchangeType.BARTER && (
                    <div className="relative animate-in slide-in-from-top-1">
                        <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                        <input 
                            type="text" 
                            value={barterRequest}
                            onChange={(e) => setBarterRequest(e.target.value)}
                            placeholder="Ex: Contre un repas, un cours..."
                            className="w-full bg-white border border-gray-200 rounded-xl p-3 pl-10 font-medium focus:outline-none focus:border-purple-500"
                        />
                    </div>
                )}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-dark text-white font-bold py-4 rounded-xl mt-4 shadow-lg active:scale-95 transition-all"
          >
            Publier sur la carte 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
