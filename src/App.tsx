/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveTab, Lesson, UserProgress } from './types';
import { LESSONS } from './data/lessonsData';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import { TIMELINE_EVENTS } from './data/timelineData';
import {
  getSavedProgress,
  saveProgress,
  resetSavedProgress,
} from './utils/storage';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LessonsView } from './components/LessonsView';
import { RomanNumeralsView } from './components/RomanNumeralsView';
import { QuizView } from './components/QuizView';
import { TimelineView } from './components/TimelineView';
import { ProgressView } from './components/ProgressView';
import { Footer } from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => getSavedProgress());

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const handleSelectLesson = (lesson: Lesson | null) => {
    setSelectedLesson(lesson);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompleteLesson = (lessonId: string) => {
    setProgress((prev) => {
      const isAlready = prev.completedLessons.includes(lessonId);
      const updatedList = isAlready
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      const newProgress: UserProgress = {
        ...prev,
        completedLessons: updatedList,
        lastCompletedDate: new Date().toLocaleDateString('uz-UZ'),
      };
      saveProgress(newProgress);
      return newProgress;
    });
  };

  const handleUpdateRomanStats = (isCorrect: boolean) => {
    setProgress((prev) => {
      const stats = prev.romanExerciseStats;
      const newStreak = isCorrect ? stats.streak + 1 : 0;
      const bestStreak = Math.max(stats.bestStreak, newStreak);

      const newProgress: UserProgress = {
        ...prev,
        romanExerciseStats: {
          solvedCount: stats.solvedCount + 1,
          correctCount: stats.correctCount + (isCorrect ? 1 : 0),
          streak: newStreak,
          bestStreak,
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  };

  const handleQuizCompleted = (result: {
    category: string;
    totalQuestions: number;
    correctCount: number;
    scorePercent: number;
  }) => {
    setProgress((prev) => {
      const newAttempt = {
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toLocaleDateString('uz-UZ'),
        category: result.category,
        totalQuestions: result.totalQuestions,
        correctCount: result.correctCount,
        scorePercent: result.scorePercent,
      };

      const newProgress: UserProgress = {
        ...prev,
        quizAttempts: [...prev.quizAttempts, newAttempt],
      };
      saveProgress(newProgress);
      return newProgress;
    });
  };

  const handleResetProgress = () => {
    resetSavedProgress();
    setProgress({
      completedLessons: [],
      quizAttempts: [],
      romanExerciseStats: {
        solvedCount: 0,
        correctCount: 0,
        streak: 0,
        bestStreak: 0,
      },
    });
  };

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === 'lessons' && activeTab === 'lessons') {
      setSelectedLesson(null);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 light:bg-[#FAF7F2] light:text-stone-900 transition-colors duration-200 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      <div>
        {/* Top bar header */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          completedLessonsCount={progress.completedLessons.length}
        />

        {/* Content routing */}
        <main>
          {activeTab === 'home' && (
            <>
              <HeroSection
                onSelectTab={handleTabChange}
                onSelectLesson={handleSelectLesson}
                lessons={LESSONS}
              />
              {/* Home Quick Highlights */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
                {/* Section 1: Featured Lessons Preview */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-400 light:text-amber-800">
                        5- va 6-sinf o‘quv dasturi
                      </span>
                      <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 light:text-stone-900 mt-1">
                        Tanlangan tarix darslari
                      </h3>
                    </div>
                    <button
                      onClick={() => handleTabChange('lessons')}
                      className="text-xs font-bold text-amber-400 light:text-amber-800 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                    >
                      <span>Barcha {LESSONS.length} ta darsni ko‘rish (5- va 6-sinf)</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {LESSONS.slice(0, 3).map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lesson)}
                        className="rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/50 light:bg-white hover:border-amber-500/50 light:hover:border-amber-700/50 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-sm"
                      >
                        {lesson.image && (
                          <div className="aspect-[16/9] w-full relative overflow-hidden bg-stone-950">
                            <img
                              src={lesson.image}
                              alt={lesson.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950 shadow">
                                {lesson.grade}
                              </span>
                              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                                {lesson.categoryName}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-5 space-y-2">
                          <h4 className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-400 light:group-hover:text-amber-800 transition-colors">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-stone-400 light:text-stone-600 line-clamp-2">
                            {lesson.subtitle}
                          </p>
                        </div>
                        <div className="p-5 pt-0 text-xs font-semibold text-amber-400 light:text-amber-800 flex items-center justify-between">
                          <span>Darsni boshlash</span>
                          <span>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Roman Numerals Quick Feature */}
                <div className="p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-stone-900/90 to-stone-950 light:from-amber-50/70 light:to-white flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 max-w-xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 light:text-amber-800">
                      Amaliy ko‘nikma
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 light:text-stone-900">
                      Barcha Rim raqamlarini to‘liq o‘rganing
                    </h3>
                    <p className="text-sm text-stone-300 light:text-stone-700 leading-relaxed">
                      1 dan 100 gacha to‘liq Rim raqamlari jadvali, I asrdan XXI asrgacha bo‘lgan
                      asrlar hisobi, barcha son guruhlari (1–3999), ikki tomonlama aniq konverter va
                      xatoliklar tushuntiriluvchi mashqlar.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => handleTabChange('roman')}
                        className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        Barcha Rim raqamlari jadvali
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 font-cinzel text-center">
                    {['I=1', 'V=5', 'X=10', 'L=50', 'C=100', 'D=500', 'M=1000', 'MMXXVI'].map(
                      (item) => (
                        <div
                          key={item}
                          className="px-3 py-2.5 rounded-lg border border-stone-800 light:border-stone-200 bg-stone-950/80 light:bg-white text-xs font-bold text-amber-400 light:text-amber-800 shadow-sm"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'lessons' && (
            <LessonsView
              lessons={LESSONS}
              selectedLesson={selectedLesson}
              onSelectLesson={setSelectedLesson}
              completedLessons={progress.completedLessons}
              onToggleCompleteLesson={handleToggleCompleteLesson}
            />
          )}

          {activeTab === 'roman' && (
            <RomanNumeralsView
              onUpdateStats={handleUpdateRomanStats}
              stats={progress.romanExerciseStats}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizView
              questions={QUIZ_QUESTIONS}
              onQuizCompleted={handleQuizCompleted}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineView events={TIMELINE_EVENTS} />
          )}

          {activeTab === 'progress' && (
            <ProgressView
              progress={progress}
              lessons={LESSONS}
              onSelectLesson={handleSelectLesson}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
