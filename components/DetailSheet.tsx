
import React, { useState } from 'react';
import { X, MessageCircle, Share2, Clock, MapPin, ShieldCheck, Users, Banknote, RefreshCw, Heart } from 'lucide-react';
import { ExchangeType, MarkerItem } from '../types';
import { useApp } from '../store';
import PaymentModal from './PaymentModal';

interface DetailSheetProps {
  item: MarkerItem | null;
  onClose: () => void;
}

const DetailSheet: React.FC<DetailSheetProps> = ({ item, onClose }) => {
  const { joinActivity } = useApp();
  const [showPayment, setShowPayment] = useState(false);
  
  if (!item) return null;

  const isFull = item.maxParticipants > 0 && item.participants >= item.maxParticipants;
  const isPaid = item.exchangeType === ExchangeType.PRICE && item.price && item.price > 0;

  const handleMainAction = () => {
    if (isFull) return;
    
    if (isPaid) {
      setShowPayment(true);
    } else {
      joinActivity(item.id);
      onClose();
    }
  };

  const handlePaymentSuccess = () => {
    joinActivity(item.id);
    setShowPayment(false);
    onClose();
  };

  // Helper to render exchange badge
  const renderExchangeBadge = () => {
    if (item.exchangeType === ExchangeType.FREE) {
        return (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl text-sm font-bold text-alpine-green border border-green-100">
                <Heart className="w-4 h-4" />
                <span>Gratuit</span>
            </div>
        );
    }
    if (item.exchangeType === ExchangeType.BARTER) {
        return (
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl text-sm font-bold text-purple-600 border border-purple-100">
                <RefreshCw className="w-4 h-4" />
                <span>Troc : {item.barterRequest || 'À discuter'}</span>
            </div>
        );
    }
    if (item.exchangeType === ExchangeType.PRICE) {
        return (
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-xl text-sm font-bold text-yellow-700 border border-yellow-100">
                <Banknote className="w-4 h-4" />
                <span>CHF {item.price}</span>
            </div>
        );
    }
    return null;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-swiss-red/10 text-swiss-red text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {item.type}
              </span>
              <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.time}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-dark leading-tight">{item.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="relative">
            <img src={item.user.avatar} alt={item.user.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
            {item.user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-alpine-green text-white p-0.5 rounded-full border-2 border-white">
                <ShieldCheck className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-dark flex items-center gap-2">
              {item.user.name}
              <span className="text-yellow-400 text-sm flex items-center">★ {item.user.rating}</span>
            </h3>
            <p className="text-sm text-gray-500">{item.user.badges[0]} • {item.user.cantonsVisited} Cantons</p>
          </div>
        </div>

        {/* Description & Stats */}
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            {item.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
             {/* Distance */}
             <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl text-sm font-bold text-canton-blue">
                <MapPin className="w-4 h-4" />
                <span>{item.distance}</span>
             </div>

             {/* Participants */}
             <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border ${isFull ? 'bg-red-50 text-red-500 border-red-100' : 'bg-gray-50 text-dark border-transparent'}`}>
                <Users className="w-4 h-4" />
                <span>
                   {item.participants} 
                   {item.maxParticipants > 0 && ` / ${item.maxParticipants}`}
                </span>
                {isFull && <span className="text-[10px] uppercase ml-1">Complet</span>}
             </div>

             {/* Exchange Info */}
             {renderExchangeBadge()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={handleMainAction}
            disabled={isFull}
            className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2
              ${isFull 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-swiss-red text-white shadow-swiss-red/20 hover:bg-swiss-darkRed'}
            `}
          >
            {isFull ? 'Complet' : isPaid ? `Payer CHF ${item.price}` : 'Rejoindre'}
          </button>
          <button className="px-4 py-4 bg-canton-light text-canton-blue rounded-xl font-bold active:scale-[0.98] transition-all">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="px-4 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold active:scale-[0.98] transition-all">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)}
        price={item.price || 0}
        itemTitle={item.title}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default DetailSheet;
