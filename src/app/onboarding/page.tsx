'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import OnboardingQuestion from '@/components/custom/OnboardingQuestion';
import { useApp } from '@/contexts/AppContext';
import { OnboardingAnswers } from '@/lib/types';

const questions = [
  {
    id: 'timeBreakup',
    question: 'Há quanto tempo vocês terminaram?',
    options: [
      'Menos de 1 mês',
      'Entre 1 e 3 meses',
      'Entre 3 e 6 meses',
      'Entre 6 meses e 1 ano',
      'Mais de 1 ano',
    ],
  },
  {
    id: 'whoDecided',
    question: 'Quem tomou a decisão de terminar?',
    options: [
      'Ela decidiu terminar',
      'Eu decidi terminar',
      'Foi uma decisão mútua',
      'Não houve decisão clara, apenas distanciamento',
      'Ainda estamos juntos, mas em crise',
    ],
  },
  {
    id: 'contactLevel',
    question: 'Qual o nível atual de contato entre vocês?',
    options: [
      'Sem nenhum contato',
      'Contato esporádico e frio',
      'Conversamos às vezes, mas superficialmente',
      'Mantemos contato regular',
      'Ainda moramos juntos ou nos vemos frequentemente',
    ],
  },
  {
    id: 'mainDifficulty',
    question: 'Qual a maior dificuldade que você sente hoje?',
    options: [
      'Não consigo parar de pensar nela',
      'Não sei como me comunicar sem piorar',
      'Sinto que perdi minha identidade',
      'Tenho medo de ser rejeitado novamente',
      'Não sei por onde começar a reconstruir',
    ],
  },
  {
    id: 'mainDesire',
    question: 'O que você mais deseja reconstruir nesse momento?',
    options: [
      'A conexão emocional que tínhamos',
      'A atração e o desejo entre nós',
      'A confiança que foi quebrada',
      'Minha própria autoestima e presença',
      'Um relacionamento completamente novo e melhor',
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboardingAnswers } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const canProceed = answers[currentQuestion.id as keyof OnboardingAnswers];

  const handleSelect = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Salvar respostas e ir para paywall
      setOnboardingAnswers(answers as OnboardingAnswers);
      router.push('/paywall');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with progress */}
      <div className="w-full px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
            <span className="text-sm text-white/60">
              {currentStep + 1} de {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD645] transition-all duration-500"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <OnboardingQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={answers[currentQuestion.id as keyof OnboardingAnswers] || ''}
          onSelect={handleSelect}
        />
      </div>

      {/* Footer with next button */}
      <div className="w-full px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
              canProceed
                ? 'bg-[#FFD645] text-black hover:bg-[#FFD645]/90 hover:scale-105'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Finalizar' : 'Continuar'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
