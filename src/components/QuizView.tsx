import React, { useState, useMemo } from 'react';
import { QuizQuestion, CategoryId } from '../types';
import { CATEGORIES } from '../data/lessonsData';
import {
  CheckSquare,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ListOrdered,
} from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  onQuizCompleted: (result: {
    category: string;
    totalQuestions: number;
    correctCount: number;
    scorePercent: number;
  }) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onQuizCompleted }) => {
  // Setup configuration state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Active quiz state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentSelectedOption, setCurrentSelectedOption] = useState<number | null>(null);
  const [showCurrentFeedback, setShowCurrentFeedback] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);

  // Filter pool of questions
  const poolQuestions = useMemo(() => {
    if (selectedCategory === 'all') return questions;
    return questions.filter((q) => q.categoryId === selectedCategory);
  }, [questions, selectedCategory]);

  // Start new test with randomized questions
  const handleStartQuiz = () => {
    const shuffled = [...poolQuestions].sort(() => Math.random() - 0.5);
    const count = Math.min(questionCount, shuffled.length);
    const selected = shuffled.slice(0, count);

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setCurrentSelectedOption(null);
    setShowCurrentFeedback(false);
    setQuizStarted(true);
    setQuizCompleted(false);
    setReviewMode(false);
  };

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (optionIdx: number) => {
    if (showCurrentFeedback) return;
    setCurrentSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (currentSelectedOption === null) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: currentSelectedOption }));
    setShowCurrentFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSelectedOption(null);
      setShowCurrentFeedback(false);
    } else {
      // Quiz finished
      setQuizCompleted(true);

      const allAnswers = {
        ...selectedAnswers,
        ...(currentSelectedOption !== null ? { [currentIndex]: currentSelectedOption } : {}),
      };

      // Calculate score
      let correct = 0;
      activeQuestions.forEach((q, idx) => {
        if (allAnswers[idx] === q.correctAnswer) {
          correct++;
        }
      });

      const totalCount = activeQuestions.length || 1;
      const percent = Math.round((correct / totalCount) * 100);

      const catLabel =
        selectedCategory === 'all'
          ? 'Barcha tarixiy mavzular'
          : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Tarix testi';

      onQuizCompleted({
        category: catLabel,
        totalQuestions: activeQuestions.length,
        correctCount: correct,
        scorePercent: percent,
      });
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setReviewMode(false);
    setSelectedAnswers({});
    setCurrentSelectedOption(null);
    setShowCurrentFeedback(false);
  };

  // Final Score Statistics
  const totalCorrect = useMemo(() => {
    if (!quizCompleted) return 0;
    return activeQuestions.reduce((acc, q, idx) => {
      return selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [quizCompleted, activeQuestions, selectedAnswers]);

  const totalIncorrect = activeQuestions.length - totalCorrect;
  const scorePercent = Math.round((totalCorrect / (activeQuestions.length || 1)) * 100);

  // 1. Initial Test Setup Screen
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 light:text-amber-800 mb-2">
            <CheckSquare className="w-4 h-4" />
            <span>Bilimni tekshirish tizimi</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
            Tarix fanidan interaktiv testlar
          </h2>
          <p className="text-sm sm:text-base text-stone-400 light:text-stone-600 mt-2 leading-relaxed">
            Qadimgi dunyo sivilizatsiyalari, Qadimgi Rim, Misr, Yunoniston, Mesopotamiya,
            O‘zbekiston va Jahon tarixi bo‘yicha tuzilgan sifatli sinov savollari.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          {/* Category selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 light:text-stone-700">
              Test mavzusini tanlang:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300 light:bg-amber-100 light:text-amber-900 light:border-amber-700 shadow-sm'
                    : 'border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-600 light:bg-stone-50 light:text-stone-700 light:border-stone-300'
                }`}
              >
                <div>Barcha mavzular</div>
                <div className="text-[11px] text-stone-400 light:text-stone-500 font-normal mt-0.5">
                  ({questions.length} ta savollar bazasi)
                </div>
              </button>

              {CATEGORIES.map((cat) => {
                const count = questions.filter((q) => q.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'border-amber-400 bg-amber-500/15 text-amber-300 light:bg-amber-100 light:text-amber-900 light:border-amber-700 shadow-sm'
                        : 'border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-600 light:bg-stone-50 light:text-stone-700 light:border-stone-300'
                    }`}
                  >
                    <div className="line-clamp-1">{cat.name}</div>
                    <div className="text-[11px] text-stone-400 light:text-stone-500 font-normal mt-0.5">
                      ({count} ta savol)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question count options */}
          <div className="space-y-3 pt-2 border-t border-stone-800 light:border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 light:text-stone-700">
              Savollar sonini tanlang:
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {[5, 10, 15, 20, 30].map((num) => {
                const isPossible = num <= poolQuestions.length;
                return (
                  <button
                    key={num}
                    disabled={!isPossible}
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      questionCount === num
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                        : isPossible
                        ? 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600 light:bg-stone-50 light:text-stone-700 light:border-stone-300'
                        : 'opacity-30 border-stone-900 bg-stone-950 text-stone-600 cursor-not-allowed'
                    }`}
                  >
                    {num} ta savol
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclaimer regarding school grades */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 light:bg-amber-50/70 light:border-amber-200 flex items-start gap-3 text-xs text-stone-300 light:text-stone-700">
            <AlertCircle className="w-4 h-4 text-amber-400 light:text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-400 light:text-amber-900">
                Eslatma:
              </span>{' '}
              Ushbu test natijalari rasmiy maktab bahosi hisoblanmaydi, balki o‘z-o‘zini mustaqil
              baholash va tarixiy bilimlarni mustahkamlash maqsadida xizmat qiladi.
            </div>
          </div>

          {/* Start CTA */}
          <div className="pt-2 text-center sm:text-left">
            <button
              onClick={handleStartQuiz}
              className="px-8 py-3.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Testni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Final Results Screen
  if (quizCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 light:text-amber-800">
            <Sparkles className="w-4 h-4" />
            <span>Test yakunlandi</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
            Sizning test natijalaringiz
          </h2>
          <p className="text-xs text-stone-400 light:text-stone-600">
            Eslatma: Ushbu test natijalari rasmiy maktab bahosi hisoblanmaydi.
          </p>
        </div>

        {/* Results Card */}
        <div className="p-8 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/60 light:bg-white shadow-lg space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50">
              <div className="font-cinzel text-4xl sm:text-5xl font-bold text-amber-400 light:text-amber-800">
                {scorePercent}%
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 light:text-stone-600 mt-2">
                O‘zlashtirish ko‘rsatkichi
              </div>
            </div>

            <div className="p-5 rounded-xl border border-emerald-800/30 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50">
              <div className="font-cinzel text-4xl sm:text-5xl font-bold text-emerald-400 light:text-emerald-800">
                {totalCorrect}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 light:text-emerald-700 mt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>To‘g‘ri javoblar</span>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-red-800/30 light:border-red-200 bg-red-950/20 light:bg-red-50">
              <div className="font-cinzel text-4xl sm:text-5xl font-bold text-red-400 light:text-red-800">
                {totalIncorrect}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-red-300 light:text-red-700 mt-2 flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>Xato javoblar</span>
              </div>
            </div>
          </div>

          {/* Performance commentary */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 light:bg-stone-50 light:border-stone-200 text-center text-sm text-stone-200 light:text-stone-800">
            {scorePercent >= 80 ? (
              <p className="font-medium text-emerald-400 light:text-emerald-800">
                A’lo natija! Tarixiy voqealar va sanalar bo‘yicha bilimlaringiz juda yuqori darajada.
              </p>
            ) : scorePercent >= 60 ? (
              <p className="font-medium text-amber-400 light:text-amber-800">
                Yaxshi natija! Ko‘p savollarga to‘g‘ri javob berdingiz, ayrim darslarni qayta o‘qib chiqsangiz yanada yaxshi bo‘ladi.
              </p>
            ) : (
              <p className="font-medium text-stone-300 light:text-stone-700">
                Bilimlarni yanada oshirish tavsiya etiladi. Tarix darslarini takrorlab, qaytadan urinib ko‘ring!
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testni qayta topshirish</span>
            </button>

            <button
              onClick={() => setReviewMode(!reviewMode)}
              className="px-6 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-stone-200 light:bg-stone-100 light:border-stone-300 light:text-stone-800 hover:bg-stone-800 font-bold text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
              <span>{reviewMode ? 'Tahlilni yopish' : 'Javoblarni ko‘rib chiqish'}</span>
            </button>
          </div>
        </div>

        {/* Review Answers section with explanations */}
        {reviewMode && (
          <div className="space-y-4 pt-4">
            <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400 light:text-amber-800" />
              <span>Test savollari va javoblar tahlili:</span>
            </h3>

            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold text-amber-400 light:text-amber-800 bg-amber-500/10 px-2 py-0.5 rounded">
                          {idx + 1}-savol
                        </span>
                        <h4 className="text-sm sm:text-base font-semibold text-stone-100 light:text-stone-900">
                          {q.question}
                        </h4>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-950 text-emerald-400 light:bg-emerald-100 light:text-emerald-800'
                            : 'bg-red-950 text-red-400 light:bg-red-100 light:text-red-800'
                        }`}
                      >
                        {isCorrect ? 'To‘g‘ri' : 'Xato'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        let optStyle =
                          'border-stone-800 bg-stone-950 text-stone-400 light:border-stone-200 light:bg-stone-50 light:text-stone-600';
                        if (optIdx === q.correctAnswer) {
                          optStyle =
                            'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold light:bg-emerald-50 light:text-emerald-900 light:border-emerald-600';
                        } else if (optIdx === userChoice && !isCorrect) {
                          optStyle =
                            'border-red-500 bg-red-950/60 text-red-300 font-bold light:bg-red-50 light:text-red-900 light:border-red-600';
                        }

                        return (
                          <div key={optIdx} className={`p-2.5 rounded-lg border ${optStyle}`}>
                            <span className="mr-1.5 font-bold">{String.fromCharCode(65 + optIdx)})</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-lg bg-stone-950/80 light:bg-stone-50 border border-stone-800 light:border-stone-200 text-xs text-stone-300 light:text-stone-700 leading-relaxed">
                      <span className="font-bold text-amber-400 light:text-amber-800 mr-1">
                        Tarixiy sharh:
                      </span>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. Active Quiz In-Progress Screen
  if (!currentQ) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm text-stone-400 light:text-stone-600">Savollar topilmadi yoki test yakunlandi.</p>
        <button
          onClick={handleRestart}
          className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
        >
          Testni qayta boshlash
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Quiz Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-400 light:text-stone-600">
          <span>
            Savol {currentIndex + 1} / {activeQuestions.length}
          </span>
          <span className="text-amber-400 light:text-amber-800">
            {currentQ.categoryName}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-stone-900 light:bg-stone-200 overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/60 light:bg-white shadow-md space-y-6">
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 light:text-stone-900 leading-snug">
          {currentQ.question}
        </h3>

        {/* 4 Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = currentSelectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let optionStyle =
              'border-stone-800 bg-stone-950/80 text-stone-200 hover:border-amber-500/60 light:border-stone-300 light:bg-stone-50 light:text-stone-900 light:hover:border-amber-700/60';

            if (showCurrentFeedback) {
              if (isCorrect) {
                optionStyle =
                  'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold light:bg-emerald-50 light:text-emerald-900 light:border-emerald-600';
              } else if (isSelected && !isCorrect) {
                optionStyle =
                  'border-red-500 bg-red-950/60 text-red-300 font-bold light:bg-red-50 light:text-red-900 light:border-red-600';
              } else {
                optionStyle =
                  'opacity-40 border-stone-900 bg-stone-950 text-stone-500 light:border-stone-200 light:bg-stone-100 light:text-stone-400';
              }
            } else if (isSelected) {
              optionStyle =
                'border-amber-400 bg-amber-500/15 text-amber-300 font-semibold light:border-amber-800 light:bg-amber-100 light:text-amber-900';
            }

            return (
              <button
                key={idx}
                disabled={showCurrentFeedback}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 light:bg-stone-200 light:text-stone-800 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {showCurrentFeedback && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {showCurrentFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {showCurrentFeedback && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
              currentSelectedOption === currentQ.correctAnswer
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300 light:bg-emerald-50 light:border-emerald-200 light:text-emerald-900'
                : 'bg-red-950/40 border-red-800/40 text-red-300 light:bg-red-50 light:border-red-200 light:text-red-900'
            }`}
          >
            <div className="font-bold mb-1">
              {currentSelectedOption === currentQ.correctAnswer
                ? 'To‘g‘ri javob!'
                : 'Noto‘g‘ri javob.'}
            </div>
            <div>{currentQ.explanation}</div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleRestart}
            className="text-xs text-stone-400 hover:text-stone-200 light:hover:text-stone-800 cursor-pointer"
          >
            Testni to‘xtatish
          </button>

          {!showCurrentFeedback ? (
            <button
              disabled={currentSelectedOption === null}
              onClick={handleSubmitAnswer}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                currentSelectedOption !== null
                  ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-md'
                  : 'bg-stone-800 text-stone-500 cursor-not-allowed light:bg-stone-200 light:text-stone-400'
              }`}
            >
              Javobni tasdiqlash
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm hover:bg-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{currentIndex < activeQuestions.length - 1 ? 'Keyingi savol' : 'Natijalarni ko‘rish'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
