import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Compass } from 'lucide-react-native';
import { Avatar } from '../components/Shared';
import { MOCK_ACTIVITIES, MOCK_FRIENDS, TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Props {
  onPinClick: (id: string, type: 'USER' | 'ACTIVITY') => void;
  onIntentionClick: () => void;
  lang: Language;
  onMyPositionClick?: () => void;
  activeIntention?: any;
}

export const PsittMap: React.FC<Props> = ({ onPinClick, onIntentionClick, lang }) => {
  const t = TRANSLATIONS[lang];
  const { width, height } = Dimensions.get('window');

  // We simulate the big map using a ScrollView with a large inner view
  return (
    <StyledView className="flex-1 bg-gray-200 relative">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <StyledView className="w-[800px] h-[1000px] relative">
                    <StyledImage 
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_Geneva_Streets.png" }} 
                        className="w-full h-full opacity-80"
                        resizeMode="cover"
                    />
                    
                    {/* Mock Friend Pin */}
                    <StyledTouchableOpacity 
                        className="absolute top-[300px] left-[150px] items-center"
                        onPress={() => onPinClick('f1', 'USER')}
                    >
                         <StyledView className="bg-white p-1 rounded-full shadow-md">
                            <Avatar src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Alice" size="md" />
                         </StyledView>
                         <StyledView className="bg-white/90 px-2 py-0.5 rounded-md mt-1 shadow-sm">
                            <StyledText className="text-xs font-bold text-gray-800">Alice</StyledText>
                         </StyledView>
                    </StyledTouchableOpacity>

                    {/* Mock Activity Pin */}
                    <StyledTouchableOpacity 
                        className="absolute top-[400px] left-[250px] items-center"
                        onPress={() => onPinClick('a1', 'ACTIVITY')}
                    >
                         <StyledView className="w-10 h-10 bg-brand-600 rounded-full items-center justify-center border-2 border-white shadow-md">
                            <StyledText className="text-lg">🧘</StyledText>
                         </StyledView>
                         <StyledView className="bg-white px-2 py-0.5 rounded-md mt-1 shadow-sm">
                            <StyledText className="text-xs font-bold text-gray-800">Yoga</StyledText>
                         </StyledView>
                    </StyledTouchableOpacity>
                    
                    {/* My Position */}
                    <StyledView className="absolute top-[500px] left-[350px] items-center justify-center">
                        <StyledView className="w-16 h-16 bg-blue-500/20 rounded-full absolute animate-pulse" />
                        <StyledView className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm z-10" />
                        <StyledView className="bg-blue-600 px-2 py-0.5 rounded-full mt-6 shadow-sm">
                            <StyledText className="text-[10px] font-bold text-white">Moi</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </ScrollView>
        </ScrollView>

        {/* Floating UI */}
        <StyledView className="absolute top-4 left-4 z-10">
            <StyledTouchableOpacity 
                onPress={onIntentionClick}
                className="bg-white border border-brand-200 px-4 py-2 rounded-full shadow-md flex-row items-center gap-2"
            >
                <Compass size={18} color="#dc2626" />
                <StyledText className="font-bold text-sm text-brand-600">{t.map.intention}</StyledText>
            </StyledTouchableOpacity>
        </StyledView>

        {/* Bottom Sheet Overlay */}
        <StyledView className="absolute bottom-0 left-0 w-full bg-white/95 rounded-t-3xl pt-3 pb-6 shadow-lg">
             <StyledView className="w-12 h-1 bg-gray-300 rounded-full self-center mb-3" />
             <StyledText className="text-sm font-bold text-gray-900 mb-3 px-4">{t.map.around}</StyledText>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
                {MOCK_FRIENDS.map(f => (
                    <StyledTouchableOpacity key={f.id} onPress={() => onPinClick(f.id, 'USER')} className="mr-4 items-center w-16">
                        <Avatar src={f.avatar} size="md" />
                        <StyledText className="text-xs font-medium text-gray-700 mt-1 text-center" numberOfLines={1}>{f.name}</StyledText>
                    </StyledTouchableOpacity>
                ))}
             </ScrollView>
        </StyledView>
    </StyledView>
  );
};
