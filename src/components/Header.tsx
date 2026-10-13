import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  completedLessonsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedLessonsCount,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: ActiveTab; label: string }[] = [
    { tab: 'home', label: 'Bosh sahifa' },
    { tab: 'lessons', label: 'Darslar' },
    { tab: 'roman', label: 'Rim raqamlari' },
    { tab: 'quiz', label: 'Testlar' },
    { tab: 'timeline', label: 'Xronologiya' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 bg-stone-950/90 border-stone-800 text-stone-100 light:bg-[#FAF7F2]/95 light:border-stone-300 light:text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand title, one line */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Bosh sahifaga qaytish"
          >
            <div className="w-9 h-9 rounded-md flex items-center justify-center font-cinzel font-bold text-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 light:bg-amber-900/10 light:text-amber-800 light:border-amber-800/30">
              SPQR
            </div>
            <span className="font-cinzel tracking-wider text-xl font-bold whitespace-nowrap shrink-0 text-stone-100 group-hover:text-amber-400 light:text-stone-900 light:group-hover:text-amber-800 transition-colors">
              TARIX OLAMI
            </span>
          </button>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
                    isActive
                      ? 'border-amber-400 text-amber-400 light:border-amber-800 light:text-amber-800 font-semibold'
                      : 'border-transparent text-stone-300 hover:text-stone-100 hover:border-stone-600 light:text-stone-600 light:hover:text-stone-900 light:hover:border-stone-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border transition-colors cursor-pointer text-stone-300 hover:text-stone-100 hover:bg-stone-900 border-stone-800 light:text-stone-700 light:hover:text-stone-900 light:hover:bg-stone-200 light:border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'}
              title={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-800" />
              )}
            </button>

            {/* Progress CTA */}
            <button
              onClick={() => handleNavClick('progress')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'progress'
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20 light:bg-amber-900/10 light:text-amber-900 light:border-amber-900/30 light:hover:bg-amber-900/20'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Natijalarim</span>
              <span className="text-[11px] opacity-80">({completedLessonsCount})</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-stone-800 text-stone-300 hover:text-stone-100 hover:bg-stone-900 light:border-stone-300 light:text-stone-700 light:hover:bg-stone-200"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-800 light:border-stone-300 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.tab
                    ? 'bg-amber-500/15 text-amber-400 light:bg-amber-900/10 light:text-amber-900 font-semibold'
                    : 'text-stone-300 hover:bg-stone-900 light:text-stone-700 light:hover:bg-stone-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
