import React, { useState } from 'react';
import { ActivityType, MarkerItem } from '../types';
import { useApp } from '../store';
import { MapPin, Navigation, User, Car, Heart, AlertTriangle } from 'lucide-react';

interface LiveMapProps {
  onMarkerClick: (item: MarkerItem) => void;
}

const LiveMap: React.FC<LiveMapProps> = ({ onMarkerClick }) => {
  const { activities } = useApp();
  const [activeFilter, setActiveFilter] = useState<ActivityType | 'ALL'>('ALL');

  const filteredItems = activeFilter === 'ALL' 
    ? activities 
    : activities.filter(i => i.type === activeFilter);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.MOMENT: return <MapPin className="w-5 h-5 text-white" />;
      case ActivityType.CARPOOL: return <Car className="w-5 h-5 text-white" />;
      case ActivityType.HELP: return <Heart className="w-5 h-5 text-white" />;
      case ActivityType.ALERT: return <AlertTriangle className="w-5 h-5 text-white" />;
      default: return <User className="w-5 h-5 text-white" />;
    }
  };

  const getColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.MOMENT: return 'bg-swiss-red';
      case ActivityType.CARPOOL: return 'bg-canton-blue';
      case ActivityType.HELP: return 'bg-alpine-green';
      case ActivityType.ALERT: return 'bg-alert';
      default: return 'bg-dark';
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-gray-100">
      {/* Simulated Map Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Karte_Schweiz.svg/2560px-Karte_Schweiz.svg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)'
        }}
      />
      
      {/* Fog/Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/20 pointer-events-none" />

      {/* User Location Pulse */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="w-32 h-32 bg-canton-blue rounded-full opacity-10 animate-ping absolute"></div>
        <div className="w-4 h-4 bg-canton-blue border-2 border-white rounded-full relative shadow-lg"></div>
      </div>

      {/* Markers */}
      {filteredItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onMarkerClick(item)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 group z-10 animate-in zoom-in duration-300`}
          style={{ top: `${item.y}%`, left: `${item.x}%` }}
        >
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-1 rounded-full shadow-lg text-xs font-bold whitespace-nowrap text-dark pointer-events-none z-20">
            {item.title}
          </div>
          
          {/* Pin Icon */}
          <div className={`w-10 h-10 ${getColor(item.type)} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
            {getIcon(item.type)}
          </div>
          
          {/* Pulse for Alerts */}
          {item.type === ActivityType.ALERT && (
            <div className="absolute inset-0 bg-alert rounded-full animate-ping opacity-75 -z-10"></div>
          )}
        </button>
      ))}

      {/* Filter Chips */}
      <div className="absolute top-20 left-0 right-0 px-4 flex gap-2 overflow-x-auto no-scrollbar z-20 pb-4 pt-4">
        <FilterChip label="Tout" active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
        <FilterChip label="Moments" active={activeFilter === ActivityType.MOMENT} onClick={() => setActiveFilter(ActivityType.MOMENT)} color="bg-swiss-red" />
        <FilterChip label="Trajets" active={activeFilter === ActivityType.CARPOOL} onClick={() => setActiveFilter(ActivityType.CARPOOL)} color="bg-canton-blue" />
        <FilterChip label="Entraide" active={activeFilter === ActivityType.HELP} onClick={() => setActiveFilter(ActivityType.HELP)} color="bg-alpine-green" />
      </div>

      {/* Floating GPS Button */}
      <div className="absolute bottom-24 right-4 z-20">
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-dark hover:bg-gray-50 active:scale-95 transition-all">
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const FilterChip = ({ label, active, onClick, color = 'bg-dark' }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm whitespace-nowrap border border-transparent
      ${active ? `${color} text-white shadow-md scale-105` : 'bg-white/90 backdrop-blur-sm text-gray-600 border-gray-100 hover:bg-white'}
    `}
  >
    {label}
  </button>
);

export default LiveMap;
