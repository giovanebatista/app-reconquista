'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Copy, Star, Check } from 'lucide-react';
import { useState } from 'react';

const MESSAGE_CATEGORIES = [
  { id: 'reapproximation', label: 'Reaproximação', color: 'from-blue-500/20 to-blue-500/5' },
  { id: 'smart-longing', label: 'Saudade Inteligente', color: 'from-purple-500/20 to-purple-500/5' },
  { id: 'validation', label: 'Validação Emocional', color: 'from-green-500/20 to-green-500/5' },
  { id: 'post-fight', label: 'Pós-Briga', color: 'from-red-500/20 to-red-500/5' },
  { id: 'flirt', label: 'Flertes Suaves', color: 'from-pink-500/20 to-pink-500/5' },
  { id: 'icebreaker', label: 'Quebra de Gelo', color: 'from-cyan-500/20 to-cyan-500/5' },
];

const MESSAGES = {
  reapproximation: [
    'Estava pensando aqui... sinto falta das nossas conversas. Como você está?',
    'Vi algo hoje que me lembrou de você. Espero que esteja bem.',
    'Sei que as coisas não terminaram da melhor forma, mas gostaria de conversar quando você se sentir confortável.',
  ],
  'smart-longing': [
    'Lembrei daquele momento que a gente ria sem parar. Bons tempos.',
    'Passei naquele lugar hoje. Trouxe algumas memórias boas.',
    'Estava ouvindo aquela música... você sabe qual. Me fez sorrir.',
  ],
  validation: [
    'Entendo que você precise de espaço. Estou aqui quando quiser conversar.',
    'Sei que não foi fácil para você também. Respeito o que você está sentindo.',
    'Você tem todo o direito de se sentir assim. Só queria que soubesse que te ouço.',
  ],
  'post-fight': [
    'Pensei bastante sobre o que aconteceu. Podemos conversar com calma?',
    'Sei que falei coisas que não deveria. Me desculpe por isso.',
    'Não quero que as coisas fiquem assim entre a gente. Quando puder, vamos conversar?',
  ],
  flirt: [
    'Você está diferente ultimamente... de um jeito bom.',
    'Aquele sorriso seu ainda tem o mesmo efeito em mim.',
    'Confesso que penso em você mais do que deveria.',
  ],
  icebreaker: [
    'E aí, como tem sido seus dias?',
    'Vi que você postou sobre [assunto]. Interessante, conta mais?',
    'Faz tempo que não conversamos direito. Tudo bem por aí?',
  ],
};

export default function MessagesPage() {
  const router = useRouter();
  const { appState, toggleFavorite } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('reapproximation');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const favorites = appState.user?.favorites || [];

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      // Fallback para navegadores que não suportam clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (e) {
        console.error('Erro ao copiar:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const messages = MESSAGES[selectedCategory as keyof typeof MESSAGES] || [];

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
            <h1 className="text-2xl md:text-3xl font-bold">Mensagens</h1>
            <p className="text-white/60 text-sm">Templates personalizados para reconquista</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {MESSAGE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#FFD645] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.map((message, index) => {
            const messageId = `${selectedCategory}-${index}`;
            const isFavorite = favorites.includes(messageId);
            const isCopied = copiedId === messageId;

            return (
              <div
                key={messageId}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#FFD645]/30 transition-all"
              >
                <p className="text-white/90 mb-4 leading-relaxed">{message}</p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(message, messageId)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isCopied
                        ? 'bg-green-500 text-white'
                        : 'bg-[#FFD645] text-black hover:bg-[#FFD645]/90'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => toggleFavorite(messageId)}
                    className={`p-2 rounded-lg transition-all ${
                      isFavorite
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6">
          <h3 className="font-bold mb-2">💡 Dica</h3>
          <p className="text-sm text-white/70">
            Essas mensagens foram criadas com base no seu onboarding. Use-as como inspiração
            e adapte ao seu contexto. O tom é maduro, direto e sem desespero.
          </p>
        </div>
      </div>
    </div>
  );
}
