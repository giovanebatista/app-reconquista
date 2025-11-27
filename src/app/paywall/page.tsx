'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, Lock, TrendingUp, Heart, MessageCircle, Calendar, Bell } from 'lucide-react';
import PaywallPlan from '@/components/custom/PaywallPlan';
import { useApp } from '@/contexts/AppContext';

const plans = [
  {
    id: 'codigomasculino_academy_monthly',
    title: 'Mensal',
    price: '39,90',
    period: 'mês',
    isRecommended: false,
  },
  {
    id: 'codigomasculino_academy_quarterly',
    title: 'Trimestral',
    price: '97,90',
    period: 'trimestre',
    isRecommended: true,
  },
  {
    id: 'codigomasculino_academy_yearly',
    title: 'Anual',
    price: '289,78',
    period: 'ano',
    isRecommended: false,
  },
];

const benefits = [
  {
    icon: Lock,
    text: '40 aulas desbloqueadas progressivamente',
  },
  {
    icon: Check,
    text: 'Exercícios práticos obrigatórios',
  },
  {
    icon: MessageCircle,
    text: 'Frases e mensagens personalizadas para sua situação',
  },
  {
    icon: Heart,
    text: 'Ferramentas emocionais diárias',
  },
  {
    icon: TrendingUp,
    text: 'Linha do tempo da evolução',
  },
  {
    icon: Bell,
    text: 'Lembretes automáticos às 08h',
  },
  {
    icon: Calendar,
    text: 'Atualizações mensais incluídas',
  },
];

export default function PaywallPage() {
  const router = useRouter();
  const { activateSubscription } = useApp();
  const [selectedPlan, setSelectedPlan] = useState('codigomasculino_academy_quarterly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleActivate = async () => {
    setIsProcessing(true);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const planType = selectedPlan.includes('monthly') 
      ? 'monthly' 
      : selectedPlan.includes('quarterly') 
      ? 'quarterly' 
      : 'yearly';
    
    activateSubscription(planType);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFD645]/10 border border-[#FFD645]/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#FFD645]" />
            <span className="text-[#FFD645] font-semibold">Acesso Completo</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ative Sua Jornada de Reconquista
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Liberte 40 módulos exclusivos, exercícios guiados e mensagens personalizadas.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="w-10 h-10 bg-[#FFD645]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-[#FFD645]" />
              </div>
              <span className="text-white/90 text-sm md:text-base pt-2">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-4 mb-8">
          {plans.map((plan) => (
            <PaywallPlan
              key={plan.id}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              planId={plan.id}
              isRecommended={plan.isRecommended}
              isSelected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleActivate}
          disabled={isProcessing}
          className="w-full bg-[#FFD645] text-black py-5 rounded-full font-bold text-lg hover:bg-[#FFD645]/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isProcessing ? 'Processando...' : 'Ativar Acesso Completo'}
        </button>

        {/* Trust badges */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Acesso Imediato</span>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <p className="text-center text-xs text-white/40 mt-8 max-w-2xl mx-auto">
          Ao ativar, você concorda com nossos termos de uso. Todos os valores em BRL. 
          Renovação automática. Cancele quando quiser.
        </p>
      </div>
    </div>
  );
}
