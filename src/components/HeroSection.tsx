import React, { useState } from 'react';
import { ActiveTab, Lesson } from '../types';
import { Search, BookOpen, Hash, CheckSquare, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSelectTab: (tab: ActiveTab) => void;
  onSelectLesson: (lesson: Lesson) => void;
  lessons: Lesson[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTab,
  onSelectLesson,
  lessons,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Lesson[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const q = val.toLowerCase().trim();
    const filtered = lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.categoryName.toLowerCase().includes(q) ||
        l.subtitle.toLowerCase().includes(q) ||
        l.keyFacts.some((f) => f.toLowerCase().includes(q)) ||
        l.historicalFigures.some((hf) => hf.name.toLowerCase().includes(q))
    );
    setSearchResults(filtered);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 border-b border-stone-800 light:border-stone-200">
      {/* Background visual atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20 light:opacity-10">
        <img
          src="/src/assets/images/hero_ancient_history_1791870084909.jpg"
          alt="Qadimgi tarix manzarasi"
          className="w-full h-full object-cover object-top"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/90 to-stone-950 light:from-[#FAF7F2] light:via-[#FAF7F2]/90 light:to-[#FAF7F2]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Marquee */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 light:text-amber-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O‘quvchilar va talabalar uchun tarixiy qo‘llanma</span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 light:text-stone-900 leading-[1.15]">
              TARIX OLAMI
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-amber-300/90 light:text-amber-900/90">
              Tarixni o‘rgan, bilimlaringni sinab ko‘r!
            </p>

            <p className="text-base sm:text-lg text-stone-300 light:text-stone-700 leading-relaxed max-w-2xl">
              Qadimgi Misr ehromlaridan Rim legionlarigacha, shumerlar mixxatidan Temuriylar
              renessansigacha bo‘lgan buyuk davrlar bo‘ylab interaktiv sayohat qiling. Rim
              raqamlarini o‘rganing, testlar bilan bilimlaringizni mustahkamlang.
            </p>

            {/* Live Lesson Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Dars, shaxs yoki tarixiy sanani qidiring (masalan: Rim, Amir Temur, ehrom)..."
                  className="w-full pl-12 pr-4 py-3.5 text-sm rounded-xl bg-stone-900/90 text-stone-100 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 light:bg-white light:text-stone-900 light:border-stone-300 shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      setIsSearching(false);
                    }}
                    className="absolute right-3 text-xs text-stone-400 hover:text-stone-200 light:hover:text-stone-700 px-2 py-1"
                  >
                    Tozalash
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-2 z-30 max-h-80 overflow-y-auto rounded-xl bg-stone-900 border border-stone-700 light:bg-white light:border-stone-300 shadow-2xl p-2 space-y-1">
                  {searchResults.length > 0 ? (
                    searchResults.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson);
                          setSearchQuery('');
                          setIsSearching(false);
                        }}
                        className="w-full text-left p-3 rounded-lg hover:bg-stone-800 light:hover:bg-amber-50 transition-colors flex items-start justify-between gap-3 group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs text-amber-400 light:text-amber-800 font-medium">
                            {lesson.categoryName}
                          </div>
                          <div className="text-sm font-semibold text-stone-100 light:text-stone-900 group-hover:text-amber-300 light:group-hover:text-amber-900">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-stone-400 light:text-stone-600 line-clamp-1">
                            {lesson.subtitle}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 light:group-hover:text-amber-700 shrink-0 mt-1" />
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-stone-400 light:text-stone-600">
                      "{searchQuery}" bo‘yicha dars topilmadi. Qidiruv so‘zini o‘zgartirib ko‘ring.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('lessons')}
                className="px-5 py-2.5 rounded-lg bg-amber-500 text-stone-950 font-semibold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Darslarni boshlash</span>
              </button>
              <button
                onClick={() => onSelectTab('roman')}
                className="px-5 py-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 light:text-amber-900 light:border-amber-900/30 hover:bg-amber-500/20 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Hash className="w-4 h-4" />
                <span>Rim raqamlari</span>
              </button>
              <button
                onClick={() => onSelectTab('quiz')}
                className="px-5 py-2.5 rounded-lg border border-stone-700 bg-stone-900 text-stone-200 light:bg-stone-100 light:border-stone-300 light:text-stone-800 hover:bg-stone-800 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Test topshirish</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 light:border-stone-300 shadow-xl bg-stone-900/60 light:bg-white group">
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-stone-950">
                <img
                  src="/src/assets/images/ancient_rome_forum_1791870085158.jpg"
                  alt="Qadimgi Rim Forumi va Kolizey"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-stone-100">
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                    Tarixiy obida
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-white">
                    Qadimgi Rim Kolizeyi va Forumi
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 mt-1">
                    Dunyo tarixining eng ulkan amfiteatri va Rim respublikasi siyosiy markazi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (4 Sections) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onSelectTab('lessons')}
            className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/60 light:bg-stone-50/80 hover:border-amber-500/40 light:hover:border-amber-700/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-400 light:text-amber-800 mb-3 border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-400 light:group-hover:text-amber-800 transition-colors">
              5- va 6-sinf darslari
            </h4>
            <p className="text-xs text-stone-400 light:text-stone-600 mt-1 leading-relaxed">
              5-sinf ("Tarixdan hikoyalar") va 6-sinf ("Qadimgi dunyo tarixi") o‘quv dasturlari.
            </p>
          </div>

          <div
            onClick={() => onSelectTab('roman')}
            className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/60 light:bg-stone-50/80 hover:border-amber-500/40 light:hover:border-amber-700/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-400 light:text-amber-800 mb-3 border border-amber-500/20">
              <Hash className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-400 light:group-hover:text-amber-800 transition-colors">
              Barcha Rim raqamlari
            </h4>
            <p className="text-xs text-stone-400 light:text-stone-600 mt-1 leading-relaxed">
              1–100 to‘liq jadval, I–XXI asrlar xronologiyasi, konverter va mashqlar.
            </p>
          </div>

          <div
            onClick={() => onSelectTab('quiz')}
            className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/60 light:bg-stone-50/80 hover:border-amber-500/40 light:hover:border-amber-700/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-400 light:text-amber-800 mb-3 border border-amber-500/20">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-400 light:group-hover:text-amber-800 transition-colors">
              Interaktiv testlar
            </h4>
            <p className="text-xs text-stone-400 light:text-stone-600 mt-1 leading-relaxed">
              30+ sinov savollari, tezkor javob tushuntirishlari, foiz hisobi va natijalar tahlili.
            </p>
          </div>

          <div
            onClick={() => onSelectTab('timeline')}
            className="p-5 rounded-xl border border-stone-800 light:border-stone-200 bg-stone-900/60 light:bg-stone-50/80 hover:border-amber-500/40 light:hover:border-amber-700/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-400 light:text-amber-800 mb-3 border border-amber-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-base font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-400 light:group-hover:text-amber-800 transition-colors">
              Xronologiya jadvali
            </h4>
            <p className="text-xs text-stone-400 light:text-stone-600 mt-1 leading-relaxed">
              Miloddan avvalgi 3500-yildan zamonaviy davrgacha bo‘lgan muhim voqealar va davrlar filtri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
