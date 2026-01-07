
import React, { useState, useEffect } from 'react';
import { Smartphone, ScanFace, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../store';

const AuthFlow: React.FC = () => {
  const { login, verifyIdentity } = useApp();
  const [step, setStep] = useState<'intro' | 'phone' | 'otp' | 'scan' | 'success'>('intro');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulation du scan biométrique
  useEffect(() => {
    if (step === 'scan') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                verifyIdentity(); // Update global store
                setStep('success');
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length > 8) setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (index === 3 && value) {
      setTimeout(() => setStep('scan'), 500);
    }
  };

  const finishAuth = () => {
    login();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      
      {/* INTRO */}
      {step === 'intro' && (
        <div className="text-center max-w-xs animate-in slide-in-from-bottom duration-500">
          <div className="w-20 h-20 bg-swiss-red rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-swiss-red/20">
            <span className="text-white font-black text-3xl">26</span>
          </div>
          <h1 className="text-3xl font-black text-dark mb-2">26Connect</h1>
          <p className="text-gray-500 mb-8 font-medium">La Suisse en vrai.<br/>Connecte-toi à ton quartier.</p>
          <button 
            onClick={() => setStep('phone')}
            className="w-full bg-dark text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Commencer <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* PHONE */}
      {step === 'phone' && (
        <div className="w-full max-w-xs animate-in slide-in-from-right duration-300">
          <h2 className="text-2xl font-bold text-dark mb-2">Ton Numéro</h2>
          <p className="text-gray-500 mb-6 text-sm">On t'envoie un code pour vérifier que c'est toi.</p>
          <form onSubmit={handlePhoneSubmit}>
            <div className="relative mb-6">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="tel" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+41 79 123 45 67"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-swiss-red"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              disabled={phoneNumber.length < 9}
              className="w-full bg-canton-blue text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 transition-all"
            >
              Envoyer le code
            </button>
          </form>
        </div>
      )}

      {/* OTP */}
      {step === 'otp' && (
        <div className="w-full max-w-xs text-center animate-in slide-in-from-right duration-300">
          <h2 className="text-2xl font-bold text-dark mb-2">Code reçu ?</h2>
          <p className="text-gray-500 mb-8 text-sm">Entre le code à 4 chiffres envoyé au {phoneNumber}</p>
          <div className="flex justify-center gap-4 mb-8">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-14 h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-black focus:border-swiss-red focus:outline-none transition-colors"
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">Renvoyer le code dans 20s</p>
        </div>
      )}

      {/* BIOMETRIC SCAN */}
      {step === 'scan' && (
        <div className="text-center w-full max-w-xs animate-in zoom-in duration-300">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-swiss-red/20 rounded-full"></div>
            <div 
                className="absolute inset-0 border-4 border-swiss-red rounded-full transition-all duration-100"
                style={{ clipPath: `inset(${100 - scanProgress}% 0 0 0)` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <ScanFace className={`w-24 h-24 ${scanProgress === 100 ? 'text-swiss-red' : 'text-gray-300'}`} />
            </div>
            {/* Scan Beam */}
            <div className="absolute inset-x-0 h-1 bg-swiss-red/50 shadow-[0_0_15px_rgba(255,0,0,0.5)] top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">Passeport 26Connect</h2>
          <p className="text-gray-500 font-medium">Vérification biométrique en cours...</p>
          <div className="mt-4 text-xs font-bold text-swiss-red uppercase tracking-widest">
            {scanProgress}% Sécurisé
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {step === 'success' && (
        <div className="text-center w-full max-w-xs animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-alpine-green rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-alpine-green/30 animate-bounce">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black text-dark mb-2">Vérifié !</h2>
          <p className="text-gray-500 mb-8 font-medium">Bienvenue dans la communauté de confiance 26Connect.</p>
          <button 
            onClick={finishAuth}
            className="w-full bg-dark text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            Accéder à la carte
          </button>
        </div>
      )}
      
      <style>{`
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AuthFlow;
