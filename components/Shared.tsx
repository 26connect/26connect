import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal as RNModal, ActivityIndicator, ScrollView, Switch } from 'react-native';
import { X, ChevronDown, SwitchCamera, Circle, CheckCircle, Smartphone, CreditCard, Globe, Banknote, Loader2, Lock, Check } from 'lucide-react-native';
import { PaymentProvider } from '../types';
import { PAYMENT_CONFIG } from '../constants';
import { styled } from 'nativewind';

// NativeWind styled components for clean usage
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'black' | 'success';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', fullWidth = false, disabled = false, isLoading = false }) => {
  const baseClasses = "py-3 px-6 rounded-full flex-row items-center justify-center gap-2";
  const variants = {
    primary: "bg-brand-600 shadow-sm",
    secondary: "bg-white border border-gray-200",
    danger: "bg-red-500 shadow-sm",
    ghost: "bg-transparent",
    black: "bg-gray-900 shadow-sm",
    success: "bg-green-600 shadow-sm"
  };

  const textVariants = {
    primary: "text-white font-bold",
    secondary: "text-gray-900 font-bold",
    danger: "text-white font-bold",
    ghost: "text-gray-600 font-bold",
    black: "text-white font-bold",
    success: "text-white font-bold"
  };

  return (
    <StyledTouchableOpacity 
      onPress={onClick} 
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : 'self-start'} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {isLoading && <ActivityIndicator color={variant === 'secondary' || variant === 'ghost' ? '#000' : '#fff'} size="small" />}
      <StyledText className={`${textVariants[variant]}`}>{children}</StyledText>
    </StyledTouchableOpacity>
  );
};

export const Input: React.FC<React.ComponentProps<typeof TextInput> & { label?: string, error?: string }> = ({ label, className, error, ...props }) => (
  <StyledView className="w-full mb-4">
    {label && <StyledText className="text-xs font-bold text-gray-700 mb-1 ml-1">{label}</StyledText>}
    <StyledTextInput 
      {...props}
      placeholderTextColor="#9ca3af"
      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 ${error ? 'border-red-500' : 'border-gray-200'} ${className || ''}`}
    />
    {error && <StyledText className="text-red-500 text-xs mt-1 ml-1">{error}</StyledText>}
  </StyledView>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <Switch 
    value={checked} 
    onValueChange={onChange} 
    trackColor={{ false: "#e5e7eb", true: "#dc2626" }}
    thumbColor="#ffffff"
  />
);

export const Tabs: React.FC<{ options: string[]; active: string; onChange: (val: string) => void }> = ({ options, active, onChange }) => (
  <StyledView className="flex-row bg-gray-100 p-1 rounded-xl w-full">
    {options.map(opt => (
      <StyledTouchableOpacity 
        key={opt}
        onPress={() => onChange(opt)} 
        className={`flex-1 py-2 rounded-lg items-center justify-center ${active === opt ? 'bg-white shadow-sm' : ''}`}
      >
        <StyledText className={`text-sm font-bold ${active === opt ? 'text-gray-900' : 'text-gray-500'}`}>{opt}</StyledText>
      </StyledTouchableOpacity>
    ))}
  </StyledView>
);

export const TextArea: React.FC<React.ComponentProps<typeof TextInput> & { label?: string }> = ({ label, className, ...props }) => (
  <StyledView className="w-full mb-4">
    {label && <StyledText className="text-xs font-bold text-gray-700 mb-1 ml-1">{label}</StyledText>}
    <StyledTextInput 
      {...props}
      multiline
      numberOfLines={4}
      placeholderTextColor="#9ca3af"
      textAlignVertical="top"
      className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[100px] text-gray-900 ${className || ''}`}
    />
  </StyledView>
);

export const Select: React.FC<{ label?: string, options: {label: string, value: string}[], value?: string, onChange?: (val: string) => void, placeholder?: string }> = ({ label, options, value, onChange, placeholder = "Sélectionner" }) => (
  <StyledView className="w-full mb-4">
     {label && <StyledText className="text-xs font-bold text-gray-700 mb-1 ml-1">{label}</StyledText>}
     <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 py-1">
         {options.map(opt => (
             <StyledTouchableOpacity 
                key={opt.value} 
                onPress={() => onChange && onChange(opt.value)}
                className={`px-4 py-2 rounded-full border ${value === opt.value ? 'bg-brand-600 border-brand-600' : 'bg-white border-gray-200'}`}
             >
                 <StyledText className={`text-xs font-bold ${value === opt.value ? 'text-white' : 'text-gray-700'}`}>{opt.label}</StyledText>
             </StyledTouchableOpacity>
         ))}
     </ScrollView>
  </StyledView>
);

