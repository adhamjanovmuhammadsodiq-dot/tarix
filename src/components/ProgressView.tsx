import React, { useState } from 'react';
import { UserProgress, Lesson } from '../types';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Flame,
  RotateCcw,
  BookOpen,
  Info,
  Calendar,
} from 'lucide-react';

interface ProgressViewProps {
  progress: UserProgress;
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  lessons,
  onSelectLesson,
  onResetProgress,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const completedCount = progress.completedLessons.length;
  const totalLessons = lessons.length;
  const lessonsPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

  const romanStats = progress.romanExerciseStats;
  const romanAccuracy =
    romanStats.solvedCount > 0
      ? Math.round((romanStats.correctCount / romanStats.solvedCount) * 100)
      : 0;

  const averageQuizScore =
    progress.quizAttempts.length > 0
      ? Math.round(
          progress.quizAttempts.reduce((acc, q) => acc + q.scorePercent, 0) /
            progress.quizAttempts.length
        )
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 light:text-amber-800 mb-2">
          <Award className="w-4 h-4" />
          <span>Mening o‘quv faoliyatim</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
          O‘quv yutuqlari va taraqqiyot
        </h2>
        <p className="text-sm sm:text-base text-stone-400 light:text-stone-600 mt-2 leading-relaxed">
          Tarix darslarini o‘zlashtirish, test natijalari va Rim raqamlari mashqlaridagi
          ko‘rsatkichlaringizning umumiy hisoboti.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Completed lessons */}
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 light:text-stone-600">
              O‘zlashtirilgan darslar
            </span>
            <BookOpen className="w-4 h-4 text-amber-400 light:text-amber-800" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
              {completedCount}
            </span>
            <span className="text-sm text-stone-400 light:text-stone-600">/ {totalLessons} ta</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-950 light:bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${lessonsPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-stone-400 light:text-stone-600">
            Dasturning {lessonsPercent}% qismi o‘rganildi
          </div>
        </div>

        {/* Card 2: Quiz stats */}
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 light:text-stone-600">
              O‘rtacha test balli
            </span>
            <HelpCircle className="w-4 h-4 text-amber-400 light:text-amber-800" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-amber-400 light:text-amber-800">
              {progress.quizAttempts.length > 0 ? `${averageQuizScore}%` : '—'}
            </span>
            <span className="text-xs text-stone-400 light:text-stone-600">
              ({progress.quizAttempts.length} ta urinish)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-950 light:bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${averageQuizScore}%` }}
            />
          </div>
          <div className="text-[11px] text-stone-400 light:text-stone-600">
            Tarix testlaridagi o‘rtacha aniqlik
          </div>
        </div>

        {/* Card 3: Roman exercise streak */}
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 light:text-stone-600">
              Rim raqamlari mashqi
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
              {romanStats.solvedCount}
            </span>
            <span className="text-xs text-stone-400 light:text-stone-600">ta yechilgan</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 light:text-stone-600 pt-1">
            <span>Aniqlik: {romanAccuracy}%</span>
            <span>Eng yaxshi streak: {romanStats.bestStreak}</span>
          </div>
        </div>
      </div>

      {/* Synchronisation Notice */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 light:bg-amber-50 light:border-amber-200 flex items-start gap-3 text-xs text-stone-300 light:text-stone-700">
        <Info className="w-4 h-4 text-amber-400 light:text-amber-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-400 light:text-amber-900">
            Xotira xabarnomasi:
          </span>{' '}
          Sizning ta’lim natijalaringiz hozirgi brauzeringiz xotirasida (localStorage) saqlanadi.
          Ushbu ma’lumotlar boshqa qurilmalarga yoki boshqa brauzerga avtomatik sinxronlanmasligi
          mumkin.
        </div>
      </div>

      {/* Completed Lessons Section */}
      <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-4">
        <h3 className="font-cinzel text-lg font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400 light:text-amber-800" />
          <span>O‘quv dasturi holati:</span>
        </h3>

        <div className="space-y-2">
          {lessons.map((lesson) => {
            const isDone = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className="p-3.5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 hover:border-amber-500/50 light:hover:border-amber-700/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-stone-800 text-stone-500 light:bg-stone-200 light:text-stone-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-400 light:text-amber-800 font-medium">
                      {lesson.categoryName}
                    </div>
                    <div className="text-sm font-semibold text-stone-100 light:text-stone-900 group-hover:text-amber-300 light:group-hover:text-amber-800">
                      {lesson.title}
                    </div>
                  </div>
                </div>

                <span className="text-xs text-stone-400 light:text-stone-500 group-hover:translate-x-1 transition-transform">
                  Darsni ochish →
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Attempt History */}
      {progress.quizAttempts.length > 0 && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-4">
          <h3 className="font-cinzel text-lg font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400 light:text-amber-800" />
            <span>Topshirilgan testlar tarixi:</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-stone-800 light:border-stone-200 text-stone-400 light:text-stone-600">
                <tr>
                  <th className="py-2.5 px-3">Sana</th>
                  <th className="py-2.5 px-3">Mavzu</th>
                  <th className="py-2.5 px-3 text-center">Savollar</th>
                  <th className="py-2.5 px-3 text-center">To‘g‘ri</th>
                  <th className="py-2.5 px-3 text-right">Natija</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 light:divide-stone-100">
                {progress.quizAttempts.slice(-5).reverse().map((attempt) => (
                  <tr key={attempt.id} className="text-stone-200 light:text-stone-800">
                    <td className="py-2.5 px-3 whitespace-nowrap text-stone-400 light:text-stone-500">
                      {attempt.date}
                    </td>
                    <td className="py-2.5 px-3 font-medium">{attempt.category}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{attempt.totalQuestions}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-emerald-400 light:text-emerald-800">
                      {attempt.correctCount}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-400 light:text-amber-800 font-mono">
                      {attempt.scorePercent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reset Progress Section */}
      <div className="pt-4 border-t border-stone-800 light:border-stone-200 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 light:text-stone-600">
            Xotirani boshqarish
          </h4>
          <p className="text-xs text-stone-500 light:text-stone-500 mt-0.5">
            O‘zlashtirish va test natijalarini nollash
          </p>
        </div>

        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 rounded-lg border border-red-800/40 text-red-400 hover:bg-red-950/40 light:border-red-300 light:text-red-700 light:hover:bg-red-50 text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Natijalarni tozalash</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetProgress();
                setShowConfirmReset(false);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-500 cursor-pointer"
            >
              Ha, tozalansin
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="px-3.5 py-1.5 rounded-lg border border-stone-700 text-stone-300 light:border-stone-300 light:text-stone-700 text-xs cursor-pointer"
            >
              Bekor qilish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
