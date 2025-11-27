'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Star, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

const EMOTIONAL_TOOLS = [
  {
    id: 'tool-1',
    title: 'Respiração 4-7-8',
    description: 'Técnica para reduzir ansiedade imediata',
    steps: [
      'Inspire pelo nariz contando até 4',
      'Segure a respiração contando até 7',
      'Expire pela boca contando até 8',
      'Repita 4 vezes',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-2',
    title: 'Pausa de 90 Segundos',
    description: 'Interrompa uma discussão antes de explodir',
    steps: [
      'Perceba quando a raiva está subindo',
      'Diga: "Preciso de um momento"',
      'Saia do ambiente por 90 segundos',
      'Respire fundo 3 vezes',
      'Volte com calma',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-3',
    title: 'Validação Emocional',
    description: 'Como validar sem concordar',
    steps: [
      'Ouça sem interromper',
      'Repita o que entendeu',
      'Diga: "Entendo que você sinta assim"',
      'Não justifique ainda',
      'Pergunte: "O que mais você precisa me dizer?"',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-4',
    title: 'Checklist de Autocuidado',
    description: 'Rotina diária para manter energia alta',
    steps: [
      'Dormi pelo menos 7 horas',
      'Fiz exercício físico (mesmo que leve)',
      'Comi algo nutritivo',
      'Tive um momento só meu',
      'Fiz algo que me dá prazer',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-5',
    title: 'Reframe Cognitivo',
    description: 'Transforme pensamentos negativos',
    steps: [
      'Identifique o pensamento negativo',
      'Pergunte: "Isso é 100% verdade?"',
      'Busque evidências contrárias',
      'Reformule de forma realista',
      'Repita a nova versão 3 vezes',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-6',
    title: 'Âncora de Presença',
    description: 'Volte ao momento presente',
    steps: [
      'Nomeie 5 coisas que você vê',
      'Nomeie 4 coisas que você toca',
      'Nomeie 3 sons que você ouve',
      'Nomeie 2 cheiros que você sente',
      'Nomeie 1 sabor na sua boca',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-7',
    title: 'Escrita Terapêutica',
    description: 'Processe emoções no papel',
    steps: [
      'Reserve 10 minutos sem interrupção',
      'Escreva tudo que está sentindo',
      'Não se preocupe com gramática',
      'Seja brutalmente honesto',
      'Depois, releia com distância',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-8',
    title: 'Toque de 12 Segundos',
    description: 'Reconexão física consciente',
    steps: [
      'Peça permissão antes',
      'Toque suave no braço ou mão',
      'Mantenha por 12 segundos',
      'Respire junto',
      'Solte devagar',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-9',
    title: 'Gratidão Diária',
    description: 'Mude o foco para o positivo',
    steps: [
      'Liste 3 coisas boas do dia',
      'Seja específico (não genérico)',
      'Sinta a emoção de cada uma',
      'Escreva ou fale em voz alta',
      'Faça isso antes de dormir',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-10',
    title: 'Limite Saudável',
    description: 'Como dizer não com respeito',
    steps: [
      'Seja claro e direto',
      'Use "eu" em vez de "você"',
      'Explique o motivo brevemente',
      'Não se justifique demais',
      'Mantenha o tom calmo',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-11',
    title: 'Desintoxicação Digital',
    description: 'Pare de stalkear e viva',
    steps: [
      'Silencie notificações dela',
      'Não veja stories por 24h',
      'Ocupe o tempo com algo produtivo',
      'Quando sentir vontade, respire fundo',
      'Celebre cada dia sem stalkear',
    ],
    interactionType: 'checklist' as const,
  },
  {
    id: 'tool-12',
    title: 'Preparação para Encontro',
    description: 'Checklist antes de se encontrar',
    steps: [
      'Defini minha intenção para o encontro',
      'Estou descansado e apresentável',
      'Não vou falar do passado (a menos que ela traga)',
      'Vou ouvir mais do que falar',
      'Tenho um plano B se ficar tenso',
    ],
    interactionType: 'checklist' as const,
  },
];

export default function ToolsPage() {
  const router = useRouter();
  const { appState, toggleFavorite } = useApp();
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, string[]>>({});

  const favorites = appState.user?.favorites || [];

  const toggleStep = (toolId: string, step: string) => {
    setCompletedSteps((prev) => {
      const toolSteps = prev[toolId] || [];
      const isCompleted = toolSteps.includes(step);
      
      return {
        ...prev,
        [toolId]: isCompleted
          ? toolSteps.filter((s) => s !== step)
          : [...toolSteps, step],
      };
    });
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
            <h1 className="text-2xl md:text-3xl font-bold">Ferramentas Emocionais</h1>
            <p className="text-white/60 text-sm">12 recursos práticos para sua jornada</p>
          </div>
        </div>

        {/* Tools List */}
        <div className="space-y-4">
          {EMOTIONAL_TOOLS.map((tool) => {
            const isFavorite = favorites.includes(tool.id);
            const isExpanded = expandedTool === tool.id;
            const toolCompletedSteps = completedSteps[tool.id] || [];
            const progress = (toolCompletedSteps.length / tool.steps.length) * 100;

            return (
              <div
                key={tool.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FFD645]/30 transition-all"
              >
                {/* Tool Header */}
                <button
                  onClick={() => setExpandedTool(isExpanded ? null : tool.id)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{tool.title}</h3>
                      <p className="text-sm text-white/60">{tool.description}</p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(tool.id);
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        isFavorite
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {toolCompletedSteps.length > 0 && (
                    <div className="mt-3">
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FFD645] transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-white/40 mt-1">
                        {toolCompletedSteps.length}/{tool.steps.length} passos
                      </p>
                    </div>
                  )}
                </button>

                {/* Tool Steps */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3 border-t border-white/10 pt-4">
                    {tool.steps.map((step, index) => {
                      const isCompleted = toolCompletedSteps.includes(step);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => toggleStep(tool.id, step)}
                          className="w-full flex items-start gap-3 text-left p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              isCompleted ? 'text-white/60 line-through' : 'text-white/90'
                            }`}
                          >
                            {step}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6">
          <h3 className="font-bold mb-2">💡 Como usar</h3>
          <p className="text-sm text-white/70">
            Clique em cada ferramenta para ver os passos. Marque os itens conforme for
            completando. Use o botão de estrela para favoritar as ferramentas mais úteis.
          </p>
        </div>
      </div>
    </div>
  );
}
