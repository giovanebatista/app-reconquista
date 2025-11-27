'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Lock, CheckCircle2, Circle, Play } from 'lucide-react';
import { useState } from 'react';
import { LESSONS_CONTENT } from '@/lib/lessons-content';
import LoginModal from '@/components/custom/LoginModal';

export default function LessonsPage() {
  const router = useRouter();
  const { appState, hasContentAccess, isGuest } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const currentLesson = appState.user?.currentLesson || 1;
  const completedLessons = appState.user?.completedLessons || [];

  const getLessonStatus = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) return 'completed';
    if (lessonId === currentLesson) return 'available';
    if (lessonId < currentLesson) return 'available';
    return 'locked';
  };

  const handleLessonClick = (lessonId: number) => {
    const status = getLessonStatus(lessonId);
    
    if (status === 'locked') return;

    // Verificar acesso
    if (!hasContentAccess(lessonId)) {
      setShowLoginModal(true);
      return;
    }

    setSelectedLesson(lessonId);
  };

  const selectedLessonContent = selectedLesson 
    ? LESSONS_CONTENT.find(l => l.id === selectedLesson)
    : null;

  if (selectedLessonContent) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedLesson(null)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <p className="text-xs text-white/60 mb-1">MÓDULO {selectedLessonContent.id}</p>
              <h1 className="text-xl md:text-2xl font-bold">{selectedLessonContent.title}</h1>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Opening */}
            <div className="bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6">
              <p className="text-white/90 leading-relaxed">{selectedLessonContent.opening}</p>
            </div>

            {/* Central Concept */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-[#FFD645] mb-2">CONCEITO CENTRAL</h3>
              <p className="text-lg font-bold">{selectedLessonContent.centralConcept}</p>
            </div>

            {/* Full Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-white/80 leading-relaxed whitespace-pre-line">
                {selectedLessonContent.fullContent}
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-blue-400 mb-2">EXEMPLO PRÁTICO</h3>
              <p className="text-white/80">{selectedLessonContent.practicalExample}</p>
            </div>

            {/* Exercise */}
            <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Exercício Obrigatório</h3>
              <p className="text-white/70 mb-4">{selectedLessonContent.exercise.instructions}</p>
              
              {/* Checklist */}
              <div className="space-y-3 mb-6">
                {selectedLessonContent.exercise.checklist.map((item, index) => (
                  <label key={index} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-white/20 bg-white/10"
                    />
                    <span className="text-white/80">{item}</span>
                  </label>
                ))}
              </div>

              {/* Text Answer */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedLessonContent.exercise.textPrompt}
                </label>
                <textarea
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-500 min-h-[120px]"
                  placeholder="Escreva sua resposta aqui..."
                />
              </div>

              <button className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors mt-6">
                Concluir e Liberar Próxima Aula
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white/60 mb-2">RESUMO</h3>
              <p className="text-white/90">{selectedLessonContent.summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl md:text-3xl font-bold">Minhas Aulas</h1>
            <p className="text-white/60 text-sm">
              {completedLessons.length}/40 módulos concluídos
            </p>
          </div>
        </div>

        {/* Guest Warning */}
        {isGuest() && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6">
            <p className="text-yellow-500 font-medium">
              ⚠️ Modo Visitante: Você tem acesso apenas à Aula 1. Faça login para desbloquear todas as 40 aulas.
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/60">Progresso Geral</span>
            <span className="text-[#FFD645] font-bold">
              {Math.round((completedLessons.length / 40) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD645] to-yellow-500 transition-all duration-500"
              style={{ width: `${(completedLessons.length / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {LESSONS_CONTENT.map((lesson) => {
            const status = getLessonStatus(lesson.id);
            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';
            const isAvailable = status === 'available';
            const hasAccess = hasContentAccess(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonClick(lesson.id)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isLocked
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : isCompleted
                    ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50'
                    : 'bg-[#FFD645]/10 border-[#FFD645]/30 hover:border-[#FFD645]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : isLocked || !hasAccess ? (
                      <Lock className="w-6 h-6 text-white/40" />
                    ) : (
                      <Play className="w-6 h-6 text-[#FFD645]" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white/60">
                        MÓDULO {lesson.id}
                      </span>
                      {isAvailable && !isCompleted && hasAccess && (
                        <span className="text-xs bg-[#FFD645] text-black px-2 py-0.5 rounded-full font-bold">
                          DISPONÍVEL
                        </span>
                      )}
                      {!hasAccess && lesson.id > 1 && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">
                          BLOQUEADO
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm md:text-base">
                      {lesson.title}
                    </h3>
                    {isLocked && (
                      <p className="text-xs text-white/40 mt-1">
                        Complete o módulo anterior para desbloquear
                      </p>
                    )}
                    {!hasAccess && lesson.id > 1 && (
                      <p className="text-xs text-red-400/60 mt-1">
                        Faça login para acessar
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6">
          <h3 className="font-bold mb-2">Como funciona?</h3>
          <ul className="text-sm text-white/70 space-y-2">
            <li>• Aula 1 está liberada imediatamente</li>
            <li>• Complete o exercício para liberar a próxima aula</li>
            <li>• Nova aula disponível às 08h do dia seguinte</li>
            <li>• Exercícios não podem ser editados após conclusão</li>
          </ul>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