export const Checkbox: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
}> = ({ checked, onChange, label }) => (
  <StyledTouchableOpacity className="flex-row items-start gap-3 py-2" onPress={() => onChange(!checked)}>
    <StyledView className={`w-6 h-6 rounded-md border-2 items-center justify-center ${checked ? 'bg-brand-600 border-brand-600' : 'border-gray-300 bg-white'}`}>
      {checked && <StyledText className="text-white font-bold text-sm">✓</StyledText>}
    </StyledView>
    <StyledView className="flex-1">
        {typeof label === 'string' ? <StyledText className="text-sm text-gray-600">{label}</StyledText> : label}
    </StyledView>
  </StyledTouchableOpacity>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <StyledTouchableOpacity activeOpacity={onClick ? 0.7 : 1} onPress={onClick} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 ${className}`}>
    {children}
  </StyledTouchableOpacity>
);

export const Avatar: React.FC<{ src: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; alt?: string; onClick?: () => void; selected?: boolean }> = ({ src, size = 'md', alt = 'User', onClick, selected }) => {
  const sizes = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  // Use simple View as placeholder if Image fails, normally use expo-image in prod
  return (
    <StyledTouchableOpacity onPress={onClick} disabled={!onClick} className={`relative rounded-full ${selected ? 'border-4 border-brand-500' : ''}`}>
        <StyledImage 
            source={{ uri: src }} 
            className={`${sizes[size]} rounded-full bg-gray-100 border-2 border-white`}
        />
        {selected && <StyledView className="absolute bottom-0 right-0 w-6 h-6 bg-brand-600 rounded-full items-center justify-center border-2 border-white"><StyledText className="text-white font-bold text-xs">✓</StyledText></StyledView>}
    </StyledTouchableOpacity>
  );
};

export const BadgeIcon: React.FC<{ icon: string; size?: string }> = ({ icon, size = 'w-10 h-10' }) => (
  <StyledView className={`${size} rounded-full bg-brand-50 items-center justify-center`}>
    <StyledText className="text-xl">{icon}</StyledText>
  </StyledView>
);

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <RNModal visible={isOpen} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={onClose}>
      <StyledView className="flex-1 justify-end bg-black/60">
        <StyledView className="bg-white w-full rounded-t-3xl max-h-[90%] flex-col">
            <StyledView className="px-6 pt-5 pb-3 border-b border-gray-50 flex-row justify-between items-center">
               <StyledView className="w-12 h-1.5 bg-gray-200 rounded-full absolute top-2 left-[50%] -ml-6" />
               {title ? <StyledText className="text-xl font-bold text-gray-900 mt-2">{title}</StyledText> : <View />}
               <TouchableOpacity onPress={onClose} className="p-2 bg-gray-50 rounded-full mt-2">
                 <X size={20} color="#000" />
               </TouchableOpacity>
            </StyledView>
            <ScrollView className="px-6 py-4 flex-1">
              <StyledView onStartShouldSetResponder={() => true}>
                {children}
              </StyledView>
            </ScrollView>
            {footer && <StyledView className="p-6 pt-4 border-t border-gray-100 bg-white pb-10">{footer}</StyledView>}
        </StyledView>
      </StyledView>
    </RNModal>
  );
};

export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <RNModal visible={isOpen} transparent animationType="fade">
      <StyledView className="flex-1 items-center justify-center bg-black/50 p-4">
          <StyledView className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl">
              <StyledText className="text-lg font-bold text-gray-900 mb-2">{title}</StyledText>
              <StyledText className="text-gray-600 text-sm mb-6">{message}</StyledText>
              <StyledView className="flex-row gap-3">
                  <Button variant="secondary" onClick={onCancel} className="flex-1 justify-center">Annuler</Button>
                  <Button variant="danger" onClick={onConfirm} className="flex-1 justify-center">Confirmer</Button>
              </StyledView>
          </StyledView>
      </StyledView>
    </RNModal>
  );
};

export const SOSButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <StyledTouchableOpacity 
    onPress={onClick}
    className="bg-red-600 py-2 px-6 rounded-full shadow-lg flex-row items-center gap-2 border-2 border-white/20"
  >
    <StyledText className="text-xl">🚨</StyledText>
    <StyledText className="text-white font-bold">SOS</StyledText>
  </StyledTouchableOpacity>
);

export const CameraInterface: React.FC<{ onCapture: () => void; onClose: () => void }> = ({ onCapture, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    return () => { setLoading(false); setFlash(false); }
  }, []);

  const handleCaptureClick = () => {
      if (loading) return;
      setLoading(true);
      setFlash(true);
      setTimeout(() => {
          setFlash(false);
          onCapture();
      }, 500);
  };

  return (
    <RNModal visible={true} transparent animationType="fade">
      <StyledView className="flex-1 bg-black">
        {flash && <StyledView className="absolute inset-0 bg-white z-50 pointer-events-none" />}
        
        {/* Top Bar */}
        <StyledView className="flex-row justify-between items-center p-4 pt-12 absolute top-0 w-full z-10">
          <TouchableOpacity onPress={onClose} className="p-2 rounded-full bg-black/20"><X size={28} color="white" /></TouchableOpacity>
          <StyledText className="font-bold text-white shadow-md">Instant</StyledText>
          <View className="w-10" />
        </StyledView>
        
        {/* Main Viewfinder Simulation */}
        <StyledView className="flex-1 bg-gray-900 relative">
           <StyledImage 
              source={{ uri: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop" }} 
              className="w-full h-full opacity-60"
              resizeMode="cover"
           />
           <StyledView className="absolute inset-0 items-center justify-center opacity-50">
               <StyledText className="text-white font-bold text-xs">● REC</StyledText>
           </StyledView>
           
           {/* PIP Selfie */}
           <StyledView className="absolute top-24 left-4 w-24 h-32 bg-black/50 rounded-xl border-2 border-white/30 items-center justify-center overflow-hidden">
               <StyledText className="text-white text-xs">Selfie</StyledText>
           </StyledView>
        </StyledView>
        
        {/* Controls */}
        <StyledView className="h-40 flex-row items-center justify-center gap-12 bg-black pb-8">
           <TouchableOpacity className="p-4 rounded-full bg-white/10"><SwitchCamera size={24} color="white" /></TouchableOpacity>
           
           <TouchableOpacity 
              onPress={handleCaptureClick} 
              disabled={loading} 
              className="w-20 h-20 rounded-full border-4 border-white items-center justify-center"
           >
               {loading ? 
                  <ActivityIndicator color="white" size="large"/> : 
                  <StyledView className="w-16 h-16 bg-white rounded-full" />
               }
           </TouchableOpacity>
           
           <TouchableOpacity className="p-4 rounded-full bg-white/10"><StyledText className="font-bold text-xs text-white">⚡️</StyledText></TouchableOpacity>
        </StyledView>
      </StyledView>
    </RNModal>
  );
};

export const PaymentGateway: React.FC<{ amount: number; onSuccess: () => void; onClose: () => void }> = ({ amount, onSuccess, onClose }) => {
    const [status, setStatus] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
    const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);

    const handlePay = (provider: PaymentProvider) => {
        setSelectedProvider(provider);
        setStatus('PROCESSING');
        setTimeout(() => {
            setStatus('SUCCESS');
            setTimeout(onSuccess, 1500);
        }, 2000);
    };

    if (status === 'PROCESSING') {
        return (
            <StyledView className="items-center justify-center py-10">
                <ActivityIndicator size="large" color="#dc2626" />
                <StyledText className="text-lg font-bold text-gray-900 mt-4">Connexion à {selectedProvider ? PAYMENT_CONFIG[selectedProvider].label : '...'}</StyledText>
                <StyledText className="text-sm text-gray-500">Veuillez ne pas quitter.</StyledText>
            </StyledView>
        );
    }

    if (status === 'SUCCESS') {
        return (
            <StyledView className="items-center justify-center py-10">
                <StyledView className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
                    <CheckCircle size={40} color="#16a34a" />
                </StyledView>
                <StyledText className="text-2xl font-black text-gray-900 mb-2">Paiement Réussi !</StyledText>
                <StyledText className="text-gray-500 text-center">Votre transaction de {amount}.00 CHF a été validée.</StyledText>
            </StyledView>
        );
    }

    return (
        <StyledView className="pb-4">
            <StyledText className="text-lg font-bold text-gray-900 mb-1">Total à payer</StyledText>
            <StyledText className="text-3xl font-black text-brand-600 mb-6">{amount}.00 <StyledText className="text-lg text-gray-500 font-medium">CHF</StyledText></StyledText>
            
            <StyledText className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Moyens de paiement sécurisés</StyledText>
            <StyledView className="gap-3">
                {(Object.keys(PAYMENT_CONFIG) as PaymentProvider[]).map((key) => (
                    <StyledTouchableOpacity 
                        key={key}
                        onPress={() => handlePay(key)}
                        className={`flex-row items-center justify-between p-4 rounded-xl border border-gray-200 ${PAYMENT_CONFIG[key].color.replace('bg-', 'bg-opacity-20 bg-')}`} // Native tweak for color
                        style={{ backgroundColor: key === 'TWINT' ? '#22c55e' : key === 'APPLE_PAY' ? '#000' : key === 'PAYPAL' ? '#003087' : key === 'STRIPE' ? '#2563eb' : '#fff' }}
                    >
                        <StyledView className="flex-row items-center gap-3">
                            <StyledText className="text-2xl">{PAYMENT_CONFIG[key].icon}</StyledText>
                            <StyledText className={`font-bold ${['APPLE_PAY','TWINT','STRIPE','PAYPAL'].includes(key) ? 'text-white' : 'text-gray-900'}`}>{PAYMENT_CONFIG[key].label}</StyledText>
                        </StyledView>
                        <StyledView className={`w-5 h-5 rounded-full border-2 ${key === 'APPLE_PAY' ? 'border-white/30' : 'border-gray-300'}`} />
                    </StyledTouchableOpacity>
                ))}
            </StyledView>
            <StyledText className="text-[10px] text-gray-400 text-center mt-6 flex-row items-center justify-center gap-1">
                <Lock size={10} color="gray"/> Transactions chiffrées SSL 256-bit
            </StyledText>
        </StyledView>
    );
};
