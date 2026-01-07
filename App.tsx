
import React, { useState } from 'react';
import { AppProvider, useApp } from './store';
import { ActivityType, MarkerItem } from './types';
import LiveMap from './components/LiveMap';
import BottomNav from './components/BottomNav';
import ActionFab from './components/ActionFab';
import DetailSheet from './components/DetailSheet';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import Toaster from './components/Toaster';
import CreateModal from './components/CreateModal';
import AuthFlow from './components/AuthFlow';
import { Shield } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState<MarkerItem | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<ActivityType>(ActivityType.MOMENT);

  if (!isAuthenticated) {
    return <AuthFlow />;
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleOpenCreate = (type?: ActivityType) => {
    if (type) setCreateType(type);
    setCreateModalOpen(true);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <LiveMap onMarkerClick={setSelectedItem} />;
      case 'moments':
        return <FeedPage type={ActivityType.MOMENT} title="Moments" subtitle="Activités spontanées autour de toi" color="text-swiss-red" />;
      case 'entraide':
        return <FeedPage type={ActivityType.HELP} title="Entraide" subtitle="Coups de main et solidarité" color="text-alpine-green" />;
      case 'trajets':
        return <FeedPage type={ActivityType.CARPOOL} title="Trajets" subtitle="Covoiturage instantané" color="text-canton-blue" />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LiveMap onMarkerClick={setSelectedItem} />;
    }
  };

  return (
    <div className="bg-white min-h-screen relative max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
      {/* System Status Bar Mock */}
      <div className="h-safe-top bg-white/90 backdrop-blur-sm fixed top-0 w-full z-50 max-w-md pointer-events-none" />

      {/* Notifications */}
      <Toaster />

      {/* Top Bar (Only visible on map) */}
      {currentPage === 'home' && (
        <div className="fixed top-0 left-0 right-0 z-30 p-4 pt-safe-top mt-4 flex justify-between items-center pointer-events-none max-w-md mx-auto">
           <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
             <div className="w-2 h-2 rounded-full bg-swiss-red animate-pulse" />
             <span className="font-bold text-swiss-red tracking-tight">26Connect</span>
           </div>
           
           <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg pointer-events-auto text-dark relative active:scale-95 transition-transform">
             <div className="absolute top-2 right-2 w-2 h-2 bg-alpine-green rounded-full border border-white" />
             <Shield className="w-5 h-5" />
           </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-y-auto no-scrollbar pb-[80px]">
        {renderContent()}
      </div>

      {/* Action FAB */}
      {currentPage === 'home' && <ActionFab onAction={handleOpenCreate} />}

      {/* Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Modals */}
      <DetailSheet item={selectedItem} onClose={() => setSelectedItem(null)} />
      <CreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        initialType={createType}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
