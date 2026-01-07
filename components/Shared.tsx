
import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Camera, SwitchCamera, Circle, CheckCircle, Smartphone, CreditCard, Globe, Banknote, Loader2, Lock } from 'lucide-react';
import { PaymentProvider } from '../types';
import { PAYMENT_CONFIG, SILHOUETTE_AVATAR } from '../constants';

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'black' | 'success';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, disabled = false, isLoading = false }) => {
  const baseClasses = "py-3 px-6 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/30",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
    danger: "bg-danger text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    black: "bg-gray-900 text-white hover:bg-black shadow-lg",
    success: "bg-green-600 text-white shadow-lg"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {isLoading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string }> = ({ label, className, error, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">{label}</label>}
    <input 
      {...props}
      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-transparent'} ${className || ''}`}
    />
    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-brand-600' : 'bg-gray-200'}`}
  >
    <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

export const Tabs: React.FC<{ options: string[]; active: string; onChange: (val: string) => void }> = ({ options, active, onChange }) => (
  <div className="flex bg-gray-100 p-1 rounded-xl w-full">
    {options.map(opt => (
      <button 
        key={opt}
        onClick={() => onChange(opt)} 
        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${active === opt ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
      >
        {opt}
      </button>
    ))}
  </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">{label}</label>}
    <textarea 
      {...props}
      className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all min-h-[100px] resize-none ${className || ''}`}
    />
  </div>
);

export const Select: React.FC<{ label?: string, options: {label: string, value: string}[], value?: string, onChange?: (val: string) => void, placeholder?: string }> = ({ label, options, value, onChange, placeholder = "Sélectionner" }) => (
  <div className="w-full relative">
     {label && <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">{label}</label>}
     <div className="relative">
       <select 
         value={value}
         onChange={(e) => onChange && onChange(e.target.value)}
         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none appearance-none text-gray-900"
       >
         <option value="" disabled>{placeholder}</option>
         {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
       </select>
       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
     </div>
  </div>
);

export const Checkbox: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
}> = ({ checked, onChange, label }) => (
  <div className="flex items-start gap-3 cursor-pointer group" onClick={() => onChange(!checked)}>
    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${checked ? 'bg-brand-600 border-brand-600' : 'border-gray-300 bg-white group-hover:border-brand-400'}`}>
      {checked && <span className="text-white font-bold text-sm">✓</span>}
    </div>
    <div className="text-sm text-gray-600 select-none leading-tight">
      {label}
    </div>
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 ${className} ${onClick ? 'cursor-pointer' : ''}`}>
    {children}
  </div>
);

export const Avatar: React.FC<{ src: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; alt?: string; onClick?: () => void; selected?: boolean }> = ({ src, size = 'md', alt = 'User', onClick, selected }) => {
  const sizes = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  // Logic: Use SILHOUETTE if src is empty string, null, or undefined.
  const finalSrc = src && src.trim() !== '' ? src : SILHOUETTE_AVATAR;

  return (
    <div className={`relative inline-block rounded-full ${selected ? 'ring-4 ring-brand-500' : ''}`}>
        <img 
        onClick={onClick}
        src={finalSrc} 
        alt={alt} 
        className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm bg-gray-100 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
        />
        {selected && <div className="absolute bottom-0 right-0 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center border-2 border-white text-white font-bold text-xs">✓</div>}
    </div>
  );
};

export const BadgeIcon: React.FC<{ icon: string; size?: string }> = ({ icon, size = 'text-xl' }) => (
  <div className={`w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center ${size}`}>
    {icon}
  </div>
);

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center h-full w-full">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl transform transition-transform animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
        <div className="px-6 pt-5 pb-3 shrink-0 relative border-b border-gray-50">
           <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden"></div>
           {title && <h2 className="text-xl font-bold text-gray-900 text-center pr-8">{title}</h2>}
           <button onClick={onClose} className="absolute right-4 top-4 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
             <X size={20} />
           </button>
        </div>
        <div className="overflow-y-auto px-6 py-4 flex-1 overscroll-contain">
          {children}
        </div>
        {footer && <div className="p-6 pt-4 border-t border-gray-100 shrink-0 bg-white rounded-b-3xl sm:rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
};

export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-in zoom-in duration-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-6">{message}</p>
              <div className="flex gap-3">
                  <Button variant="secondary" onClick={onCancel} fullWidth>Annuler</Button>
                  <Button variant="danger" onClick={onConfirm} fullWidth>Confirmer</Button>
              </div>
          </div>
      </div>
  );
};

export const SOSButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-red-500/40 flex items-center gap-2 animate-pulse active:scale-95 transition-transform border-2 border-white/20"
  >
    <span className="text-xl">🚨</span> SOS
  </button>
);

export const CameraInterface: React.FC<{ onCapture: () => void; onClose: () => void }> = ({ onCapture, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleCaptureClick = () => {
      setLoading(true);
      setFlash(true);
      // Simulate slight delay and animation before actual capture call
      setTimeout(() => {
          setFlash(false);
          onCapture();
      }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col text-white">
      {flash && <div className="absolute inset-0 bg-white z-[250] animate-out fade-out duration-300"></div>}
      <div className="flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm absolute top-0 w-full z-10 pt-safe-top">
        <button onClick={onClose}><X size={28} /></button>
        <span className="font-bold">Instant</span>
        <div className="w-7"></div>
      </div>
      <div className="flex-1 relative bg-gray-800 rounded-3xl m-2 overflow-hidden border border-gray-700 mt-20">
         <div className="absolute inset-0 flex items-center justify-center text-gray-500">
             <span className="animate-pulse">Caméra Principale (Simulation)</span>
         </div>
         <div className="absolute top-4 left-4 w-24 h-32 bg-gray-600 rounded-xl border-2 border-white/30 overflow-hidden flex items-center justify-center shadow-lg">
             <span className="text-xs">Selfie</span>
         </div>
      </div>
      <div className="h-32 flex items-center justify-center gap-10 bg-black pb-8">
         <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20"><SwitchCamera size={24} /></button>
         <button onClick={handleCaptureClick} disabled={loading} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-lg hover:bg-white/10">
             {loading ? <Loader2 className="animate-spin text-white" size={32}/> : <div className="w-16 h-16 bg-white rounded-full"></div>}
         </button>
         <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20"><span className="font-bold text-xs">⚡️</span></button>
      </div>
    </div>
  );
};

export const PaymentGateway: React.FC<{ amount: number; onSuccess: () => void; onClose: () => void }> = ({ amount, onSuccess, onClose }) => {
    const [status, setStatus] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
    const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);

    const handlePay = (provider: PaymentProvider) => {
        setSelectedProvider(provider);
        setStatus('PROCESSING');
        // Simulate API call to payment provider
        setTimeout(() => {
            setStatus('SUCCESS');
            setTimeout(onSuccess, 1500);
        }, 2000);
    };

    if (status === 'PROCESSING') {
        return (
            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in">
                <Loader2 size={48} className="text-brand-600 animate-spin mb-4" />
                <h3 className="text-lg font-bold text-gray-900">Connexion à {selectedProvider ? PAYMENT_CONFIG[selectedProvider].label : '...'}</h3>
                <p className="text-sm text-gray-500">Veuillez ne pas quitter.</p>
            </div>
        );
    }

    if (status === 'SUCCESS') {
        return (
            <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Paiement Réussi !</h3>
                <p className="text-gray-500 text-center">Votre transaction de {amount.toFixed(2)} CHF a été validée.</p>
            </div>
        );
    }

    return (
        <div className="pb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Total à payer</h3>
            <p className="text-3xl font-black text-brand-600 mb-6">{amount.toFixed(2)} <span className="text-lg text-gray-500 font-medium">CHF</span></p>
            
            <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Moyens de paiement sécurisés</p>
            <div className="grid grid-cols-1 gap-3">
                {(Object.keys(PAYMENT_CONFIG) as PaymentProvider[]).map((key) => (
                    <button 
                        key={key}
                        onClick={() => handlePay(key)}
                        className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-brand-500 hover:opacity-90 active:scale-95 transition-all group ${PAYMENT_CONFIG[key].color}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{PAYMENT_CONFIG[key].icon}</span>
                            <span className={`font-bold ${key === 'APPLE_PAY' || key === 'TWINT' || key === 'STRIPE' || key === 'PAYPAL' ? 'text-inherit' : 'text-gray-900'}`}>{PAYMENT_CONFIG[key].label}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${key === 'APPLE_PAY' ? 'border-white/30' : 'border-gray-300'}`}>
                            {/* Empty Radio */}
                        </div>
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-6 flex items-center justify-center gap-1">
                <Lock size={10}/> Transactions chiffrées SSL 256-bit
            </p>
        </div>
    );
};
