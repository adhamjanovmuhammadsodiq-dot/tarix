import React, { useState, useMemo } from 'react';
import {
  ROMAN_SYMBOLS,
  ROMAN_RULES_EXAMPLES,
  ROMAN_CENTURIES,
  ROMAN_KEY_GROUPS,
  getAll1to100,
  arabicToRoman,
  romanToArabic,
  generatePracticeQuestion,
  RomanPracticeItem,
} from '../utils/romanNumerals';
import {
  Hash,
  ArrowRightLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Flame,
  Search,
  Calendar,
  Layers,
  Copy,
  Check,
} from 'lucide-react';

interface RomanNumeralsViewProps {
  onUpdateStats: (isCorrect: boolean) => void;
  stats: {
    solvedCount: number;
    correctCount: number;
    streak: number;
    bestStreak: number;
  };
}

export const RomanNumeralsView: React.FC<RomanNumeralsViewProps> = ({
  onUpdateStats,
  stats,
}) => {
  // Navigation tabs within Roman module
  const [activeSubTab, setActiveSubTab] = useState<'chart' | 'centuries' | 'converter' | 'groups' | 'practice'>('chart');

  // Converter States
  const [converterMode, setConverterMode] = useState<'arabicToRoman' | 'romanToArabic'>('arabicToRoman');
  const [arabicInput, setArabicInput] = useState<string>('2026');
  const [romanInput, setRomanInput] = useState<string>('MMXXVI');

  // Table 1-100 search state
  const [tableSearch, setTableSearch] = useState<string>('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Exercise States
  const [difficulty, setDifficulty] = useState<'oson' | 'orta' | 'qiyin'>('oson');
  const [currentQuestion, setCurrentQuestion] = useState<RomanPracticeItem>(() =>
    generatePracticeQuestion('oson')
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Conversion calculations
  const arabicNum = parseInt(arabicInput, 10);
  const arabicConversion = arabicInput.trim() !== '' ? arabicToRoman(arabicNum) : null;
  const romanConversion = romanInput.trim() !== '' ? romanToArabic(romanInput) : null;

  // 1 to 100 table list
  const full1to100List = useMemo(() => getAll1to100(), []);

  const filtered1to100List = useMemo(() => {
    if (!tableSearch.trim()) return full1to100List;
    const q = tableSearch.trim().toUpperCase();
    return full1to100List.filter(
      (item) => String(item.arabic).includes(q) || item.roman.includes(q)
    );
  }, [full1to100List, tableSearch]);

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNumber(text);
      setTimeout(() => setCopiedNumber(null), 1500);
    }
  };

  // Practice handlers
  const handleNextQuestion = () => {
    setCurrentQuestion(generatePracticeQuestion(difficulty));
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleDifficultyChange = (diff: 'oson' | 'orta' | 'qiyin') => {
    setDifficulty(diff);
    setCurrentQuestion(generatePracticeQuestion(diff));
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleSelectAnswer = (option: string | number) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = String(option) === String(currentQuestion.correctAnswer);
    onUpdateStats(isCorrect);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 light:text-amber-800 mb-2">
          <Hash className="w-4 h-4" />
          <span>5- va 6-sinf uchun maxsus qo‘llanma</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
          Rim raqamlari ensiklopediyasi
        </h2>
        <p className="text-sm sm:text-base text-stone-400 light:text-stone-600 mt-2 max-w-3xl leading-relaxed">
          1 dan 100 gacha to‘liq jadval, I asrdan XXI asrgacha tarixiy asrlar hisobi, barcha sonlar
          guruhlari (birliklar, o‘nliklar, yuzliklar, mingliklar), konverter va interaktiv mashqlar.
        </p>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-stone-800 light:border-stone-300 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSubTab('chart')}
          className={`py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'chart'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>1 dan 100 gacha to‘liq jadval</span>
        </button>

        <button
          onClick={() => setActiveSubTab('centuries')}
          className={`py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'centuries'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Asrlar jadvali (I – XXI asr)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('groups')}
          className={`py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'groups'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Barcha son guruhlari (1 – 3999)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('converter')}
          className={`py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'converter'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Ikki tomonlama konverter</span>
        </button>

        <button
          onClick={() => setActiveSubTab('practice')}
          className={`py-3 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'practice'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Amaliy testlar ({stats.solvedCount})</span>
        </button>
      </div>

      {/* 7 Core Symbols Banner */}
      <div className="p-5 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-white space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Asosiy 7 ta poydevor belgi:</span>
          </span>
          <span className="text-[11px] text-stone-400 light:text-stone-600">
            Bosib konverterda sinab ko‘ring
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {ROMAN_SYMBOLS.map((item) => (
            <div
              key={item.symbol}
              onClick={() => {
                setRomanInput(item.symbol);
                setConverterMode('romanToArabic');
                setActiveSubTab('converter');
              }}
              className="p-3 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 hover:border-amber-500/50 light:hover:border-amber-700/50 transition-all text-center group cursor-pointer"
            >
              <div className="font-cinzel text-2xl font-bold text-amber-400 light:text-amber-800 group-hover:scale-110 transition-transform">
                {item.symbol}
              </div>
              <div className="font-mono text-base font-bold text-stone-100 light:text-stone-900 mt-0.5">
                = {item.value}
              </div>
              <div className="text-[10px] text-stone-400 light:text-stone-500 mt-0.5">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: 1 dan 100 gacha to'liq jadval ("Hamma rimraqamlari") */}
      {activeSubTab === 'chart' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <Hash className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>1 dan 100 gacha bo‘lgan barcha Rim raqamlari</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                Har qanday sonni qidiring yoki bosib nusxa oling.
              </p>
            </div>

            {/* Table Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Qidiruv: 49, XLIX, 99..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-stone-950 text-stone-100 border border-stone-800 light:bg-stone-50 light:text-stone-900 light:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
              />
            </div>
          </div>

          {/* Grid of 1-100 numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
            {filtered1to100List.map((item) => (
              <div
                key={item.arabic}
                onClick={() => handleCopy(item.roman)}
                className="p-2.5 rounded-lg border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 hover:border-amber-500/50 light:hover:border-amber-700/50 transition-all text-center group cursor-pointer relative"
                title={`${item.arabic} = ${item.roman} (Nusxa olish uchun bosing)`}
              >
                <div className="text-[10px] text-stone-400 light:text-stone-500 font-mono">
                  {item.arabic}
                </div>
                <div className="font-cinzel text-sm sm:text-base font-bold text-amber-400 light:text-amber-800 mt-0.5 group-hover:scale-105 transition-transform">
                  {item.roman}
                </div>
                <div className="text-[9px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedNumber === item.roman ? 'Nusxalandi!' : 'nusxa'}
                </div>
              </div>
            ))}
          </div>

          {filtered1to100List.length === 0 && (
            <div className="p-8 text-center text-xs text-stone-400">
              "{tableSearch}" bo‘yicha natija topilmadi.
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: Asrlar jadvali (I - XXI asrlar) */}
      {activeSubTab === 'centuries' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400 light:text-amber-800" />
              <span>Tarix darslarida asrlar va Rim raqamlari (I asrdan XXI asrgacha)</span>
            </h3>
            <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
              5-sinf va 6-sinf tarix darslarida asrlar har doim Rim raqamlari bilan belgilanadi.
              Masalan: XIV asr — Sohibqiron Amir Temur davri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ROMAN_CENTURIES.map((c) => (
              <div
                key={c.centuryRoman}
                className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-lg font-bold text-amber-400 light:text-amber-800">
                    {c.centuryRoman}
                  </span>
                  <span className="text-xs font-mono font-semibold text-stone-300 light:text-stone-700 bg-stone-900 light:bg-stone-200 px-2 py-0.5 rounded">
                    {c.yearsSpan}
                  </span>
                </div>
                <p className="text-xs text-stone-300 light:text-stone-600 leading-relaxed">
                  {c.historicalEra}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Barcha asosiy guruhlar (Birliklar, O'nliklar, Yuzliklar, Mingliklar) */}
      {activeSubTab === 'groups' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400 light:text-amber-800" />
              <span>Barcha son toifalari matritsasi (1 dan 3999 gacha)</span>
            </h3>
            <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
              Rim raqamlari quyidagi 4 asosiy xona birliklarining ketma-ket ulanishidan hosil bo‘ladi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROMAN_KEY_GROUPS.map((group) => (
              <div
                key={group.name}
                className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800">
                  {group.name}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {group.items.map((it) => (
                    <div
                      key={it.arabic}
                      className="p-2 rounded-lg bg-stone-900 light:bg-white border border-stone-800 light:border-stone-200 text-center"
                    >
                      <div className="text-[10px] text-stone-400 light:text-stone-500 font-mono">
                        {it.arabic}
                      </div>
                      <div className="font-cinzel text-sm font-bold text-stone-100 light:text-stone-900">
                        {it.roman}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Rules and Examples reference */}
          <div className="pt-4 border-t border-stone-800 light:border-stone-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800">
              Qoidalar va namunalar:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {ROMAN_RULES_EXAMPLES.map((ex) => (
                <div
                  key={ex.roman}
                  className="p-3 rounded-lg border border-stone-800 light:border-stone-200 bg-stone-950 light:bg-stone-50 text-xs"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-cinzel text-amber-400 light:text-amber-800 text-sm">
                      {ex.roman}
                    </span>
                    <span className="font-mono">{ex.arabic}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 light:text-stone-600 mt-1">
                    {ex.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Ikki tomonlama konverter */}
      {activeSubTab === 'converter' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>Ikki tomonlama aniq konverter (1 dan 3999 gacha)</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                Noto‘g‘ri yozuvlar tekshiriladi va xatolik sababi tushuntiriladi.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-stone-950 light:bg-stone-200 border border-stone-800 light:border-stone-300">
              <button
                onClick={() => setConverterMode('arabicToRoman')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  converterMode === 'arabicToRoman'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 light:text-stone-700 hover:text-stone-100'
                }`}
              >
                Arab → Rim
              </button>
              <button
                onClick={() => setConverterMode('romanToArabic')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  converterMode === 'romanToArabic'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 light:text-stone-700 hover:text-stone-100'
                }`}
              >
                Rim → Arab
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {converterMode === 'arabicToRoman' ? (
              <>
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 light:text-stone-700">
                    Arab raqamini kiriting (1 dan 3999 gacha):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3999"
                    value={arabicInput}
                    onChange={(e) => setArabicInput(e.target.value)}
                    placeholder="Masalan: 2026, 49, 999..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-100 font-mono text-xl border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 light:bg-stone-50 light:text-stone-900 light:border-stone-300"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs text-stone-400 light:text-stone-500 mr-1">Namunalar:</span>
                    {[4, 9, 14, 40, 90, 400, 900, 2026].map((num) => (
                      <button
                        key={num}
                        onClick={() => setArabicInput(String(num))}
                        className="px-2 py-0.5 text-xs rounded bg-stone-800 text-amber-300 hover:bg-stone-700 light:bg-stone-200 light:text-amber-900 cursor-pointer"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/80 light:bg-stone-50 flex flex-col justify-center">
                  <div className="text-xs uppercase tracking-wider text-stone-400 light:text-stone-500 font-semibold mb-1">
                    Rim raqamidagi ifodasi:
                  </div>
                  {arabicConversion?.success ? (
                    <div>
                      <div className="font-cinzel text-3xl sm:text-4xl font-bold text-amber-400 light:text-amber-800 break-all">
                        {arabicConversion.result}
                      </div>
                      <div className="text-xs text-stone-400 light:text-stone-600 mt-2">
                        {arabicNum} soni Rim yozuvida to‘g‘ri ifodalandi.
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs light:bg-red-50 light:text-red-800 light:border-red-200">
                      {arabicConversion?.error || 'Son kiriting.'}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 light:text-stone-700">
                    Rim raqamini kiriting:
                  </label>
                  <input
                    type="text"
                    value={romanInput}
                    onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
                    placeholder="Masalan: MMXXVI, XIV, CD..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 text-stone-100 font-cinzel text-xl uppercase tracking-wider border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 light:bg-stone-50 light:text-stone-900 light:border-stone-300"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs text-stone-400 light:text-stone-500 mr-1">Namunalar:</span>
                    {['IV', 'IX', 'XIV', 'XL', 'XC', 'CD', 'CM', 'MMXXVI'].map((rom) => (
                      <button
                        key={rom}
                        onClick={() => setRomanInput(rom)}
                        className="px-2 py-0.5 text-xs rounded bg-stone-800 text-amber-300 hover:bg-stone-700 light:bg-stone-200 light:text-amber-900 font-cinzel cursor-pointer"
                      >
                        {rom}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/80 light:bg-stone-50 flex flex-col justify-center">
                  <div className="text-xs uppercase tracking-wider text-stone-400 light:text-stone-500 font-semibold mb-1">
                    Arab raqamidagi qiymati:
                  </div>
                  {romanConversion?.success ? (
                    <div>
                      <div className="font-mono text-3xl sm:text-4xl font-bold text-amber-400 light:text-amber-800">
                        = {romanConversion.result?.toLocaleString()}
                      </div>
                      {romanConversion.breakdown && (
                        <div className="text-xs text-stone-300 light:text-stone-600 mt-2 font-mono bg-stone-900/60 light:bg-white p-2 rounded border border-stone-800 light:border-stone-200">
                          Hisoblash tartibi: {romanConversion.breakdown}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs light:bg-red-50 light:text-red-800 light:border-red-200 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Xatolik:</span>
                      </div>
                      <div>{romanConversion?.error || 'Rim raqamini kiriting.'}</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Amaliy mashqlar va testlar */}
      {activeSubTab === 'practice' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800 light:border-stone-200">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>Interaktiv Rim raqamlari mashqlari</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                Tasodifiy savollarga javob berib, ball va ketma-ketlik to‘plang.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 light:text-amber-900 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Streak: {stats.streak}</span>
              </div>

              <div className="inline-flex p-1 rounded-lg bg-stone-950 light:bg-stone-200 border border-stone-800 light:border-stone-300">
                <button
                  onClick={() => handleDifficultyChange('oson')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                    difficulty === 'oson' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 light:text-stone-700'
                  }`}
                >
                  Oson
                </button>
                <button
                  onClick={() => handleDifficultyChange('orta')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                    difficulty === 'orta' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 light:text-stone-700'
                  }`}
                >
                  O‘rtacha
                </button>
                <button
                  onClick={() => handleDifficultyChange('qiyin')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                    difficulty === 'qiyin' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 light:text-stone-700'
                  }`}
                >
                  Qiyin
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/70 light:bg-stone-50 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 light:text-amber-800 tracking-wider">
                {currentQuestion.type === 'toArabic'
                  ? 'Rim raqamining arabcha qiymatini toping:'
                  : 'Arab sonining Rimcha yozilishini toping:'}
              </span>
              <div className="font-cinzel text-4xl sm:text-5xl font-bold text-stone-100 light:text-stone-900">
                {currentQuestion.type === 'toArabic' ? currentQuestion.roman : currentQuestion.arabic}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = String(option) === String(currentQuestion.correctAnswer);

                let btnStyle =
                  'border-stone-800 bg-stone-900 text-stone-200 hover:border-amber-500 light:border-stone-200 light:bg-white light:text-stone-900 light:hover:border-amber-700';

                if (isAnswered) {
                  if (isCorrectAnswer) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold light:bg-emerald-50 light:text-emerald-900 light:border-emerald-600';
                  } else if (isSelected && !isCorrectAnswer) {
                    btnStyle =
                      'border-red-500 bg-red-950/60 text-red-300 font-bold light:bg-red-50 light:text-red-900 light:border-red-600';
                  } else {
                    btnStyle = 'opacity-40 border-stone-900 bg-stone-950 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(option)}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-cinzel text-lg ${btnStyle}`}
                  >
                    {String(option)}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="max-w-xl mx-auto space-y-4">
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
                    String(selectedAnswer) === String(currentQuestion.correctAnswer)
                      ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300 light:bg-emerald-50 light:border-emerald-200 light:text-emerald-900'
                      : 'bg-red-950/40 border-red-800/40 text-red-300 light:bg-red-50 light:border-red-200 light:text-red-900'
                  }`}
                >
                  {String(selectedAnswer) === String(currentQuestion.correctAnswer) ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold mb-1">
                      {String(selectedAnswer) === String(currentQuestion.correctAnswer)
                        ? 'Barakalla! To‘g‘ri javob.'
                        : 'Afsuski, javob noto‘g‘ri.'}
                    </div>
                    <div>{currentQuestion.explanation}</div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-semibold text-xs sm:text-sm hover:bg-amber-400 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Keyingi savolga o‘tish</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
