import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ label, icon: Icon, options, value, onChange, theme = 'blue' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeColors = {
    blue: 'text-blue-500 focus:ring-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 hover:text-blue-600',
    rose: 'text-rose-500 focus:ring-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:text-rose-600',
    orange: 'text-orange-500 focus:ring-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 hover:text-orange-600'
  };

  const currentTheme = themeColors[theme] || themeColors.blue;
  const iconColor = currentTheme.split(' ')[0];
  const ringColor = currentTheme.split(' ')[1];
  const activeStyles = currentTheme.split(' ').slice(2).join(' ');

  return (
    <div className="space-y-1.5 relative w-full" ref={dropdownRef}>
      <label className="text-md font-bold text-zinc-500 dark:text-zinc-400 flex items-center px-0.5 uppercase tracking-wider">
        <Icon className={`w-4 h-4 mr-2 ${iconColor}`} /> {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-left focus:outline-none focus:ring-2 ${ringColor} transition-all text-zinc-900 dark:text-white flex items-center justify-between shadow-sm text-sm`}
        >
          <span className="font-semibold">{value}</span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-[300] w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-200">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between ${value === option
                    ? `${activeStyles} font-bold`
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white'
                  }`}
              >
                {option}
                {value === option && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
