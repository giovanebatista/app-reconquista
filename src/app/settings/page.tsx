'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Volume2, VolumeX, MessageSquare, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair? Seus dados serão mantidos.')) {
      localStorage.removeItem('codigomasculino_user');
      localStorage.removeItem('codigomasculino_auth');
      router.push('/');
    }
  };

  const handleSupport = () => {
    const whatsappNumber = '5511999999999'; // Substitua pelo número real
    const message = encodeURIComponent('Olá! Preciso de ajuda com o app Código Masculino.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
            <p className="text-white/60 text-sm">Personalize sua experiência</p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <h3 className="text-lg font-bold mb-4">Notificações</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#FFD645]" />
                <div>
                  <p className="font-medium">Notificações Push</p>
                  <p className="text-sm text-white/60">Receba lembretes diários às 08h</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-[#FFD645]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Audio Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <h3 className="text-lg font-bold mb-4">Áudio</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {sound ? (
                  <Volume2 className="w-5 h-5 text-[#FFD645]" />
                ) : (
                  <VolumeX className="w-5 h-5 text-[#FFD645]" />
                )}
                <div>
                  <p className="font-medium">Sons do App</p>
                  <p className="text-sm text-white/60">Efeitos sonoros e TTS</p>
                </div>
              </div>
              <button
                onClick={() => setSound(!sound)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  sound ? 'bg-[#FFD645]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    sound ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <h3 className="text-lg font-bold mb-4">Suporte</h3>
          
          <button
            onClick={handleSupport}
            className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#FFD645]" />
              <div className="text-left">
                <p className="font-medium">Falar com Suporte</p>
                <p className="text-sm text-white/60">Tire suas dúvidas via WhatsApp</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 text-white/40" />
          </button>
        </div>

        {/* Account Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <h3 className="text-lg font-bold mb-4">Conta</h3>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <div className="text-left">
                <p className="font-medium text-red-500">Sair da Conta</p>
                <p className="text-sm text-white/60">Seus dados serão mantidos</p>
              </div>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="text-center text-white/40 text-sm">
          <p>Código Masculino Academy</p>
          <p className="mt-1">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
