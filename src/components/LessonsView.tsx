import React, { useState, useEffect } from 'react';
import { CategoryId, Lesson, GradeLevel } from '../types';
import { CATEGORIES } from '../data/lessonsData';
import {
  BookOpen,
  Calendar,
  User,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  BookCheck,
  ShieldAlert,
  GraduationCap,
} from 'lucide-react';

interface LessonsViewProps {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson | null) => void;
  completedLessons: string[];
  onToggleCompleteLesson: (lessonId: string) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  lessons,
  selectedLesson,
  onSelectLesson,
  completedLessons,
  onToggleCompleteLesson,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLessonTab, setActiveLessonTab] = useState<'content' | 'dates' | 'figures' | 'quiz'>('content');

  // Mini quiz state for selected lesson
  const [miniQuizAnswers, setMiniQuizAnswers] = useState<Record<string, number>>({});
  const [miniQuizSubmitted, setMiniQuizSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset tabs when lesson changes
    setActiveLessonTab('content');
    setMiniQuizAnswers({});
    setMiniQuizSubmitted({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLesson]);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesGrade = selectedGrade === 'all' || lesson.grade === selectedGrade;
    const matchesCat = selectedCategory === 'all' || lesson.categoryId === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesCat && matchesSearch;
  });

  const currentIndex = selectedLesson
    ? lessons.findIndex((l) => l.id === selectedLesson.id)
    : -1;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const isCompleted = selectedLesson ? completedLessons.includes(selectedLesson.id) : false;

  // Mini quiz answer handler
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setMiniQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setMiniQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  // 1. Detailed Lesson View
  if (selectedLesson) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back navigation & Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-800 light:border-stone-300">
          <button
            onClick={() => onSelectLesson(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 light:text-amber-800 light:hover:text-amber-900 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Barcha darslar ro‘yxatiga qaytish</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleCompleteLesson(selectedLesson.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                isCompleted
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50 light:bg-emerald-50 light:text-emerald-800 light:border-emerald-300'
                  : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-500 light:bg-white light:text-stone-700 light:border-stone-300'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-stone-500'}`} />
              <span>{isCompleted ? 'O‘rganildi (Tugallandi)' : 'Tugatilgan deb belgilash'}</span>
            </button>
          </div>
        </div>

        {/* Lesson Header Banner */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-stone-800 light:border-stone-300 bg-stone-900/40 light:bg-white shadow-lg">
          {selectedLesson.image && (
            <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden bg-stone-950">
              <img
                src={selectedLesson.image}
                alt={selectedLesson.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                  {selectedLesson.categoryName}
                </span>
                <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">
                  {selectedLesson.title}
                </h1>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 light:bg-amber-100 light:text-amber-900 light:border-amber-300">
                {selectedLesson.grade === '5-sinf' ? '5-sinf: Tarixdan hikoyalar' : '6-sinf: Qadimgi dunyo tarixi'}
              </span>
              <span className="text-xs font-medium text-amber-400 light:text-amber-800 uppercase tracking-wider">
                {selectedLesson.categoryName}
              </span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 light:text-stone-900 mb-2">
              {selectedLesson.title}
            </h1>

            <p className="text-base text-stone-300 light:text-stone-700 font-serif italic mb-6">
              {selectedLesson.subtitle}
            </p>

            {/* Learning Objectives */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 light:bg-amber-50/70 light:border-amber-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-900 mb-2.5 flex items-center gap-2">
                <BookCheck className="w-4 h-4" />
                <span>Darsning o‘quv maqsadlari:</span>
              </h3>
              <ul className="space-y-1.5">
                {selectedLesson.objectives.map((obj, i) => (
                  <li key={i} className="text-xs sm:text-sm text-stone-300 light:text-stone-700 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Switcher for deep lesson navigation */}
        <div className="flex border-b border-stone-800 light:border-stone-300 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveLessonTab('content')}
            className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeLessonTab === 'content'
                ? 'border-amber-400 text-amber-400 light:border-amber-800 light:text-amber-800 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
            }`}
          >
            Tarixiy sharh va matn
          </button>
          <button
            onClick={() => setActiveLessonTab('dates')}
            className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeLessonTab === 'dates'
                ? 'border-amber-400 text-amber-400 light:border-amber-800 light:text-amber-800 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
            }`}
          >
            Muhim sanalar ({selectedLesson.importantDates.length})
          </button>
          <button
            onClick={() => setActiveLessonTab('figures')}
            className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeLessonTab === 'figures'
                ? 'border-amber-400 text-amber-400 light:border-amber-800 light:text-amber-800 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
            }`}
          >
            Tarixiy shaxslar ({selectedLesson.historicalFigures.length})
          </button>
          <button
            onClick={() => setActiveLessonTab('quiz')}
            className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeLessonTab === 'quiz'
                ? 'border-amber-400 text-amber-400 light:border-amber-800 light:text-amber-800 font-semibold'
                : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Mini-test ({selectedLesson.miniQuiz.length})</span>
          </button>
        </div>

        {/* Tab 1: Content & Explanations */}
        {activeLessonTab === 'content' && (
          <div className="space-y-8">
            {/* Overview & Context */}
            <div className="space-y-4 text-stone-200 light:text-stone-800 leading-relaxed text-base">
              <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-stone-50">
                <h3 className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800 mb-2">
                  Dars muqaddimasi
                </h3>
                <p>{selectedLesson.overview}</p>
              </div>

              <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-stone-50 space-y-4">
                <h3 className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800">
                  Tarixiy rivojlanish jarayoni
                </h3>
                <div className="whitespace-pre-line leading-relaxed">
                  {selectedLesson.historicalContext}
                </div>
              </div>
            </div>

            {/* Facts vs Legends callout (if present) */}
            {selectedLesson.factsVsLegends && (
              <div className="rounded-xl border border-amber-500/30 overflow-hidden bg-stone-900/50 light:bg-amber-50/50">
                <div className="px-5 py-3 bg-amber-500/10 border-b border-amber-500/20 light:bg-amber-100/60 flex items-center gap-2 text-amber-400 light:text-amber-900 font-semibold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Tarixiy fakt va rivoyat o‘rtasidagi farq:</span>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-stone-950/60 border border-stone-800 light:bg-white light:border-stone-200">
                    <span className="text-xs uppercase font-bold text-stone-400 light:text-stone-500 block mb-1">
                      Keng tarqalgan afsona / rivoyat
                    </span>
                    <p className="text-xs sm:text-sm text-stone-300 light:text-stone-700 italic">
                      "{selectedLesson.factsVsLegends.legend}"
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/30 light:bg-emerald-50 light:border-emerald-200">
                    <span className="text-xs uppercase font-bold text-emerald-400 light:text-emerald-800 block mb-1">
                      Arxeologik va ilmiy tasdiqlangan haqiqat
                    </span>
                    <p className="text-xs sm:text-sm text-stone-200 light:text-stone-800 font-medium">
                      {selectedLesson.factsVsLegends.fact}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Facts */}
            <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-stone-50">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>Asosiy faktlar</span>
              </h3>
              <ul className="space-y-2.5">
                {selectedLesson.keyFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-stone-300 light:text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 light:text-amber-800 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-xl border border-stone-700 light:border-stone-300 bg-amber-500/5 light:bg-amber-50/40">
              <h3 className="font-cinzel text-sm font-bold text-amber-400 light:text-amber-800 uppercase tracking-wider mb-2">
                Qisqacha xulosa:
              </h3>
              <p className="text-sm text-stone-200 light:text-stone-800 font-serif italic">
                {selectedLesson.summary}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Important Dates */}
        {activeLessonTab === 'dates' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-stone-50">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800 mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Mavzuning muhim sanalari xronologiyasi</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mb-4">
                Ushbu sanalar imtihonlar va testlarda eng ko‘p uchraydigan muhim burilish nuqtalaridir.
              </p>

              <div className="space-y-3">
                {selectedLesson.importantDates.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="font-cinzel text-base font-bold text-amber-400 light:text-amber-800 shrink-0 sm:w-48">
                      {item.year}
                    </div>
                    <div className="text-sm text-stone-200 light:text-stone-800 grow">
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Historical Figures */}
        {activeLessonTab === 'figures' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-stone-50">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800 mb-1 flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Davrning buyuk tarixiy shaxslari</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mb-4">
                Siyosiy arboblar, sarkardalar va dunyo taraqqiyotiga hissa qo‘shgan mutafakkirlar.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedLesson.historicalFigures.map((fig, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/70 light:bg-white space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900">
                        {fig.name}
                      </h4>
                      <span className="text-xs font-semibold text-amber-400 light:text-amber-800 shrink-0">
                        {fig.period}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-amber-400/90 light:text-amber-800 uppercase tracking-wider">
                      {fig.role}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 light:text-stone-600 leading-relaxed">
                      {fig.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: End-of-Lesson Mini Quiz */}
        {activeLessonTab === 'quiz' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-stone-50">
              <h3 className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800 mb-1 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                <span>Dars yakunidagi bilimlarni tekshirish mini-testi</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mb-6">
                Har bir savolga javob berib, darsni qay darajada o‘zlashtirganingizni sinab ko‘ring.
              </p>

              <div className="space-y-6">
                {selectedLesson.miniQuiz.map((q, qIndex) => {
                  const isSubmitted = miniQuizSubmitted[q.id];
                  const chosenAnswer = miniQuizAnswers[q.id];
                  const isCorrect = chosenAnswer === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/70 light:bg-white space-y-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold text-amber-400 light:text-amber-800 bg-amber-500/10 px-2 py-0.5 rounded">
                          {qIndex + 1}-savol
                        </span>
                        <h4 className="text-sm sm:text-base font-semibold text-stone-100 light:text-stone-900">
                          {q.question}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {q.options.map((option, optIdx) => {
                          let btnStyle =
                            'border-stone-800 bg-stone-900 text-stone-200 hover:border-amber-500/50 light:border-stone-200 light:bg-stone-50 light:text-stone-800 light:hover:border-amber-700/50';

                          if (isSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              btnStyle =
                                'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-semibold light:bg-emerald-50 light:text-emerald-900 light:border-emerald-600';
                            } else if (optIdx === chosenAnswer && !isCorrect) {
                              btnStyle =
                                'border-red-500 bg-red-950/50 text-red-300 light:bg-red-50 light:text-red-900 light:border-red-600';
                            } else {
                              btnStyle =
                                'border-stone-900 bg-stone-950/40 text-stone-500 opacity-60 light:border-stone-200 light:bg-stone-100 light:text-stone-400';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isSubmitted}
                              onClick={() => handleAnswerSelect(q.id, optIdx)}
                              className={`p-3 rounded-lg border text-left text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                            >
                              <span className="font-semibold mr-1.5">{String.fromCharCode(65 + optIdx)})</span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div
                          className={`p-3 rounded-lg text-xs leading-relaxed mt-2 ${
                            isCorrect
                              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 light:bg-emerald-50 light:text-emerald-900 light:border-emerald-200'
                              : 'bg-red-950/40 text-red-300 border border-red-800/40 light:bg-red-50 light:text-red-900 light:border-red-200'
                          }`}
                        >
                          <span className="font-bold mr-1">
                            {isCorrect ? 'To‘g‘ri javob!' : 'Noto‘g‘ri javob.'}
                          </span>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Previous Lesson and Next Lesson Navigation */}
        <div className="mt-12 pt-6 border-t border-stone-800 light:border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevLesson ? (
            <button
              onClick={() => onSelectLesson(prevLesson)}
              className="w-full sm:w-auto p-3.5 rounded-xl border border-stone-800 light:border-stone-300 bg-stone-900/60 light:bg-white hover:border-amber-500 light:hover:border-amber-800 transition-colors flex items-center gap-3 text-left group cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-amber-400 light:text-amber-800 shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 light:text-stone-500 block">
                  Oldingi dars
                </span>
                <span className="text-xs sm:text-sm font-semibold text-stone-100 light:text-stone-900 line-clamp-1">
                  {prevLesson.title}
                </span>
              </div>
            </button>
          ) : (
            <div className="w-full sm:w-auto" />
          )}

          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson)}
              className="w-full sm:w-auto p-3.5 rounded-xl border border-stone-800 light:border-stone-300 bg-stone-900/60 light:bg-white hover:border-amber-500 light:hover:border-amber-800 transition-colors flex items-center justify-end gap-3 text-right group cursor-pointer"
            >
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 light:text-stone-500 block">
                  Keyingi dars
                </span>
                <span className="text-xs sm:text-sm font-semibold text-stone-100 light:text-stone-900 line-clamp-1">
                  {nextLesson.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-amber-400 light:text-amber-800 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2. All Lessons Catalog View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h2 className="font-cinzel text-3xl font-bold text-stone-100 light:text-stone-900">
          Tarix darslari dasturi
        </h2>
        <p className="text-sm text-stone-400 light:text-stone-600 mt-1">
          5-sinf ("Tarixdan hikoyalar") va 6-sinf ("Qadimgi dunyo tarixi") maktab darsliklari asosida tuzilgan.
        </p>
      </div>

      {/* Prominent Grade Selector: 5-sinf vs 6-sinf */}
      <div className="mb-8 p-1.5 rounded-2xl bg-stone-900/90 light:bg-stone-200/80 border border-stone-800 light:border-stone-300 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
        <button
          onClick={() => setSelectedGrade('5-sinf')}
          className={`p-3 rounded-xl text-left sm:text-center transition-all cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
            selectedGrade === '5-sinf'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'text-stone-300 light:text-stone-700 hover:bg-stone-800 light:hover:bg-stone-100 font-semibold'
          }`}
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">5-sinf darslari</span>
          </div>
          <span className={`text-[11px] ${selectedGrade === '5-sinf' ? 'text-stone-900/80' : 'text-stone-400 light:text-stone-500'}`}>
            Tarixdan hikoyalar ({lessons.filter((l) => l.grade === '5-sinf').length} ta dars)
          </span>
        </button>

        <button
          onClick={() => setSelectedGrade('6-sinf')}
          className={`p-3 rounded-xl text-left sm:text-center transition-all cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
            selectedGrade === '6-sinf'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'text-stone-300 light:text-stone-700 hover:bg-stone-800 light:hover:bg-stone-100 font-semibold'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">6-sinf darslari</span>
          </div>
          <span className={`text-[11px] ${selectedGrade === '6-sinf' ? 'text-stone-900/80' : 'text-stone-400 light:text-stone-500'}`}>
            Qadimgi dunyo tarixi ({lessons.filter((l) => l.grade === '6-sinf').length} ta dars)
          </span>
        </button>

        <button
          onClick={() => setSelectedGrade('all')}
          className={`p-3 rounded-xl text-left sm:text-center transition-all cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
            selectedGrade === 'all'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'text-stone-300 light:text-stone-700 hover:bg-stone-800 light:hover:bg-stone-100 font-semibold'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookCheck className="w-4 h-4" />
            <span className="text-sm">Barcha darslar</span>
          </div>
          <span className={`text-[11px] ${selectedGrade === 'all' ? 'text-stone-900/80' : 'text-stone-400 light:text-stone-500'}`}>
            5- va 6-sinf umumiy ({lessons.length} ta dars)
          </span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-stone-950 border-amber-400'
              : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-600 light:bg-stone-100 light:text-stone-700 light:border-stone-300'
          }`}
        >
          Barcha mavzular ({filteredLessons.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-stone-950 border-amber-400'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-600 light:bg-stone-100 light:text-stone-700 light:border-stone-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Input Filter */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mavzular bo‘yicha izlash..."
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-stone-900 text-stone-100 border border-stone-800 light:bg-white light:text-stone-900 light:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const completed = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className="rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/50 light:bg-white hover:border-amber-500/50 light:hover:border-amber-700/50 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Thumbnail */}
                  {lesson.image ? (
                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-stone-950">
                      <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-stone-950 shadow">
                          {lesson.grade}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        {completed && (
                          <span className="p-1.5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shadow">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-b border-stone-800 light:border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 light:bg-amber-100 light:text-amber-900">
                          {lesson.grade}
                        </span>
                        <span className="text-xs text-amber-400 light:text-amber-800 font-semibold uppercase">
                          {lesson.categoryName}
                        </span>
                      </div>
                      {completed && (
                        <span className="p-1 rounded-full bg-emerald-500 text-stone-950">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-amber-400 light:text-amber-800 uppercase tracking-wider">
                        {lesson.categoryName}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 light:bg-stone-200 light:text-stone-700 font-semibold">
                        {lesson.grade}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-400 light:group-hover:text-amber-800 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 light:text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-800/60 light:border-stone-100 mt-4 flex items-center justify-between text-xs text-stone-400 light:text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>~{lesson.readingTimeMinutes} daqiqa mutolaa</span>
                  </span>
                  <span className="text-amber-400 light:text-amber-800 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Darsni ochish</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center border border-stone-800 light:border-stone-200 rounded-xl bg-stone-900/30">
          <BookOpen className="w-8 h-8 mx-auto text-stone-500 mb-2" />
          <p className="text-stone-300 light:text-stone-700 font-medium text-sm">
            Mos keluvchi darslar topilmadi.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-amber-400 light:text-amber-800 underline cursor-pointer"
          >
            Barcha darslarni ko‘rsatish
          </button>
        </div>
      )}
    </div>
  );
};
