// Tipos do app de reconquista

export interface OnboardingAnswers {
  timeBreakup: string; // Há quanto tempo terminaram
  whoDecided: string; // Quem tomou a decisão
  contactLevel: string; // Nível de contato atual
  mainDifficulty: string; // Maior dificuldade
  mainDesire: string; // O que deseja reconstruir
}

export interface UserProfile {
  id: string;
  onboardingAnswers: OnboardingAnswers;
  hasSubscription: boolean;
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly';
  subscriptionDate?: Date;
  currentLesson: number;
  completedLessons: number[];
  completedExercises: Record<number, ExerciseCompletion>;
  favorites: string[];
  createdAt: Date;
}

export interface ExerciseCompletion {
  lessonId: number;
  textAnswer: string;
  checklistItems: string[];
  completedAt: Date;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  concept: string;
  example: string;
  exercise: {
    question: string;
    checklistItems: string[];
  };
  isLocked: boolean;
  unlocksAt?: Date;
}

export interface EmotionalTool {
  id: string;
  title: string;
  description: string;
  steps: string[];
  interactionType: 'checklist' | 'selection';
  options?: string[];
}

export interface Message {
  id: string;
  category: 'reapproximation' | 'smart-longing' | 'validation' | 'post-fight' | 'flirt' | 'icebreaker';
  text: string;
  personalized: boolean;
}

export interface AppState {
  user: UserProfile | null;
  isOnboardingComplete: boolean;
  hasActiveSubscription: boolean;
  currentScreen: string;
}
