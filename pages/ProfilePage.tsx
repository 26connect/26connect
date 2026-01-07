import React from 'react';
import { ShieldCheck, Map, Trophy, Settings } from 'lucide-react';
import { MOCK_USER, CANTONS } from '../constants';

const ProfilePage: React.FC = () => {
  return (
    <div className="pb-24 pt- safe-top">
      {/* Header */}
      <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-dark">Mon Profil</h1>
          <button className="p-2 bg-gray-50 rounded-full text-gray-600">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={MOCK_USER.avatar} 
              alt={MOCK_USER.name} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-swiss-red text-white p-1.5 rounded-full border-4 border-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-dark mb-1">{MOCK_USER.name}</h2>
          <p className="text-gray-500 text-sm mb-4">Membre depuis 2024</p>
          
          <div className="flex gap-2">
            {MOCK_USER.badges.map(badge => (
              <span key={badge} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold border border-yellow-200">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-3 bg-gray-50 rounded-2xl">
            <div className="text-xl font-bold text-dark">12</div>
            <div className="text-xs text-gray-500 uppercase font-medium mt-1">Moments</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-2xl">
            <div className="text-xl font-bold text-dark">4.8</div>
            <div className="text-xs text-gray-500 uppercase font-medium mt-1">Rating</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-2xl">
            <div className="text-xl font-bold text-swiss-red">7/26</div>
            <div className="text-xs text-gray-500 uppercase font-medium mt-1">Cantons</div>
          </div>
        </div>
      </div>

      {/* Gamification / Cantons */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-dark flex items-center gap-2">
            <Map className="w-5 h-5 text-canton-blue" />
            Grand Tour Suisse
          </h3>
          <span className="text-xs font-bold text-canton-blue bg-canton-light px-2 py-1 rounded-full">
            Niveau 2
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {CANTONS.map((canton) => (
            <div 
              key={canton.id}
              className={`relative overflow-hidden rounded-2xl p-4 h-24 flex flex-col justify-between transition-all active:scale-95
                ${canton.status === 'locked' ? 'bg-gray-100 opacity-70 grayscale' : 'bg-white shadow-sm border border-gray-100'}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-2xl font-black ${canton.status === 'locked' ? 'text-gray-300' : 'text-dark'}`}>
                  {canton.code}
                </span>
                {canton.status === 'visited' && (
                  <Trophy className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-600">{canton.name}</span>
              
              {/* Progress bar visual */}
              {canton.status === 'active' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                  <div className="h-full bg-canton-blue w-2/3"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 font-bold hover:bg-gray-50 transition-colors">
          Voir tous les cantons
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;