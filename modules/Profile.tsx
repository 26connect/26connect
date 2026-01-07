import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { User, Activity, Language } from '../types';
import { Modal, Button, Avatar, Input, ConfirmationModal, Toggle, PaymentGateway } from '../components/Shared';
import { MOCK_ACTIVITIES, MOCK_FRIENDS, TRANSLATIONS, DEFAULT_AVATARS } from '../constants';
import { Settings, Shield, Award, ChevronRight, Clock, MapPin, LogOut, Edit2, Crown, FileText, Camera } from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const ProfileModule: React.FC<{ user: User, onActivityClick: (act: Activity) => void, onViewFriend: (friend: User) => void, onLanguageChange: (lang: Language) => void, currentLang: Language, onUpdateUser: (u: User) => void }> = ({ user, onActivityClick }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  return (
    <StyledView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 100}}>
          {/* Header */}
          <StyledView className="bg-white pb-6 pt-4 rounded-b-3xl shadow-sm">
             <StyledView className="px-6 flex-row justify-between items-center mb-4">
                 <StyledText className="text-2xl font-bold text-gray-900">Mon Profil</StyledText>
                 <TouchableOpacity onPress={() => setActiveModal('SETTINGS')} className="p-2 bg-gray-50 rounded-full">
                     <Settings size={20} color="#4b5563"/>
                 </TouchableOpacity>
             </StyledView>
             
             <StyledView className="items-center">
                 <StyledView className="relative">
                    <Avatar src={user.avatar} size="xl" />
                    {user.isPremium && <StyledText className="absolute -top-2 -right-2 text-2xl">👑</StyledText>}
                 </StyledView>
                 <StyledText className="text-2xl font-black text-gray-900 mt-3">{user.name}</StyledText>
                 <StyledText className="text-gray-500 text-sm">{user.email}</StyledText>
                 <StyledText className="text-gray-600 text-sm italic mt-2 px-8 text-center">"{user.bio}"</StyledText>
             </StyledView>

             <StyledView className="flex-row justify-center gap-4 mt-6 px-4">
                 <StyledView className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 items-center">
                     <StyledText className="text-2xl font-black text-gray-900">4</StyledText>
                     <StyledText className="text-[10px] text-gray-500 uppercase font-bold">Cantons</StyledText>
                 </StyledView>
                 <StyledView className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 items-center">
                     <StyledText className="text-2xl font-black text-gray-900">{MOCK_FRIENDS.length}</StyledText>
                     <StyledText className="text-[10px] text-gray-500 uppercase font-bold">Amis</StyledText>
                 </StyledView>
             </StyledView>
          </StyledView>

          {/* Menu Items */}
          <StyledView className="p-4 gap-4">
             <StyledView className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                {[
                    { icon: <Award size={20} color="#dc2626"/>, label: "Mes Badges", action: 'BADGES' },
                    { icon: <Crown size={20} color="#eab308"/>, label: "Premium", action: 'PREMIUM' },
                    { icon: <Shield size={20} color="#3b82f6"/>, label: "Sécurité", action: 'SECURITY' },
                    { icon: <FileText size={20} color="#6b7280"/>, label: "Aide & Mentions", action: 'HELP' }
                ].map((item, i) => (
                    <StyledTouchableOpacity key={i} onPress={() => setActiveModal(item.action)} className="p-4 border-b border-gray-50 flex-row items-center justify-between">
                        <StyledView className="flex-row items-center gap-4">
                            <StyledView className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">{item.icon}</StyledView>
                            <StyledText className="font-bold text-gray-700">{item.label}</StyledText>
                        </StyledView>
                        <ChevronRight size={18} color="#d1d5db" />
                    </StyledTouchableOpacity>
                ))}
             </StyledView>

             <StyledText className="text-xl font-bold text-gray-900 mt-2 px-2">Agenda</StyledText>
             {MOCK_ACTIVITIES.slice(0,3).map(item => (
                 <StyledTouchableOpacity key={item.id} onPress={() => onActivityClick(item)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-row">
                     <StyledView className={`w-3 bg-brand-500`} />
                     <StyledView className="p-4 flex-1">
                         <StyledText className="font-bold text-gray-900 text-lg mb-1">{item.title}</StyledText>
                         <StyledView className="flex-row items-center gap-3">
                            <StyledView className="flex-row items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                <Clock size={12} color="#374151" />
                                <StyledText className="text-xs font-bold text-gray-700">{item.time}</StyledText>
                            </StyledView>
                            <StyledView className="flex-row items-center gap-1">
                                <MapPin size={12} color="#9ca3af" />
                                <StyledText className="text-xs text-gray-500">{item.subtitle}</StyledText>
                            </StyledView>
                         </StyledView>
                     </StyledView>
                 </StyledTouchableOpacity>
             ))}
          </StyledView>
      </ScrollView>

      {/* Modals Stubs */}
      <Modal isOpen={activeModal === 'PREMIUM'} onClose={() => setActiveModal(null)} title="Premium">
          <PaymentGateway amount={49} onSuccess={() => setActiveModal(null)} onClose={() => setActiveModal(null)} />
      </Modal>
      
      <Modal isOpen={activeModal === 'BADGES'} onClose={() => setActiveModal(null)} title="Badges">
          <StyledView>
              {user.badges.map(b => (
                  <StyledView key={b.id} className="flex-row items-center gap-4 p-4 border-b border-gray-100">
                      <StyledText className="text-3xl">{b.icon}</StyledText>
                      <StyledView>
                          <StyledText className="font-bold">{b.name}</StyledText>
                          <StyledText className="text-gray-500 text-xs">{b.description}</StyledText>
                      </StyledView>
                  </StyledView>
              ))}
          </StyledView>
      </Modal>
    </StyledView>
  );
};
