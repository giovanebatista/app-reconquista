'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, OnboardingAnswers, AppState } from '@/lib/types';
import { authService, User as AuthUser } from '@/lib/auth';

interface AppContextType {
  appState: AppState;
  authUser: AuthUser | null;
  setOnboardingAnswers: (answers: OnboardingAnswers) => void;
  completeOnboarding: () => void;
  activateSubscription: (plan: 'monthly' | 'quarterly' | 'yearly') => void;
  completeLesson: (lessonId: number, textAnswer: string, checklistItems: string[]) => void;
  toggleFavorite: (itemId: string) => void;
  getUserProfile: () => UserProfile | null;
  isGuest: () => boolean;
  isAdmin: () => boolean;
  hasContentAccess: (lessonId: number) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [appState, setAppState] = useState<AppState>({
    user: null,
    isOnboardingComplete: false,
    hasActiveSubscription: false,
    currentScreen: 'home',
  });

  // Carregar dados do localStorage
  useEffect(() => {
    // Carregar auth
    const loadedAuthUser = authService.loadUser();
    setAuthUser(loadedAuthUser);

    // Carregar perfil
    const savedUser = localStorage.getItem('codigomasculino_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAppState({
        user,
        isOnboardingComplete: !!user.onboardingAnswers,
        hasActiveSubscription: user.hasSubscription || authService.isAdmin(loadedAuthUser),
        currentScreen: user.hasSubscription ? 'dashboard' : 'home',
      });
    }
  }, []);

  const setOnboardingAnswers = (answers: OnboardingAnswers) => {
    const newUser: UserProfile = {
      id: authUser?.id || crypto.randomUUID(),
      onboardingAnswers: answers,
      hasSubscription: authService.isAdmin(authUser),
      currentLesson: 1,
      completedLessons: [],
      completedExercises: {},
      favorites: [],
      createdAt: new Date(),
    };

    setAppState(prev => ({
      ...prev,
      user: newUser,
      isOnboardingComplete: true,
    }));

    localStorage.setItem('codigomasculino_user', JSON.stringify(newUser));
  };

  const completeOnboarding = () => {
    setAppState(prev => ({
      ...prev,
      isOnboardingComplete: true,
      currentScreen: authService.isAdmin(authUser) ? 'dashboard' : 'paywall',
    }));
  };

  const activateSubscription = (plan: 'monthly' | 'quarterly' | 'yearly') => {
    if (!appState.user) return;

    const updatedUser = {
      ...appState.user,
      hasSubscription: true,
      subscriptionPlan: plan,
      subscriptionDate: new Date(),
    };

    setAppState(prev => ({
      ...prev,
      user: updatedUser,
      hasActiveSubscription: true,
      currentScreen: 'dashboard',
    }));

    localStorage.setItem('codigomasculino_user', JSON.stringify(updatedUser));
  };

  const completeLesson = (lessonId: number, textAnswer: string, checklistItems: string[]) => {
    if (!appState.user) return;

    const updatedUser = {
      ...appState.user,
      completedLessons: [...appState.user.completedLessons, lessonId],
      completedExercises: {
        ...appState.user.completedExercises,
        [lessonId]: {
          lessonId,
          textAnswer,
          checklistItems,
          completedAt: new Date(),
        },
      },
      currentLesson: lessonId + 1,
    };

    setAppState(prev => ({
      ...prev,
      user: updatedUser,
    }));

    localStorage.setItem('codigomasculino_user', JSON.stringify(updatedUser));
  };

  const toggleFavorite = (itemId: string) => {
    if (!appState.user) return;

    const favorites = appState.user.favorites.includes(itemId)
      ? appState.user.favorites.filter(id => id !== itemId)
      : [...appState.user.favorites, itemId];

    const updatedUser = {
      ...appState.user,
      favorites,
    };

    setAppState(prev => ({
      ...prev,
      user: updatedUser,
    }));

    localStorage.setItem('codigomasculino_user', JSON.stringify(updatedUser));
  };

  const getUserProfile = () => appState.user;

  const isGuest = () => authService.isGuest(authUser);

  const isAdmin = () => authService.isAdmin(authUser);

  const hasContentAccess = (lessonId: number) => {
    // Admin tem acesso total
    if (isAdmin()) return true;

    // Guest só tem acesso à aula 1
    if (isGuest()) return lessonId === 1;

    // Usuários autenticados precisam de assinatura ativa
    return appState.hasActiveSubscription;
  };

  const logout = () => {
    authService.logout();
    setAuthUser(null);
    setAppState({
      user: null,
      isOnboardingComplete: false,
      hasActiveSubscription: false,
      currentScreen: 'home',
    });
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        authUser,
        setOnboardingAnswers,
        completeOnboarding,
        activateSubscription,
        completeLesson,
        toggleFavorite,
        getUserProfile,
        isGuest,
        isAdmin,
        hasContentAccess,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
