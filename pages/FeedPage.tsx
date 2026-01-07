import React from 'react';
import { ActivityType } from '../types';
import { useApp } from '../store';
import { Clock, MapPin, ChevronRight, Search, Users } from 'lucide-react';

interface FeedPageProps {
  type: ActivityType;
  title: string;
  subtitle: string;
  color: string;
}

const FeedPage: React.FC<FeedPageProps> = ({ type, title, subtitle, color }) => {
  const { activities, joinActivity } = useApp();
  
  // Filter items based on the page type
  const items = type === ActivityType.MOMENT 
    ? activities // Show all in generic view or filter if needed, keeping simple for demo
    : activities.filter(i => i.type === type);

  return (
    <div className="pb-24 pt-safe-top min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-20 shadow-sm pt-8">
        <h1 className={`text-3xl font-black mb-1 ${color}`}>{title}</h1>
        <p className="text-gray-500 font-medium">{subtitle}</p>
        
        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-dark"
          />
        </div>
      </div>

      {/* List */}
      <div className="p-4 flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>Aucune activité pour le moment.</p>
            <p className="text-sm">Soyez le premier à en créer une !</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.99] transition-transform animate-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <img src={item.user.avatar} className="w-10 h-10 rounded-full bg-gray-200 object-cover" alt="" />
                  <div>
                    <h3 className="font-bold text-dark text-sm">{item.user.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span>{item.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                        {item.distance}
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${color.replace('text-', 'bg-').replace('600', '100')} ${color} bg-opacity-10`}>
                  {item.type}
                </span>
              </div>
              
              <h4 className="font-bold text-lg text-dark mb-1">{item.title}</h4>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                   <Users className="w-3 h-3" />
                   {item.participants} participants
                 </div>
                 <button 
                  onClick={() => joinActivity(item.id)}
                  className="flex items-center gap-1 text-sm font-bold text-dark hover:opacity-70 bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                 >
                   Rejoindre <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedPage;
