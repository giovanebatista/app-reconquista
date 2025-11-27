'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Heart, Target, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD645]/10 via-black to-black" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFD645]/10 border border-[#FFD645]/30 rounded-full px-6 py-2 mb-8">
            <Heart className="w-5 h-5 text-[#FFD645]" />
            <span className="text-[#FFD645] font-semibold">Código Masculino Academy</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Reconquiste com
            <span className="block text-[#FFD645]">Inteligência Emocional</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            40 módulos práticos para reconstruir sua relação com autoridade, 
            maturidade e estratégia comprovada.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/onboarding')}
            className="group inline-flex items-center gap-3 bg-[#FFD645] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFD645]/90 transition-all duration-300 hover:scale-105"
          >
            Começar Jornada
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FFD645] mb-2">40</div>
              <div className="text-sm md:text-base text-white/60">Módulos Práticos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FFD645] mb-2">12</div>
              <div className="text-sm md:text-base text-white/60">Ferramentas Emocionais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FFD645] mb-2">100+</div>
              <div className="text-sm md:text-base text-white/60">Mensagens Prontas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-black to-[#FFD645]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O que você vai dominar
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#FFD645]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFD645]/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#FFD645]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Comunicação Estratégica</h3>
              <p className="text-white/70">
                Aprenda a se comunicar de forma que aproxima, valida e reconstrói confiança sem soar desesperado.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#FFD645]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFD645]/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-[#FFD645]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inteligência Emocional</h3>
              <p className="text-white/70">
                Domine suas emoções, transforme ansiedade em ação e desenvolva presença magnética.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#FFD645]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#FFD645]/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#FFD645]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Evolução Progressiva</h3>
              <p className="text-white/70">
                Sistema de drip diário com exercícios práticos que garantem evolução consistente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para reconstruir?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Comece agora sua jornada de reconquista com método comprovado.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="group inline-flex items-center gap-3 bg-[#FFD645] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFD645]/90 transition-all duration-300 hover:scale-105"
          >
            Iniciar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
