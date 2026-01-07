import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Compass, Navigation, Flame, HandHeart, Car, Users, List, User } from 'lucide-react';
import { Avatar } from '../components/Shared';
import { MOCK_ACTIVITIES, MOCK_FRIENDS, TRANSLATIONS, INTENTIONS } from '../constants';
import { Language } from '../types';

declare global {
  interface Window {
    L: any;
  }
}

interface Props {
  onPinClick: (id: string, type: 'USER' | 'ACTIVITY') => void;
  onIntentionClick: () => void;
  lang: Language;
  onMyPositionClick?: () => void;
  activeIntention?: any;
}

export const PsittMap: React.FC<Props> = ({ onPinClick, onIntentionClick, lang, onMyPositionClick, activeIntention }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  
  // State
  const [mapFilter, setMapFilter] = useState<'ALL' | 'EVENT' | 'HELP' | 'RIDE' | 'INTENTIONS'>('ALL');
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    if (window.L) {
        // Centered on Switzerland roughly initially
        const map = window.L.map(mapRef.current, { zoomControl: false, attributionControl: false, zoomAnimation: true }).setView([46.8182, 8.2275], 8);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
        mapInstance.current = map;
        
        // --- REAL GEOLOCATION IMPLEMENTATION ---
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    // Fly to user location smoothly
                    map.flyTo([latitude, longitude], 14, {
                        animate: true,
                        duration: 1.5
                    });

                    // Update User Marker Position
                    if (userMarkerRef.current) {
                        userMarkerRef.current.setLatLng([latitude, longitude]);
                    } else {
                        // Create if not exists
                        const L = window.L;
                        const myIcon = L.divIcon({
                            className: 'custom-div-icon',
                            html: `<div class="relative w-12 h-12 flex items-center justify-center"><div class="absolute inset-0 bg-brand-500 rounded-full opacity-30 animate-ping"></div><div class="w-4 h-4 bg-brand-600 border-2 border-white rounded-full shadow-lg relative z-10"></div></div>`,
                            iconSize: [48, 48], iconAnchor: [24, 24]
                        });
                        userMarkerRef.current = L.marker([latitude, longitude], { icon: myIcon, zIndexOffset: 1000 }).addTo(map);
                    }
                },
                (error) => console.warn("Geolocation denied or error:", error),
                { enableHighAccuracy: true }
            );
        }
        
        setTimeout(() => { map.invalidateSize(); }, 100);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !window.L) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    const map = mapInstance.current;
    const L = window.L;
    
    // We don't use map center anymore for random generation to ensure they are all over Switzerland
    // Switzerland Bounding Box approx: Lat 45.8 - 47.8, Lng 6.0 - 10.5

    // 1. FRIENDS (Green/Avatar)
    if (mapFilter === 'ALL' || mapFilter === 'INTENTIONS') {
        MOCK_FRIENDS.forEach((f) => {
            // Randomize across Switzerland
            const lat = 46.0 + (Math.random() * 1.5); 
            const lng = 6.2 + (Math.random() * 3.5);

            const userIntention = INTENTIONS.find(intent => intent.id === f.intention);
            const html = `
                <div class="flex flex-col items-center">
                    <div class="relative w-10 h-10 transition-transform hover:scale-110">
                        <img src="${f.avatar}" class="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover" />
                        ${mapFilter === 'INTENTIONS' && userIntention ? `<div class="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-gray-100 shadow-sm text-[10px] w-5 h-5 flex items-center justify-center">${userIntention.icon}</div>` : '<div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>'}
                    </div>
                </div>`;
            const icon = L.divIcon({ className: 'custom-div-icon', html: html, iconSize: [40, 60], iconAnchor: [20, 30] });
            const marker = L.marker([lat, lng], { icon }).addTo(map);
            marker.on('click', () => onPinClick(f.id, 'USER'));
            markersRef.current.push(marker);
        });
    }

    // 2. ACTIVITIES (Distinct Colors)
    MOCK_ACTIVITIES.filter(a => mapFilter === 'ALL' || a.type === mapFilter).forEach((a) => {
        // Randomize across Switzerland
        const lat = 46.0 + (Math.random() * 1.5); 
        const lng = 6.2 + (Math.random() * 3.5);
        
        // Colors & Icons Logic
        let iconChar = '📅';
        let colorClass = 'bg-purple-600 border-purple-400'; // Default Event
        
        if (a.type === 'RIDE') { 
            iconChar = '🚗'; 
            colorClass = 'bg-blue-600 border-blue-400'; 
        } else if (a.type === 'HELP') { 
            iconChar = '🤝'; 
            colorClass = 'bg-red-600 border-red-400'; 
        } else {
             // Event subtypes
             if(a.category === 'Sport') { colorClass = 'bg-orange-500 border-orange-300'; iconChar='🏀'; }
        }

        const html = `<div class="flex flex-col items-center group cursor-pointer hover:z-50 hover:scale-110 transition-transform">
            <div class="w-10 h-10 ${colorClass} rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white text-lg">${iconChar}</div>
            <div class="bg-white px-2 py-0.5 rounded shadow-sm text-[10px] font-bold mt-1 whitespace-nowrap hidden group-hover:block">${a.title}</div>
        </div>`;
        
        const icon = L.divIcon({ className: 'custom-div-icon', html: html, iconSize: [40, 60], iconAnchor: [20, 30] });
        const marker = L.marker([lat, lng], { icon }).addTo(map);
        marker.on('click', () => onPinClick(a.id, 'ACTIVITY'));
        markersRef.current.push(marker);
    });

    // Re-add user marker if strictly needed (though Geolocation logic above handles it better)
    if (!userMarkerRef.current) {
        // Fallback simulated position near Lausanne if geolocation fails/not ready
        const myLat = 46.5197;
        const myLng = 6.6323;
        const myIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="relative w-12 h-12 flex items-center justify-center"><div class="absolute inset-0 bg-brand-500 rounded-full opacity-30 animate-ping"></div><div class="w-4 h-4 bg-brand-600 border-2 border-white rounded-full shadow-lg relative z-10"></div></div>`,
            iconSize: [48, 48], iconAnchor: [24, 24]
        });
        userMarkerRef.current = L.marker([myLat, myLng], { icon: myIcon, zIndexOffset: 1000 }).addTo(map);
    }
    
    // Wire up MyPosition Click
    userMarkerRef.current.on('click', onMyPositionClick);

  }, [mapFilter, activeIntention]);

  const filters = [
      { id: 'ALL', label: 'Tout', icon: null },
      { id: 'EVENT', label: 'Moments', icon: <Flame size={12} /> },
      { id: 'HELP', label: 'Entraide', icon: <HandHeart size={12} /> },
      { id: 'RIDE', label: 'Pouces', icon: <Car size={12} /> },
      { id: 'INTENTIONS', label: 'Intentions', icon: <Compass size={12} /> },
  ];

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
        <div id="map" ref={mapRef} className="absolute inset-0 w-full h-full z-0 bg-gray-200"></div>

        {/* --- TOP FILTERS (Fixed Scroll) --- */}
        <div className="absolute top-4 left-0 w-full z-30 px-2">
            <div className="flex gap-2 overflow-x-auto pb-2 px-2 hide-scrollbar">
                 {filters.map(f => (
                    <button 
                        key={f.id} 
                        onClick={() => setMapFilter(f.id as any)} 
                        className={`px-4 py-2.5 rounded-full text-xs font-bold border whitespace-nowrap shadow-md transition-all flex items-center gap-2 shrink-0 ${mapFilter === f.id ? 'bg-gray-900 text-white border-gray-900 scale-105' : 'bg-white text-gray-700 border-white/80'}`}
                    >
                        {f.icon}
                        {f.label}
                    </button>
                ))}
            </div>
        </div>

        {/* --- BOTTOM SHEET --- */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none flex flex-col justify-end">
            <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 pt-4 pb-2 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pointer-events-auto">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                
                <h3 className="text-sm font-bold text-gray-900 px-4 mb-3">Qui est autour de moi ?</h3>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-4">
                    {MOCK_FRIENDS.map(f => (
                        <div key={f.id} onClick={() => onPinClick(f.id, 'USER')} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer active:scale-95 transition-transform">
                            <div className="relative">
                                <Avatar src={f.avatar} size="md" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 truncate w-full text-center">{f.name}</span>
                        </div>
                    ))}
                </div>

                <h3 className="text-sm font-bold text-gray-900 px-4 mb-3">Bientôt dans le coin</h3>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-6">
                    {MOCK_ACTIVITIES.slice(0, 5).map(a => (
                        <div key={a.id} onClick={() => onPinClick(a.id, 'ACTIVITY')} className="bg-white border border-gray-100 p-3 rounded-xl flex items-center gap-3 min-w-[240px] shadow-sm active:scale-95 transition-transform cursor-pointer">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex flex-col items-center justify-center shrink-0 border border-gray-200">
                                <span className="text-[10px] text-red-500 font-bold uppercase">Oct</span>
                                <span className="text-lg font-bold text-gray-900">{Math.floor(Math.random() * 30) + 1}</span>
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-sm text-gray-900 truncate">{a.title}</h4>
                                <p className="text-xs text-gray-500 truncate">{a.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};