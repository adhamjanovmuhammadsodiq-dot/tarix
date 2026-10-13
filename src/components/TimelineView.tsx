import React, { useState, useMemo } from 'react';
import { TimelineEvent, CategoryId } from '../types';
import { CATEGORIES } from '../data/lessonsData';
import {
  Clock,
  Search,
  ArrowUpDown,
  MapPin,
  Sparkles,
  Info,
} from 'lucide-react';

interface TimelineViewProps {
  events: TimelineEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [activeEventModal, setActiveEventModal] = useState<TimelineEvent | null>(null);

  const filteredEvents = useMemo(() => {
    let list = events.filter((ev) => {
      const matchCat = selectedCategory === 'all' || ev.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    list.sort((a, b) => {
      return sortAscending ? a.numericYear - b.numericYear : b.numericYear - a.numericYear;
    });

    return list;
  }, [events, selectedCategory, searchQuery, sortAscending]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 light:text-amber-800 mb-2">
          <Clock className="w-4 h-4" />
          <span>Vaqt chizig‘i</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-100 light:text-stone-900">
          Interaktiv tarixiy xronologiya
        </h2>
        <p className="text-sm sm:text-base text-stone-400 light:text-stone-600 mt-2 max-w-3xl leading-relaxed">
          Insoniyat tarixidagi eng muhim burilish nuqtalari, buyuk tamaddunlar yuksalishi va
          O‘zbekiston zamini xronologiyasi. Barcha sanalar ilmiy jihatdan tekshirilgan bo‘lib,
          noaniq davrlar taxminiy deb qayd etilgan.
        </p>
      </div>

      {/* Controls: Category Filter + Search + Sort */}
      <div className="space-y-4 p-5 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/40 light:bg-white shadow-sm">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-stone-950 border-amber-400'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600 light:bg-stone-100 light:text-stone-700 light:border-stone-300'
            }`}
          >
            Barchasi ({events.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600 light:bg-stone-100 light:text-stone-700 light:border-stone-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-stone-800 light:border-stone-200">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sana, voqea yoki joy nomini izlang..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-stone-950 text-stone-100 border border-stone-800 light:bg-stone-50 light:text-stone-900 light:border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={() => setSortAscending(!sortAscending)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-stone-800 light:border-stone-300 bg-stone-950 light:bg-stone-50 text-stone-300 light:text-stone-700 hover:text-stone-100 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Tartib: {sortAscending ? 'Qadimgidan yangiga' : 'Yangidan qadimgiga'}
            </span>
          </button>
        </div>
      </div>

      {/* Timeline Graphic Track */}
      {filteredEvents.length > 0 ? (
        <div className="relative border-l-2 border-amber-500/30 light:border-amber-700/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 my-8">
          {filteredEvents.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-stone-950 border-2 border-amber-400 light:bg-white light:border-amber-700 flex items-center justify-center group-hover:scale-125 transition-transform" />

              {/* Event Box */}
              <div
                onClick={() => setActiveEventModal(item)}
                className="p-5 sm:p-6 rounded-2xl border border-stone-800 light:border-stone-200 bg-stone-900/50 light:bg-white hover:border-amber-500/50 light:hover:border-amber-700/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-base sm:text-lg font-bold text-amber-400 light:text-amber-800">
                      {item.year}
                    </span>
                    {item.isApproximate && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 light:bg-stone-200 light:text-stone-600">
                        Taxminiy sana
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-stone-400 light:text-stone-500">
                    {item.categoryLabel}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-100 light:text-stone-900 group-hover:text-amber-300 light:group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 light:text-stone-700 mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-800/80 light:border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400 light:text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400/80 light:text-amber-800" />
                    <span>{item.location}</span>
                  </div>
                  <span className="text-amber-400 light:text-amber-800 font-medium inline-flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>Batafsil ma’lumot</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-stone-800 light:border-stone-200 rounded-xl bg-stone-900/30">
          <Clock className="w-8 h-8 mx-auto text-stone-500 mb-2" />
          <p className="text-stone-300 light:text-stone-700 font-medium text-sm">
            Qidiruv mezonlariga mos keluvchi voqealar topilmadi.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-amber-400 light:text-amber-800 underline cursor-pointer"
          >
            Barcha voqealarni ko‘rsatish
          </button>
        </div>
      )}

      {/* Detail Modal for selected event */}
      {activeEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-lg w-full rounded-2xl border border-stone-700 light:border-stone-300 bg-stone-900 light:bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-800">
                  {activeEventModal.categoryLabel}
                </span>
                <div className="font-cinzel text-xl font-bold text-amber-400 light:text-amber-800 mt-1">
                  {activeEventModal.year}
                </div>
              </div>
              <button
                onClick={() => setActiveEventModal(null)}
                className="text-stone-400 hover:text-stone-200 light:hover:text-stone-800 p-1 rounded-lg text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-100 light:text-stone-900">
              {activeEventModal.title}
            </h3>

            <p className="text-sm text-stone-300 light:text-stone-700 leading-relaxed">
              {activeEventModal.description}
            </p>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 light:bg-amber-50 light:border-amber-200 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 light:text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tarixiy ahamiyati:</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 light:text-stone-800">
                {activeEventModal.significance}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400 light:text-stone-600 pt-2 border-t border-stone-800 light:border-stone-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Manzil: {activeEventModal.location}</span>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveEventModal(null)}
                className="px-5 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
