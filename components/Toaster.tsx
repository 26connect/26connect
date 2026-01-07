import React from 'react';
import { useApp } from '../store';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toaster: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed top-safe-top pt-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="bg-dark text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2 fade-in duration-300 min-w-[300px]"
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-alpine-green" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-swiss-red" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-canton-blue" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
