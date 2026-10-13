import React, { useState, useMemo } from 'react';
import {
  ROMAN_SYMBOLS,
  ROMAN_RULES_EXAMPLES,
  ROMAN_CENTURIES,
  ROMAN_KEY_GROUPS,
  FAMOUS_HISTORICAL_YEARS,
  getAll1to100,
  getRomanRange,
  getDecompositionString,
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
  Compass,
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

type SubTab =
  | 'chart'
  | 'allNumbers'
  | 'historyYears'
  | 'centuries'
  | 'groups'
  | 'converter'
  | 'practice';

export const RomanNumeralsView: React.FC<RomanNumeralsViewProps> = ({
  onUpdateStats,
  stats,
}) => {
  // Navigation tabs within Roman module
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('chart');

  // Converter States
  const [converterMode, setConverterMode] = useState<'arabicToRoman' | 'romanToArabic'>('arabicToRoman');
  const [arabicInput, setArabicInput] = useState<string>('2026');
  const [romanInput, setRomanInput] = useState<string>('MMXXVI');

  // Table 1-100 search state
  const [tableSearch, setTableSearch] = useState<string>('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Range Browser (All Roman Numerals 1 to 3999)
  const [rangePreset, setRangePreset] = useState<string>('1-100');
  const [customStart, setCustomStart] = useState<number>(1);
  const [customEnd, setCustomEnd] = useState<number>(100);
  const [rangeSearch, setRangeSearch] = useState<string>('');

  // History Years search state
  const [historySearch, setHistorySearch] = useState<string>('');

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

  // Active Range calculation
  const activeRangeBounds = useMemo(() => {
    switch (rangePreset) {
      case '1-100':
        return { start: 1, end: 100 };
      case '101-200':
        return { start: 101, end: 200 };
      case '201-300':
        return { start: 201, end: 300 };
      case '301-500':
        return { start: 301, end: 500 };
      case '501-1000':
        return { start: 501, end: 1000 };
      case '1000-1500':
        return { start: 1000, end: 1500 };
      case '1501-2026':
        return { start: 1501, end: 2026 };
      case '2000-3000':
        return { start: 2000, end: 3000 };
      case '3000-3999':
        return { start: 3000, end: 3999 };
      case 'custom':
        return {
          start: Math.max(1, Math.min(3999, customStart || 1)),
          end: Math.max(1, Math.min(3999, customEnd || 100)),
        };
      default:
        return { start: 1, end: 100 };
    }
  }, [rangePreset, customStart, customEnd]);

  const currentRangeItems = useMemo(() => {
    const s = Math.min(activeRangeBounds.start, activeRangeBounds.end);
    const e = Math.min(3999, Math.max(activeRangeBounds.start, activeRangeBounds.end));
    // Limit to max 300 items at a time to keep UI snappy
    const safeEnd = Math.min(e, s + 299);
    return getRomanRange(s, safeEnd);
  }, [activeRangeBounds]);

  const filteredRangeItems = useMemo(() => {
    if (!rangeSearch.trim()) return currentRangeItems;
    const q = rangeSearch.trim().toUpperCase();
    return currentRangeItems.filter(
      (item) =>
        String(item.arabic).includes(q) ||
        item.roman.includes(q) ||
        item.breakdown.toUpperCase().includes(q)
    );
  }, [currentRangeItems, rangeSearch]);

  // Filtered History Years
  const filteredHistoryYears = useMemo(() => {
    if (!historySearch.trim()) return FAMOUS_HISTORICAL_YEARS;
    const q = historySearch.trim().toLowerCase();
    return FAMOUS_HISTORICAL_YEARS.filter(
      (item) =>
        String(item.year).includes(q) ||
        item.roman.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.era.toLowerCase().includes(q)
    );
  }, [historySearch]);

  const handleCopy = (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedNumber(text);
      setTimeout(() => setCopiedNumber(null), 1500);
    } catch {
      setCopiedNumber(text);
      setTimeout(() => setCopiedNumber(null), 1500);
    }
  };

  const handleOpenInConverter = (num: number) => {
    setArabicInput(String(num));
    setConverterMode('arabicToRoman');
    setActiveSubTab('converter');
    window.scrollTo({ top: 300, behavior: 'smooth' });
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
          <span>5- va 6-sinf tarixi uchun mukammal qo‘llanma</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
          Rim raqamlari ensiklopediyasi
        </h2>
        <p className="text-sm sm:text-base text-stone-400 light:text-stone-600 mt-2 max-w-3xl leading-relaxed">
          1 dan 3999 gacha bo‘lgan barcha Rim raqamlari jadvali, 1–100 asosiy ro‘yxat, tarixiy
          sanalar, I asrdan XXI asrgacha asrlar hisobi, ikki tomonlama konverter va testlar.
        </p>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-stone-800 light:border-stone-300 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSubTab('chart')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'chart'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>1–100 jadvali</span>
        </button>

        <button
          onClick={() => setActiveSubTab('allNumbers')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'allNumbers'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Barcha Rim raqamlari (1–3999)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('historyYears')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'historyYears'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Tarixiy yillar</span>
        </button>

        <button
          onClick={() => setActiveSubTab('centuries')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'centuries'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Asrlar (I–XXI)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('groups')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'groups'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Son guruhlari</span>
        </button>

        <button
          onClick={() => setActiveSubTab('converter')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'converter'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Konverter</span>
        </button>

        <button
          onClick={() => setActiveSubTab('practice')}
          className={`py-3 px-3.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'practice'
              ? 'border-amber-400 text-amber-400 bg-stone-900/40 light:bg-stone-100 light:border-amber-800 light:text-amber-800'
              : 'border-transparent text-stone-400 hover:text-stone-200 light:text-stone-600 light:hover:text-stone-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Testlar ({stats.solvedCount})</span>
        </button>
      </div>

      {/* 7 Core Symbols Banner */}
      <div className="p-5 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/30 light:bg-white space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Asosiy 7 ta Rim raqami:</span>
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

      {/* SUB-TAB 1: 1 dan 100 gacha to'liq jadval */}
      {activeSubTab === 'chart' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <Hash className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>1 dan 100 gacha bo‘lgan barcha Rim raqamlari</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                Har bir sonning Rim raqami ko‘rinishi. Bosib nusxa olishingiz mumkin.
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

      {/* SUB-TAB 2: BARCHA RIM RAQAMLARI (1–3999 oralig'i va qidiruv tizimi) */}
      {activeSubTab === 'allNumbers' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>Barcha Rim raqamlari katalogi (1 dan 3999 gacha)</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                Har qanday son oralig‘ini tanlang, formulasi va qanday yasalganini ko‘ring.
              </p>
            </div>

            {/* Range Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={rangeSearch}
                onChange={(e) => setRangeSearch(e.target.value)}
                placeholder="Son, Rim raqami yoki xona (masalan: 1994, MCDXCII)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-stone-950 text-stone-100 border border-stone-800 light:bg-stone-50 light:text-stone-900 light:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
              />
            </div>
          </div>

          {/* Quick Range Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800 block">
              Oraliqni tanlang:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: '1-100', label: '1 – 100' },
                { id: '101-200', label: '101 – 200' },
                { id: '201-300', label: '201 – 300' },
                { id: '301-500', label: '301 – 500' },
                { id: '501-1000', label: '501 – 1000' },
                { id: '1000-1500', label: '1000 – 1500' },
                { id: '1501-2026', label: '1501 – 2026' },
                { id: '2000-3000', label: '2000 – 3000' },
                { id: '3000-3999', label: '3000 – 3999' },
                { id: 'custom', label: 'O‘zingiz kiriting ✍️' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setRangePreset(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    rangePreset === p.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                      : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:border-amber-500/40 light:bg-stone-100 light:text-stone-700 light:border-stone-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Range Inputs if custom selected */}
          {rangePreset === 'custom' && (
            <div className="p-4 rounded-xl border border-stone-800 light:border-stone-300 bg-stone-950/50 light:bg-stone-50 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-stone-300 light:text-stone-700">
                Oraliq chegarasi (1 dan 3999 gacha):
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="3999"
                  value={customStart}
                  onChange={(e) => setCustomStart(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-24 px-2.5 py-1 text-xs rounded-lg bg-stone-900 border border-stone-700 text-white light:bg-white light:text-black light:border-stone-300"
                  placeholder="Dan"
                />
                <span className="text-xs text-stone-400">—</span>
                <input
                  type="number"
                  min="1"
                  max="3999"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(Math.min(3999, parseInt(e.target.value, 10) || 100))}
                  className="w-24 px-2.5 py-1 text-xs rounded-lg bg-stone-900 border border-stone-700 text-white light:bg-white light:text-black light:border-stone-300"
                  placeholder="Gacha"
                />
              </div>
              <span className="text-[11px] text-stone-400 light:text-stone-500">
                (Tezkor ishlash uchun bir vaqtda 300 tagacha ko‘rsatiladi)
              </span>
            </div>
          )}

          {/* Numbers list in current range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredRangeItems.map((item) => (
              <div
                key={item.arabic}
                className="p-3.5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-stone-400 light:text-stone-500">
                      {item.arabic}
                    </span>
                    <div className="font-cinzel text-lg sm:text-xl font-bold text-amber-400 light:text-amber-800 mt-0.5">
                      {item.roman}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(item.roman)}
                    className="p-1.5 rounded-md hover:bg-stone-800 light:hover:bg-stone-200 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
                    title="Nusxa olish"
                  >
                    {copiedNumber === item.roman ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-stone-900 light:border-stone-200 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 light:text-stone-500 truncate" title={item.breakdown}>
                    {item.breakdown}
                  </span>
                  <button
                    onClick={() => handleOpenInConverter(item.arabic)}
                    className="text-[10px] text-amber-400 light:text-amber-800 hover:underline shrink-0 ml-1 cursor-pointer"
                  >
                    Sinash
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredRangeItems.length === 0 && (
            <div className="p-8 text-center text-xs text-stone-400">
              "{rangeSearch}" bo‘yicha hech narsa topilmadi.
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: TARIXIY YILLAR RIM RAQAMLARIDA */}
      {activeSubTab === 'historyYears' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>Tarix darslarida eng muhim yillar va ularning Rim raqamlari</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                5- va 6-sinf tarix darsliklarida uchraydigan muhim sanalar.
              </p>
            </div>

            {/* History Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Yil yoki shaxsni izlash (1336, Temur)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-stone-950 text-stone-100 border border-stone-800 light:bg-stone-50 light:text-stone-900 light:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHistoryYears.map((item) => (
              <div
                key={item.year + item.roman}
                className="p-4 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-950/60 light:bg-stone-50 space-y-2 relative group hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800">
                    {item.era}
                  </span>
                  <button
                    onClick={() => handleCopy(item.roman)}
                    className="p-1 rounded hover:bg-stone-800 light:hover:bg-stone-200 text-stone-400 hover:text-amber-300 cursor-pointer"
                    title="Rim raqamini nusxalash"
                  >
                    {copiedNumber === item.roman ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl font-bold text-stone-100 light:text-stone-900">
                    {item.year}-yil
                  </span>
                  <span className="text-stone-500 font-cinzel">=</span>
                  <span className="font-cinzel text-xl font-bold text-amber-400 light:text-amber-800">
                    {item.roman}
                  </span>
                </div>

                <p className="text-xs text-stone-300 light:text-stone-700 leading-relaxed font-medium">
                  {item.title}
                </p>

                <div className="pt-2 border-t border-stone-900 light:border-stone-200 text-[11px] text-stone-400 light:text-stone-500 flex items-center justify-between">
                  <span>{getDecompositionString(item.year)}</span>
                  <button
                    onClick={() => handleOpenInConverter(item.year)}
                    className="text-amber-400 light:text-amber-800 hover:underline cursor-pointer"
                  >
                    Konverterda ko‘rish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Asrlar jadvali (I - XXI asrlar) */}
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

      {/* SUB-TAB 5: Barcha asosiy guruhlar (Birliklar, O'nliklar, Yuzliklar, Mingliklar) */}
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
                      <div className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900">
                        {it.roman}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Roman Rules Showcase */}
          <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/5 light:bg-amber-50/70 light:border-amber-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Rim raqamlari yozilish qoidalari va namunalar:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ROMAN_RULES_EXAMPLES.map((ex) => (
                <div
                  key={ex.roman}
                  className="p-3 rounded-lg bg-stone-950/70 light:bg-white border border-stone-800 light:border-stone-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-base font-bold text-amber-400 light:text-amber-800">
                      {ex.roman}
                    </span>
                    <span className="font-mono text-xs font-bold text-stone-200 light:text-stone-800">
                      = {ex.arabic}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 light:text-stone-600 mt-1 leading-snug">
                    {ex.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: Ikki tomonlama konverter */}
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
                    {[4, 9, 14, 40, 90, 400, 900, 1336, 1492, 1991, 2026].map((num) => (
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

                <div className="p-5 rounded-xl border border-stone-800 light:border-stone-300 bg-stone-950/60 light:bg-stone-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 light:text-stone-600 block mb-1">
                      Rim raqami natijasi:
                    </span>
                    {arabicConversion?.success ? (
                      <div>
                        <div className="font-cinzel text-3xl sm:text-4xl font-bold text-amber-400 light:text-amber-800 tracking-wider">
                          {arabicConversion.result}
                        </div>
                        <div className="text-xs text-stone-400 light:text-stone-600 mt-2">
                          <span className="font-semibold text-stone-300 light:text-stone-700">Tarkibi: </span>
                          {getDecompositionString(arabicNum)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-red-400 light:text-red-700 font-medium">
                        {arabicConversion?.error || 'Raqam kiriting'}
                      </div>
                    )}
                  </div>

                  {arabicConversion?.success && arabicConversion.result && (
                    <div className="pt-4 mt-4 border-t border-stone-800 light:border-stone-200 flex items-center justify-between">
                      <span className="text-xs text-stone-400">Nusxa olish uchun bosing:</span>
                      <button
                        onClick={() => handleCopy(arabicConversion.result || '')}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 light:bg-stone-200 text-xs text-stone-200 light:text-stone-800 cursor-pointer transition-colors"
                      >
                        {copiedNumber === arabicConversion.result ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Nusxalandi!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Nusxalash</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 light:text-stone-700">
                    Rim raqamini kiriting (I dan MMMCMXCIX gacha):
                  </label>
                  <input
                    type="text"
                    value={romanInput}
                    onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
                    placeholder="Masalan: MMXXVI, XLIX, CMXCIX..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 text-amber-400 font-cinzel text-xl border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 light:bg-stone-50 light:text-amber-900 light:border-stone-300 uppercase tracking-wider"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-xs text-stone-400 light:text-stone-500 mr-1">Namunalar:</span>
                    {['IV', 'IX', 'XIV', 'XL', 'XC', 'CD', 'CM', 'MCCCXXXVI', 'MMXXVI'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRomanInput(r)}
                        className="px-2 py-0.5 text-xs rounded bg-stone-800 text-amber-300 hover:bg-stone-700 light:bg-stone-200 light:text-amber-900 cursor-pointer font-cinzel"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-stone-800 light:border-stone-300 bg-stone-950/60 light:bg-stone-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 light:text-stone-600 block mb-1">
                      Arab raqami natijasi:
                    </span>
                    {romanConversion?.success ? (
                      <div>
                        <div className="font-mono text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
                          {romanConversion.result}
                        </div>
                        <div className="text-xs text-emerald-400 light:text-emerald-700 font-medium mt-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Rim raqami to‘g‘ri kiritildi</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-red-400 light:text-red-700 font-semibold flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>Noto‘g‘ri Rim raqami</span>
                        </div>
                        <p className="text-xs text-stone-300 light:text-stone-600 leading-relaxed bg-red-950/30 light:bg-red-50 p-2.5 rounded border border-red-900/30 light:border-red-200">
                          {romanConversion?.error}
                        </p>
                      </div>
                    )}
                  </div>

                  {romanConversion?.success && romanConversion.result && (
                    <div className="pt-4 mt-4 border-t border-stone-800 light:border-stone-200 flex items-center justify-between">
                      <span className="text-xs text-stone-400">Nusxa olish uchun bosing:</span>
                      <button
                        onClick={() => handleCopy(String(romanConversion.result))}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 light:bg-stone-200 text-xs text-stone-200 light:text-stone-800 cursor-pointer transition-colors"
                      >
                        {copiedNumber === String(romanConversion.result) ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Nusxalandi!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Nusxalash</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: Interaktiv amaliy mashqlar va testlar */}
      {activeSubTab === 'practice' && (
        <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-stone-100 light:text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400 light:text-amber-800" />
                <span>Rim raqamlari bo‘yicha interaktiv mashqlar</span>
              </h3>
              <p className="text-xs text-stone-400 light:text-stone-600 mt-1">
                Tasodifiy tuzilgan savollar, 4 ta variant va har bir xatolikka aniq izoh.
              </p>
            </div>

            {/* Difficulty Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-stone-950 light:bg-stone-200 border border-stone-800 light:border-stone-300">
              {(
                [
                  { id: 'oson', label: 'Oson (1–50)' },
                  { id: 'orta', label: 'O‘rta (50–500)' },
                  { id: 'qiyin', label: 'Qiyin (500–3999)' },
                ] as const
              ).map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDifficultyChange(d.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    difficulty === d.id
                      ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                      : 'text-stone-300 light:text-stone-700 hover:text-stone-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-stone-800 light:border-stone-300 bg-stone-950/40 light:bg-stone-50">
            <div className="text-center">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Yechilgan</span>
              <span className="text-lg font-bold font-mono text-stone-100 light:text-stone-900">
                {stats.solvedCount}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">To‘g‘ri</span>
              <span className="text-lg font-bold font-mono text-emerald-400 light:text-emerald-700">
                {stats.correctCount}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Aniqlik</span>
              <span className="text-lg font-bold font-mono text-amber-400 light:text-amber-800">
                {stats.solvedCount > 0
                  ? Math.round((stats.correctCount / stats.solvedCount) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="text-center">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Ketma-ket</span>
              </span>
              <span className="text-lg font-bold font-mono text-amber-400 light:text-amber-800">
                {stats.streak} (rekord: {stats.bestStreak})
              </span>
            </div>
          </div>

          {/* Current Question Card */}
          <div className="p-6 rounded-2xl border border-stone-800 light:border-stone-300 bg-stone-950/80 light:bg-stone-50 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800">
                {currentQuestion.type === 'toArabic'
                  ? 'Rim raqamining arabcha qiymatini toping:'
                  : 'Arab sonining Rimcha yozilishini toping:'}
              </span>
              <div
                className={`font-bold text-4xl sm:text-5xl ${
                  currentQuestion.type === 'toArabic'
                    ? 'font-cinzel text-amber-400 light:text-amber-800'
                    : 'font-mono text-stone-100 light:text-stone-900'
                }`}
              >
                {currentQuestion.type === 'toArabic'
                  ? currentQuestion.roman
                  : currentQuestion.arabic}
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption =
                  String(option) === String(currentQuestion.correctAnswer);

                let btnStyle =
                  'border-stone-800 bg-stone-900 text-stone-200 hover:border-amber-500 light:border-stone-300 light:bg-white light:text-stone-800';

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold light:bg-emerald-50 light:text-emerald-900 light:border-emerald-500';
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle =
                      'border-red-500 bg-red-950/60 text-red-300 light:bg-red-50 light:text-red-900 light:border-red-500';
                  } else {
                    btnStyle =
                      'border-stone-900 bg-stone-950/40 text-stone-600 opacity-60 light:border-stone-200 light:bg-stone-100 light:text-stone-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(option)}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-bold text-base sm:text-lg ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation */}
            {isAnswered && (
              <div className="max-w-xl mx-auto space-y-4">
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    String(selectedAnswer) === String(currentQuestion.correctAnswer)
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40 light:bg-emerald-50 light:text-emerald-900 light:border-emerald-200'
                      : 'bg-red-950/40 text-red-300 border-red-800/40 light:bg-red-50 light:text-red-900 light:border-red-200'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {String(selectedAnswer) === String(currentQuestion.correctAnswer) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>To‘g‘ri javob! Barakalla!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Noto‘g‘ri javob.</span>
                      </>
                    )}
                  </div>
                  <div>{currentQuestion.explanation}</div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer shadow"
                  >
                    Keyingi savolga o‘tish →
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
