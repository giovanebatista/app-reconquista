'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { BookOpen, Heart, MessageCircle, Star, User, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { appState } = useApp();

  useEffect(() => {
    // Redirecionar se não tiver assinatura
    if (!appState.hasActiveSubscription) {
      router.push('/paywall');
    }
  }, [appState.hasActiveSubscription, router]);

  if (!appState.hasActiveSubscription) {
    return null;
  }

  const menuItems = [
    {
      icon: BookOpen,
      title: 'Minhas Aulas',
      description: 'Continue sua jornada',
      href: '/lessons',
      color: 'from-[#FFD645]/20 to-[#FFD645]/5',
    },
    {
      icon: MessageCircle,
      title: 'Mensagens',
      description: 'Templates personalizados',
      href: '/messages',
      color: 'from-blue-500/20 to-blue-500/5',
    },
    {
      icon: Heart,
      title: 'Ferramentas',
      description: 'Recursos emocionais',
      href: '/tools',
      color: 'from-red-500/20 to-red-500/5',
    },
    {
      icon: Star,
      title: 'Favoritos',
      description: 'Seus salvos',
      href: '/favorites',
      color: 'from-purple-500/20 to-purple-500/5',
    },
    {
      icon: User,
      title: 'Perfil',
      description: 'Seu progresso',
      href: '/profile',
      color: 'from-green-500/20 to-green-500/5',
    },
    {
      icon: Settings,
      title: 'Configurações',
      description: 'Ajustes do app',
      href: '/settings',
      color: 'from-gray-500/20 to-gray-500/5',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-white/60">
            Continue sua jornada de reconquista
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Seu Progresso</h2>
            <span className="text-[#FFD645] font-bold">
              {appState.user?.completedLessons.length || 0}/40
            </span>
          </div>
          
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#FFD645] transition-all duration-500"
              style={{ 
                width: `${((appState.user?.completedLessons.length || 0) / 40) * 100}%` 
              }}
            />
          </div>
          
          <p className="text-sm text-white/60">
            Você está no módulo {appState.user?.currentLesson || 1}
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FFD645]/50 transition-all duration-300 text-left"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-white/60">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
