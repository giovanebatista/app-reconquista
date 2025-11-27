'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Star, MessageCircle, Heart, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const { appState, toggleFavorite } = useApp();

  const favorites = appState.user?.favorites || [];

  const getFavoriteType = (id: string) => {
    if (id.startsWith('tool-')) return 'tool';
    return 'message';
  };

  const getFavoriteTitle = (id: string) => {
    const type = getFavoriteType(id);
    
    if (type === 'tool') {
      const toolNumber = id.replace('tool-', '');
      const toolTitles: Record<string, string> = {
        '1': 'Respiração 4-7-8',
        '2': 'Pausa de 90 Segundos',
        '3': 'Validação Emocional',
        '4': 'Checklist de Autocuidado',
        '5': 'Reframe Cognitivo',
        '6': 'Âncora de Presença',
        '7': 'Escrita Terapêutica',
        '8': 'Toque de 12 Segundos',
        '9': 'Gratidão Diária',
        '10': 'Limite Saudável',
        '11': 'Desintoxicação Digital',
        '12': 'Preparação para Encontro',
      };
      return toolTitles[toolNumber] || 'Ferramenta';
    }
    
    // Messages
    const categoryMap: Record<string, string> = {
      'reapproximation': 'Reaproximação',
      'smart-longing': 'Saudade Inteligente',
      'validation': 'Validação Emocional',
      'post-fight': 'Pós-Briga',
      'flirt': 'Flerte Suave',
      'icebreaker': 'Quebra de Gelo',
    };
    
    const category = id.split('-')[0];
    return categoryMap[category] || 'Mensagem';
  };

  const handleNavigate = (id: string) => {
    const type = getFavoriteType(id);
    if (type === 'tool') {
      router.push('/tools');
    } else {
      router.push('/messages');
    }
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
            <h1 className="text-2xl md:text-3xl font-bold">Favoritos</h1>
            <p className="text-white/60 text-sm">
              {favorites.length} {favorites.length === 1 ? 'item salvo' : 'itens salvos'}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhum favorito ainda</h3>
            <p className="text-white/60 mb-6">
              Favorite mensagens e ferramentas para acessá-las rapidamente
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push('/messages')}
                className="px-6 py-3 bg-[#FFD645] text-black rounded-lg font-medium hover:bg-[#FFD645]/90 transition-colors"
              >
                Ver Mensagens
              </button>
              <button
                onClick={() => router.push('/tools')}
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Ver Ferramentas
              </button>
            </div>
          </div>
        )}

        {/* Favorites List */}
        {favorites.length > 0 && (
          <div className="space-y-3">
            {favorites.map((favoriteId) => {
              const type = getFavoriteType(favoriteId);
              const title = getFavoriteTitle(favoriteId);

              return (
                <div
                  key={favoriteId}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#FFD645]/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      type === 'tool'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {type === 'tool' ? (
                        <Heart className="w-5 h-5" />
                      ) : (
                        <MessageCircle className="w-5 h-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white/60 uppercase">
                          {type === 'tool' ? 'Ferramenta' : 'Mensagem'}
                        </span>
                      </div>
                      <h3 className="font-bold mb-1">{title}</h3>
                      <p className="text-sm text-white/60">
                        {type === 'tool' 
                          ? 'Ferramenta emocional prática'
                          : 'Template de mensagem personalizado'
                        }
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleNavigate(favoriteId)}
                        className="px-4 py-2 bg-[#FFD645] text-black rounded-lg text-sm font-medium hover:bg-[#FFD645]/90 transition-colors"
                      >
                        Abrir
                      </button>
                      <button
                        onClick={() => toggleFavorite(favoriteId)}
                        className="p-2 bg-white/10 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Card */}
        {favorites.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-[#FFD645]/10 to-transparent border border-[#FFD645]/20 rounded-2xl p-6">
            <h3 className="font-bold mb-2">💡 Dica</h3>
            <p className="text-sm text-white/70">
              Use favoritos para ter acesso rápido às ferramentas e mensagens que você mais usa.
              Clique no ícone de lixeira para remover um item dos favoritos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
