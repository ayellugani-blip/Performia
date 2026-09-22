import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Layers, Check, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { ThemeMode } from '../../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // 300ms grace period so moving mouse cursor to select options never vanishes the menu
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const options: {
    mode: ThemeMode;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
  }[] = [
    {
      mode: 'light',
      label: 'Light Theme',
      description: 'High-contrast tactile canvas',
      icon: Sun,
      iconColor: 'text-amber-500',
    },
    {
      mode: 'dark',
      label: 'Dark Theme',
      description: 'Sleek midnight obsidian',
      icon: Moon,
      iconColor: 'text-sky-400',
    },
    {
      mode: 'mix',
      label: 'Mix Theme',
      description: 'Cyber-enterprise hybrid',
      icon: Layers,
      iconColor: 'text-purple-500',
    },
  ];

  // Active Icon for the circular shape trigger button
  const getActiveIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4.5 w-4.5 text-amber-500 transition-transform group-hover:rotate-45" />;
      case 'dark':
        return <Moon className="h-4.5 w-4.5 text-sky-400 transition-transform group-hover:-rotate-12" />;
      case 'mix':
        return <Layers className="h-4.5 w-4.5 text-[#0078D4] transition-transform group-hover:scale-110" />;
      default:
        return <Palette className="h-4.5 w-4.5 text-[#0078D4]" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Circular Trigger Shape Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={`Theme Mode: ${theme.toUpperCase()} (Click or Hover to select)`}
        className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-[#0078D4] bg-blue-50/80 shadow-md ring-2 ring-blue-100'
            : 'border-slate-200/90 bg-white hover:border-blue-300 hover:bg-slate-50 shadow-2xs'
        }`}
        aria-label="Select Theme"
      >
        {getActiveIcon()}

        {/* Small active theme dot indicator */}
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#0078D4]" />
      </button>

      {/* Popover Options Menu with Continuous Hover Bridge */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-1.5 w-64 z-50 animate-fadeIn">
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-xl backdrop-blur-md">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-[#0078D4]" /> Theme Mode
              </span>
              <span className="rounded-full bg-blue-50 px-2 py-0.2 text-[10px] font-bold text-[#0078D4] capitalize">
                {theme}
              </span>
            </div>

            <div className="mt-1 space-y-1">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isActive = theme === opt.mode;

                return (
                  <button
                    key={opt.mode}
                    type="button"
                    onClick={() => {
                      setTheme(opt.mode);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50/80 text-[#0078D4] font-semibold border border-blue-200/70 shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isActive ? 'bg-white shadow-2xs' : 'bg-slate-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${opt.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight text-slate-900">
                          {opt.label}
                        </p>
                        <p className="text-[10px] text-slate-500 font-normal">
                          {opt.description}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <Check className="h-4 w-4 text-[#0078D4] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
