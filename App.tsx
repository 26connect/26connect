import React, { useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { styled } from 'nativewind';
import { CURRENT_USER, TRANSLATIONS, MOCK_NOTIFICATIONS, MOCK_RIDES, MOCK_HELP, MOCK_ACTIVITIES, MOCK_FRIENDS } from './constants';
import { AppTab, User, ServiceType, Activity, Language, Notification } from './types';
import { PsittMap } from './modules/PsittMap';
import { ServicesModule } from './modules/Services';
import { ProfileModule } from './modules/Profile';
import { Button, Modal, SOSButton, Input, Avatar } from './components/Shared';
import { 
  User as UserIcon, MapPin, Flame, HandHeart, Car, ChevronLeft, Bell, MessageCircle, Send
} from 'lucide-react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

// --- SUB-COMPONENTS ADAPTED FOR NATIVE ---

const GlobalChatContent: React.FC<{ activeChatUser: User | null, setActiveChatUser: (u: User | null) => void }> = ({ activeChatUser, setActiveChatUser }) => {
    const [msg, setMsg] = useState('');
    const [history, setHistory] = useState<{id:number, text:string, me:boolean}[]>([]);
    
    // Simuler le début d'un chat
    React.useEffect(() => {
        if(activeChatUser && history.length === 0) {
             setHistory([
                 {id: 1, text: `Salut ${activeChatUser.name} ! Ça va ?`, me: true}, 
                 {id: 2, text: `Coucou ! Oui et toi ?`, me: false}
             ]); 
        }
    }, [activeChatUser]);

    const sendMessage = () => { if(!msg.trim()) return; setHistory([...history, {id: Date.now(), text: msg, me: true}]); setMsg(''); };
    
    if (activeChatUser) {
        return (
            <StyledView className="flex-1">
                <StyledView className="flex-row items-center gap-3 border-b border-gray-100 pb-3 mb-2">
                    <TouchableOpacity onPress={() => setActiveChatUser(null)} className="p-2">
                        <ChevronLeft size={24} color="#000"/>
                    </TouchableOpacity>
                    <Avatar src={activeChatUser.avatar} size="sm" />
                    <StyledText className="font-bold text-gray-900 text-lg">{activeChatUser.name}</StyledText>
                </StyledView>
                <View style={{flex:1, backgroundColor:'#f9fafb', borderRadius:12, padding:16, marginBottom:8}}>
                    {history.map(m => (
                        <StyledView key={m.id} className={`flex-row items-end gap-2 mb-2 ${m.me ? 'justify-end' : 'justify-start'}`}>
                            {!m.me && <Avatar src={activeChatUser.avatar} size="xs" />}
                            <StyledView className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${m.me ? 'bg-brand-600 rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'}`}>
                                <StyledText className={m.me ? 'text-white' : 'text-gray-800'}>{m.text}</StyledText>
                            </StyledView>
                        </StyledView>
                    ))}
                </View>
                <StyledView className="flex-row gap-2 pt-2 items-center">
                    <Input value={msg} onChangeText={setMsg} placeholder="Message..." className="flex-1" />
                    <Button onClick={sendMessage} className="h-12 w-12 rounded-full items-center justify-center p-0"><Send size={20} color="white"/></Button>
                </StyledView>
            </StyledView>
        );
    }
    return (
        <StyledView className="flex-1">
            <StyledText className="font-bold text-gray-900 mb-4 text-lg">Vos conversations</StyledText>
            {MOCK_FRIENDS.map(f => (
                <StyledTouchableOpacity key={f.id} onPress={() => setActiveChatUser(f)} className="flex-row items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl mb-2">
                    <Avatar src={f.avatar} size="md" />
                    <StyledView className="flex-1">
                        <StyledText className="font-bold text-base text-gray-900">{f.name}</StyledText>
                        <StyledText className="text-xs text-gray-500" numberOfLines={1}>Dernier message reçu...</StyledText>
                    </StyledView>
                    <StyledText className="text-xs text-gray-400">12:30</StyledText>
                </StyledTouchableOpacity>
            ))}
        </StyledView>
    );
};

const App: React.FC = () => {
  const [authStep, setAuthStep] = useState<'EMAIL' | 'CGU' | 'PHONE' | 'OTP' | 'PROFILE' | 'PERM_LOC' | 'PERM_NOTIF' | 'APP'>('EMAIL');
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.MAINTENANT);
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [lang, setLang] = useState<Language>('FR');
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeChatUser, setActiveChatUser] = useState<User | null>(null);
  const [globalDetailActivity, setGlobalDetailActivity] = useState<Activity | null>(null);

  const t = TRANSLATIONS[lang];

  // Simple Auth Flow
  if (authStep === 'EMAIL') {
      return (
          <StyledSafeAreaView className="flex-1 bg-white items-center justify-center p-6">
              <StyledView className="w-20 h-20 bg-brand-600 rounded-2xl items-center justify-center mb-6 shadow-md"><StyledText className="text-white font-black text-4xl">26</StyledText></StyledView>
              <StyledText className="text-2xl font-bold text-gray-900 mb-8">{t.auth.welcome}</StyledText>
              <Input placeholder="Email" />
              <Input placeholder="Password" secureTextEntry />
              <Button fullWidth onClick={() => setAuthStep('APP')} className="mt-6">Se connecter</Button>
          </StyledSafeAreaView>
      );
  }

  // Header Component
  const Header26 = () => (
      <StyledView className="bg-brand-600 px-4 pb-3 pt-2 flex-row items-center justify-between shadow-md z-50">
          <StyledView className="flex-row items-center gap-2">
            <StyledView className="w-8 h-8 bg-white rounded-lg items-center justify-center"><StyledText className="text-brand-600 font-black text-lg">26</StyledText></StyledView>
            <StyledText className="text-white font-bold text-lg">Connect.ch</StyledText>
          </StyledView>
          <StyledView className="flex-row items-center gap-3">
              <TouchableOpacity onPress={() => setShowGlobalChat(true)}><MessageCircle size={24} color="white" /></TouchableOpacity>
              <TouchableOpacity onPress={() => setShowNotifications(true)} className="relative">
                  <Bell size={24} color="white" />
                  {notifications.length > 0 && <StyledView className="absolute top-0 right-0 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-brand-600" />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentTab(AppTab.MOI)}>
                  <Avatar src={user.avatar} size="xs" />
              </TouchableOpacity>
          </StyledView>
      </StyledView>
  );

  return (
    <StyledSafeAreaView className="flex-1 bg-brand-600" style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
      <ExpoStatusBar style="light" backgroundColor="#dc2626" />
      <StyledView className="flex-1 bg-gray-100">
          <Header26 />
          
          <StyledView className="flex-1 relative">
            {currentTab === AppTab.MOI && <ProfileModule user={user} onActivityClick={setGlobalDetailActivity} onViewFriend={() => {}} onLanguageChange={setLang} currentLang={lang} onUpdateUser={setUser} />}
            {currentTab === AppTab.MAINTENANT && (
                <View style={{flex:1}}>
                    <PsittMap lang={lang} onPinClick={() => {}} onIntentionClick={() => {}} activeIntention={null} />
                    <View style={{position:'absolute', top:16, right:16}}>
                        <SOSButton onClick={() => alert('SOS')} />
                    </View>
                </View>
            )}
            {(currentTab === AppTab.MOMENTS || currentTab === AppTab.ENTRAIDE || currentTab === AppTab.TRAJETS) && 
                <ServicesModule view={currentTab === AppTab.MOMENTS ? ServiceType.MOMENTS : currentTab === AppTab.ENTRAIDE ? ServiceType.HELP : ServiceType.RIDE} onActivityClick={setGlobalDetailActivity} lang={lang} rides={MOCK_RIDES} helps={MOCK_HELP} moments={MOCK_ACTIVITIES} onCreateActivity={() => {}} isPremium={user.isPremium} />
            }
          </StyledView>

          {/* Bottom Nav */}
          <StyledView className="bg-white border-t border-gray-100 pb-2 pt-2 flex-row justify-around shadow-sm">
             <NavButton active={currentTab === AppTab.MOI} icon={<UserIcon size={24} color={currentTab === AppTab.MOI ? '#dc2626' : '#9ca3af'} />} label={t.nav.moi} onClick={() => setCurrentTab(AppTab.MOI)} />
             <NavButton active={currentTab === AppTab.MAINTENANT} icon={<MapPin size={24} color={currentTab === AppTab.MAINTENANT ? '#dc2626' : '#9ca3af'} />} label={t.nav.now} onClick={() => setCurrentTab(AppTab.MAINTENANT)} />
             <NavButton active={currentTab === AppTab.MOMENTS} icon={<Flame size={24} color={currentTab === AppTab.MOMENTS ? '#dc2626' : '#9ca3af'} />} label={t.nav.moments} onClick={() => setCurrentTab(AppTab.MOMENTS)} />
             <NavButton active={currentTab === AppTab.ENTRAIDE} icon={<HandHeart size={24} color={currentTab === AppTab.ENTRAIDE ? '#dc2626' : '#9ca3af'} />} label={t.nav.help} onClick={() => setCurrentTab(AppTab.ENTRAIDE)} />
             <NavButton active={currentTab === AppTab.TRAJETS} icon={<Car size={24} color={currentTab === AppTab.TRAJETS ? '#dc2626' : '#9ca3af'} />} label={t.nav.rides} onClick={() => setCurrentTab(AppTab.TRAJETS)} />
          </StyledView>
      </StyledView>

      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
          <StyledView>
             {notifications.map(n => (
                 <StyledView key={n.id} className="p-4 border-b border-gray-100 flex-row gap-3">
                     <Bell size={20} color="#6b7280"/>
                     <StyledView className="flex-1">
                         <StyledText className="font-bold">{n.title}</StyledText>
                         <StyledText className="text-gray-500 text-sm">{n.message}</StyledText>
                     </StyledView>
                 </StyledView>
             ))}
          </StyledView>
      </Modal>

      <Modal isOpen={showGlobalChat} onClose={() => setShowGlobalChat(false)} title="Messagerie">
         <GlobalChatContent activeChatUser={activeChatUser} setActiveChatUser={setActiveChatUser} />
      </Modal>

    </StyledSafeAreaView>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <TouchableOpacity onPress={onClick} className="items-center justify-center flex-1">
    <StyledView className={`mb-1 p-1 rounded-xl ${active ? 'bg-brand-50' : ''}`}>{icon}</StyledView>
    <StyledText className={`text-[10px] font-medium ${active ? 'text-brand-600 font-bold' : 'text-gray-400'}`}>{label}</StyledText>
  </TouchableOpacity>
);

export default App;