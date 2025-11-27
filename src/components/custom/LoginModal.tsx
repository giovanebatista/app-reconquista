'use client';

import { useRouter } from 'next/navigation';
import { X, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#FFD645]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#FFD645]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Conteúdo Bloqueado</h2>
          <p className="text-white/60">
            Faça login para acessar todas as 40 aulas e ferramentas exclusivas
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-[#FFD645] text-black py-4 rounded-xl font-bold hover:bg-[#FFD645]/90 transition-colors"
          >
            Fazer Login
          </button>

          <button
            onClick={onClose}
            className="w-full bg-white/10 text-white py-4 rounded-xl font-medium hover:bg-white/20 transition-colors"
          >
            Voltar
          </button>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          Modo visitante: acesso apenas à Aula 1
        </p>
      </div>
    </div>
  );
}
