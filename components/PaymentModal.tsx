
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Check, Loader2 } from 'lucide-react';
import { useApp } from '../store';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  itemTitle: string;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, price, itemTitle, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = (method: string) => {
    setLoading(true);
    // Simulation du paiement
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        setSuccess(false);
      }, 1500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 backdrop-blur-md animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="w-20 h-20 bg-alpine-green rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-dark">Paiement Réussi !</h2>
          <p className="text-gray-500">Vous avez rejoint l'activité.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
      
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 pointer-events-auto animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
             <h2 className="text-xl font-bold text-dark">Paiement Sécurisé</h2>
             <p className="text-sm text-gray-500">{itemTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl text-center mb-6 border border-gray-100">
            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total à payer</div>
            <div className="text-4xl font-black text-dark">CHF {price.toFixed(2)}</div>
        </div>

        <div className="space-y-3">
            {/* TWINT */}
            <button 
                onClick={() => handlePayment('TWINT')}
                disabled={loading}
                className="w-full bg-white border-2 border-black text-dark font-bold py-4 rounded-xl flex items-center justify-between px-6 hover:bg-gray-50 active:scale-95 transition-all"
            >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">TW</div>
                   <span>TWINT</span>
                </div>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="text-sm font-bold text-gray-400">Scan</span>}
            </button>

            {/* Apple Pay */}
            <button 
                onClick={() => handlePayment('APPLE')}
                disabled={loading}
                className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-95 transition-all"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                        <span className="font-bold">Pay</span>
                        <span className="text-sm opacity-80">Apple Pay</span>
                    </>
                )}
            </button>

            {/* Carte */}
            <button 
                onClick={() => handlePayment('CARD')}
                disabled={loading}
                className="w-full bg-swiss-red text-white font-bold py-4 rounded-xl flex items-center justify-between px-6 shadow-lg shadow-swiss-red/20 active:scale-95 transition-all"
            >
                <div className="flex items-center gap-3">
                   <CreditCard className="w-5 h-5" />
                   <span>Carte Bancaire</span>
                </div>
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            </button>
        </div>
        
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-3 h-3" />
            <span>Paiement chiffré et sécurisé</span>
        </div>
      </div>
    </div>
  );
};

// Petite icône manquante
const ShieldCheck = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default PaymentModal;
