import { UserProgress } from '../types';

const PROGRESS_STORAGE_KEY = 'tarix_olami_user_progress_v1';
const THEME_STORAGE_KEY = 'tarix_olami_theme_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  quizAttempts: [],
  romanExerciseStats: {
    solvedCount: 0,
    correctCount: 0,
    streak: 0,
    bestStreak: 0,
  },
};

/**
 * Brauzer xotirasidan o'qish (xatoliklarni xavfsiz boshqarish bilan)
 */
export function getSavedProgress(): UserProgress {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return DEFAULT_PROGRESS;
    }
    const item = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!item) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(item);
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
      romanExerciseStats: {
        solvedCount: Number(parsed.romanExerciseStats?.solvedCount) || 0,
        correctCount: Number(parsed.romanExerciseStats?.correctCount) || 0,
        streak: Number(parsed.romanExerciseStats?.streak) || 0,
        bestStreak: Number(parsed.romanExerciseStats?.bestStreak) || 0,
      },
    };
  } catch (err) {
    console.warn('localStorage dan o‘qishda xatolik:', err);
    return DEFAULT_PROGRESS;
  }
}

/**
 * Progressni xotiraga saqlash
 */
export function saveProgress(progress: UserProgress): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (err) {
    console.warn('localStorage ga yozishda xatolik:', err);
    return false;
  }
}

/**
 * Mavzuni (Theme) o'qish
 */
export function getSavedTheme(): 'dark' | 'light' {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return 'dark';
    }
    const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (theme === 'light' || theme === 'dark') {
      return theme;
    }
    return 'dark'; // standart tema: dark
  } catch {
    return 'dark';
  }
}

/**
 * Mavzuni saqlash
 */
export function saveTheme(theme: 'dark' | 'light'): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch (err) {
    console.warn('Mavzuni saqlashda xatolik:', err);
  }
}

/**
 * Barcha taraqqiyotni tozalash
 */
export function resetSavedProgress(): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
