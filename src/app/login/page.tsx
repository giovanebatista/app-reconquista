'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { Mail, LogIn, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'choice' | 'google' | 'email' | 'admin'>('choice');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authService.loginWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      setMessage('Erro ao fazer login com Google');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage('Digite seu email');
      return;
    }
    
    setLoading(true);
    try {
      await authService.sendMagicLink(email);
      setMessage('Link mágico enviado! Verifique seu email.');
    } catch (error) {
      setMessage('Erro ao enviar link');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setMessage('Digite email e senha');
      return;
    }
    
    setLoading(true);
    try {
      const user = await authService.loginAdmin(email, password);
      if (user) {
        router.push('/dashboard');
      } else {
        setMessage('Credenciais inválidas');
      }
    } catch (error) {
      setMessage('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    authService.createGuestUser();
    router.push('/onboarding');
  };

  if (mode === 'choice') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Código Masculino</h1>
            <p className="text-white/60">Entre para acessar seu conteúdo</p>
          </div>

          <div className="space-y-4">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </button>

            {/* Email Login */}
            <button
              onClick={() => setMode('email')}
              className="w-full bg-white/10 border border-white/20 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-3"
            >
              <Mail className="w-5 h-5" />
              Continuar com Email
            </button>

            {/* Guest Mode */}
            <button
              onClick={handleGuestMode}
              className="w-full bg-transparent border border-white/20 text-white/60 py-4 rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
            >
              <User className="w-5 h-5" />
              Experimentar como Visitante
            </button>
          </div>

          <p className="text-center text-white/40 text-sm mt-6">
            Modo visitante: acesso limitado à Aula 1
          </p>

          {/* Admin Access (hidden) */}
          <button
            onClick={() => setMode('admin')}
            className="w-full text-white/20 text-xs mt-8 hover:text-white/40"
          >
            Admin
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'email') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <button
            onClick={() => setMode('choice')}
            className="text-white/60 mb-6 hover:text-white"
          >
            ← Voltar
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Magic Link</h1>
            <p className="text-white/60">Enviaremos um link de acesso para seu email</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD645]"
            />

            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full bg-[#FFD645] text-black py-4 rounded-xl font-bold hover:bg-[#FFD645]/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar Link Mágico'}
            </button>

            {message && (
              <p className="text-center text-sm text-white/60">{message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'admin') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <button
            onClick={() => setMode('choice')}
            className="text-white/60 mb-6 hover:text-white"
          >
            ← Voltar
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
            <p className="text-white/60">Acesso administrativo</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD645]"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD645]"
            />

            <button
              onClick={handleAdminLogin}
              disabled={loading}
              className="w-full bg-[#FFD645] text-black py-4 rounded-xl font-bold hover:bg-[#FFD645]/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {message && (
              <p className="text-center text-sm text-red-400">{message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
