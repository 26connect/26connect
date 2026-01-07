import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { VIBE_OPTIONS, MOCK_INSTANT_POSTS, TRANSLATIONS, CURRENT_USER } from '../constants';
import { Activity, ServiceType, Language } from '../types';
import { Button, Modal, Input, Select, TextArea, CameraInterface, Avatar } from '../components/Shared';
import { 
  Users, Car, HeartHandshake, Plus, Siren, Navigation, Camera, Lock, Map as MapIcon, List, ArrowRight, Calendar
} from 'lucide-react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

interface Props {
  view?: ServiceType;
  onActivityClick: (activity: Activity) => void;
  lang?: Language;
  rides: Activity[];
  helps: Activity[];
  moments: Activity[];
  onCreateActivity: (act: Activity) => void;
  isPremium?: boolean;
}

export const ServicesModule: React.FC<Props> = ({ view, onActivityClick, lang = 'FR', rides, helps, moments, onCreateActivity, isPremium = false }) => {
  const [activeType, setActiveType] = useState<ServiceType>(view || ServiceType.MOMENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const t = TRANSLATIONS[lang];

  React.useEffect(() => {
    if (view) setActiveType(view);
  }, [view]);

  const getActivities = () => {
    if(activeType === ServiceType.RIDE) return rides;
    if(activeType === ServiceType.HELP) return helps;
    return moments;
  };

  const renderItem = (item: Activity) => (
      <StyledTouchableOpacity 
        key={item.id} 
        onPress={() => onActivityClick(item)} 
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-row gap-4 mb-3"
      >
          <StyledView className="relative">
             <Avatar src={item.organizer.avatar} size="md" />
             <StyledView className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full items-center justify-center border border-gray-100">
                <StyledText className="text-xs">{item.type === 'RIDE' ? '🚗' : item.type === 'HELP' ? '🤝' : '📅'}</StyledText>
             </StyledView>
          </StyledView>
          <StyledView className="flex-1">
              <StyledView className="flex-row justify-between items-start mb-1">
                 <StyledView className="bg-gray-100 px-2 py-0.5 rounded-full self-start">
                     <StyledText className="text-[10px] font-bold text-gray-600 uppercase">{item.category || item.subtype}</StyledText>
                 </StyledView>
                 <StyledText className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-lg">
                    {item.priceMode === 'GRATUIT' ? 'Gratuit' : `${item.priceValue} CHF`}
                 </StyledText>
              </StyledView>
              <StyledText className="font-bold text-gray-900 text-sm mb-1">{item.title}</StyledText>
              <StyledText className="text-xs text-gray-500">{item.time} • {item.subtitle || 'Lieu'}</StyledText>
          </StyledView>
      </StyledTouchableOpacity>
  );

  return (
    <StyledView className="flex-1 bg-gray-50">
      <StyledView className="bg-white shadow-sm p-4 z-10">
          <StyledText className="text-2xl font-bold text-gray-900 mb-2">
            {activeType === ServiceType.MOMENTS ? t.services.moments : activeType === ServiceType.RIDE ? t.services.rides : t.services.help}
          </StyledText>
          {activeType === ServiceType.RIDE && (
              <StyledView className="flex-row gap-2 mt-2">
                  <Input placeholder="Départ..." className="flex-1 mb-0" />
                  <Input placeholder="Arrivée..." className="flex-1 mb-0" />
              </StyledView>
          )}
      </StyledView>

      <ScrollView className="flex-1 p-4" contentContainerStyle={{paddingBottom: 100}}>
         {!isPremium && (
             <StyledView className="bg-gray-900 p-4 rounded-xl mb-4 flex-row justify-between items-center">
                 <StyledView>
                     <StyledText className="text-white font-bold text-sm">Sponsorisé</StyledText>
                     <StyledText className="text-gray-300 text-xs">Assurance Auto -20%</StyledText>
                 </StyledView>
                 <Button variant="secondary" className="py-1 px-3">Voir</Button>
             </StyledView>
         )}
         
         {activeType === ServiceType.MOMENTS && (
             <StyledTouchableOpacity onPress={() => setShowCamera(true)} className="mb-6 items-center">
                 <StyledView className="w-full h-32 bg-gray-200 rounded-xl items-center justify-center border-2 border-dashed border-gray-300">
                     <Camera size={32} color="#9ca3af" />
                     <StyledText className="text-gray-500 font-bold mt-2">Poster un Instant</StyledText>
                 </StyledView>
             </StyledTouchableOpacity>
         )}

         {getActivities().map(renderItem)}
      </ScrollView>

      <StyledView className="absolute bottom-24 right-4">
        <TouchableOpacity onPress={() => setShowCreateModal(true)} className="w-14 h-14 bg-brand-600 rounded-full items-center justify-center shadow-lg">
            <Plus size={32} color="white" />
        </TouchableOpacity>
      </StyledView>
      
      {showCamera && <CameraInterface onCapture={() => setShowCamera(false)} onClose={() => setShowCamera(false)} />}
      
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Créer">
          <StyledView className="pb-10">
              <Input label="Titre" placeholder="Titre de l'annonce" />
              <TextArea label="Description" placeholder="Détails..." />
              <Button fullWidth onClick={() => setShowCreateModal(false)} className="mt-4">Publier</Button>
          </StyledView>
      </Modal>
    </StyledView>
  );
};
