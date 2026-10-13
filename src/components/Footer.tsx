import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-stone-800 light:border-stone-200 bg-stone-950 light:bg-[#F5F2EB] text-stone-400 light:text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl font-bold tracking-wider text-stone-100 light:text-stone-900">
                TARIX OLAMI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 light:text-stone-600 leading-relaxed max-w-sm">
              Maktab o‘quvchilari, abituriyentlar va tarix ixlosmandlari uchun yaratilgan zamonaviy
              interaktiv ta’lim platformasi. Tarixni chuqur va qiziqarli o‘rganing!
            </p>
            <p className="text-[11px] font-serif italic text-amber-400/80 light:text-amber-800">
              "Tarix — o‘tmish sabog‘i va kelajak yo‘lchi yulduzidir."
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300 light:text-stone-800">
              Asosiy bo‘limlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('lessons')}
                  className="hover:text-amber-400 light:hover:text-amber-800 transition-colors cursor-pointer"
                >
                  Tarix darslari (7 ta turkum)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('roman')}
                  className="hover:text-amber-400 light:hover:text-amber-800 transition-colors cursor-pointer"
                >
                  Rim raqamlari moduli va konverter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('quiz')}
                  className="hover:text-amber-400 light:hover:text-amber-800 transition-colors cursor-pointer"
                >
                  Interaktiv testlar (30+ savollar)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('timeline')}
                  className="hover:text-amber-400 light:hover:text-amber-800 transition-colors cursor-pointer"
                >
                  Tarixiy voqealar xronologiyasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('progress')}
                  className="hover:text-amber-400 light:hover:text-amber-800 transition-colors cursor-pointer"
                >
                  O‘quv yutuqlari va natijalar
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300 light:text-stone-800">
              Uslubiy eslatma
            </h4>
            <p className="leading-relaxed text-stone-400 light:text-stone-600">
              Dasturdagi barcha ma’lumotlar ilmiy-tarixiy manbalar asosida tuzilgan. Test natijalari
              shaxsiy o‘z-o‘zini baholash uchun mo‘ljallangan.
            </p>
            <div className="text-[11px] text-stone-500 pt-2">
              © 2026 TARIX OLAMI. Barcha huquqlar himoyalangan.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
