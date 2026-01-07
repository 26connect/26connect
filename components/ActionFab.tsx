import React, { useState } from 'react';
import { Plus, Zap, Car, Heart, AlertTriangle } from 'lucide-react';
import { ActivityType } from '../types';

interface ActionFabProps {
  onAction: (type: ActivityType) => void;
}

const ActionFab: React.FC<ActionFabProps> = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: ActivityType.MOMENT, label: 'Moment', icon: <Zap className="w-5 h-5" />, color: 'bg-swiss-red', delay: '0ms' },
    { id: ActivityType.CARPOOL, label: 'Trajet', icon: <Car className="w-5 h-5" />, color: 'bg-canton-blue', delay: '50ms' },
    { id: ActivityType.HELP, label: 'Entraide', icon: <Heart className="w-5 h-5" />, color: 'bg-alpine-green', delay: '100ms' },
    { id: ActivityType.ALERT, label: 'Alerte', icon: <AlertTriangle className="w-5 h-5" />, color: 'bg-alert', delay: '150ms' },
  ];

  const handleActionClick = (type: ActivityType) => {
    onAction(type);
    setIsOpen(false);
  };

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
      {/* Expanded Actions */}
      {isOpen && (
        <div className="absolute bottom-20 flex flex-col items-center gap-3 w-64 pointer-events-auto">
          {actions.map((action) => (
            <button
              key={action.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg text-white font-medium transform transition-all duration-300 hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-4 fade-in ${action.color}`}
              style={{ animationDelay: action.delay }}
              onClick={() => handleActionClick(action.id)}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay Background when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 pointer-events-auto ${isOpen ? 'bg-dark rotate-45' : 'bg-swiss-red hover:scale-110'}`}
      >
        <Plus className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default ActionFab;
