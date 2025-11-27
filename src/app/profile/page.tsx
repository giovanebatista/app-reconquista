'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, User, Calendar, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { appState } = useApp();

  const user = appState.user;
  const completedLessons = user?.completedLessons || [];
  const totalLessons = 40;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDaysActive = () => {
    if (!user?.createdAt) return 0;
    const created = new Date(user.createdAt);
    const now = new Date();
    const diff = now.getTime() - created.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getSubscriptionLabel = (plan: string | undefined) => {
    const labels: Record<string, string> = {
      monthly: 'Mensal',
      quarterly: 'Trimestral',
      yearly: 'Anual',
    };
    return labels[plan || ''] || 'N/A';
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
            <h1 className="text-2xl md:text-3xl font-bold">Perfil</h1>
            <p className="text-white/60 text-sm">Seu progresso e conquistas</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-[#FFD645] rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Membro Ativo</h2>
              <p className="text-white/60">
                Desde {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-[#FFD645] mb-1">
                {completedLessons.length}
              </div>
              <div className="text-xs text-white/60">Aulas Concluídas</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-[#FFD645] mb-1">
                {progress}%
              </div>
              <div className="text-xs text-white/60">Progresso</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-[#FFD645] mb-1">
                {getDaysActive()}
              </div>
              <div className="text-xs text-white/60">Dias Ativos</div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-[#FFD645] mb-1">
                {user?.favorites.length || 0}
              </div>
              <div className="text-xs text-white/60">Favoritos</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#FFD645]" />
            <h3 className="text-xl font-bold">Progresso da Jornada</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Módulo Atual</span>
              <span className="text-[#FFD645] font-bold">
                {user?.currentLesson || 1} de {totalLessons}
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD645] to-yellow-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="text-sm text-white/60">
            Continue sua jornada para desbloquear todos os 40 módulos de reconquista.
          </p>
        </div>

        {/* Subscription Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-[#FFD645]" />
            <h3 className="text-xl font-bold">Assinatura</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Plano</span>
              <span className="font-bold">
                {getSubscriptionLabel(user?.subscriptionPlan)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-white/60">Ativo desde</span>
              <span className="font-bold">
                {formatDate(user?.subscriptionDate)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-white/60">Status</span>
              <span className="flex items-center gap-2 text-green-500 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Onboarding Answers */}
        {user?.onboardingAnswers && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-[#FFD645]" />
              <h3 className="text-xl font-bold">Suas Respostas Iniciais</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/60 mb-1">Há quanto tempo terminaram?</p>
                <p className="text-white/90">{user.onboardingAnswers.timeBreakup}</p>
              </div>
              
              <div>
                <p className="text-xs text-white/60 mb-1">Quem tomou a decisão?</p>
                <p className="text-white/90">{user.onboardingAnswers.whoDecided}</p>
              </div>
              
              <div>
                <p className="text-xs text-white/60 mb-1">Nível de contato atual</p>
                <p className="text-white/90">{user.onboardingAnswers.contactLevel}</p>
              </div>
              
              <div>
                <p className="text-xs text-white/60 mb-1">Maior dificuldade</p>
                <p className="text-white/90">{user.onboardingAnswers.mainDifficulty}</p>
              </div>
              
              <div>
                <p className="text-xs text-white/60 mb-1">O que deseja reconstruir</p>
                <p className="text-white/90">{user.onboardingAnswers.mainDesire}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
