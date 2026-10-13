export type CategoryId =
  | 'qadimgi-dunyo'
  | 'qadimgi-rim'
  | 'qadimgi-yunoniston'
  | 'qadimgi-misr'
  | 'orta-asrlar'
  | 'ozbekiston-tarixi'
  | 'jahon-tarixi';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortDesc: string;
  era: string;
  iconName: string;
}

export interface MiniQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface HistoricalFigure {
  name: string;
  role: string;
  period: string;
  description: string;
}

export interface HistoricalDate {
  year: string;
  event: string;
}

export type GradeLevel = 'all' | '5-sinf' | '6-sinf';

export interface Lesson {
  id: string;
  grade: '5-sinf' | '6-sinf';
  categoryId: CategoryId;
  categoryName: string;
  title: string;
  subtitle: string;
  objectives: string[];
  readingTimeMinutes: number;
  image?: string;
  overview: string;
  historicalContext: string;
  factsVsLegends?: {
    fact: string;
    legend: string;
  };
  importantDates: HistoricalDate[];
  historicalFigures: HistoricalFigure[];
  keyFacts: string[];
  summary: string;
  miniQuiz: MiniQuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-3
  explanation: string;
  difficulty?: 'oson' | 'orta' | 'qiyin';
}

export interface TimelineEvent {
  id: string;
  year: string;
  numericYear: number; // For sorting; negative for BC/mil. avv.
  isApproximate?: boolean;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  description: string;
  significance: string;
  location: string;
  image?: string;
}

export interface UserProgress {
  completedLessons: string[]; // lesson IDs
  lastCompletedDate?: string;
  quizAttempts: {
    id: string;
    date: string;
    category: string;
    totalQuestions: number;
    correctCount: number;
    scorePercent: number;
  }[];
  romanExerciseStats: {
    solvedCount: number;
    correctCount: number;
    streak: number;
    bestStreak: number;
  };
}

export type ActiveTab = 'home' | 'lessons' | 'roman' | 'quiz' | 'timeline' | 'progress';
