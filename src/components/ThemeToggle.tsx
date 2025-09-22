import React, { useEffect, useState } from 'react';
import { getStoredTheme, setTheme, type Theme } from '../styles/theme';

const ThemeToggle: React.FC = () => {
  const [theme, setLocal] = useState<Theme>('system');

  useEffect(() => {
    setLocal(getStoredTheme());
  }, []);

  const cycle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setLocal(next);
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      onClick={cycle}
      aria-pressed={theme === 'dark'}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/80 dark:bg-slate-800/80 
                 text-slate-700 dark:text-slate-100 shadow hover:shadow-md transition"
      title="Toggle theme"
    >
      <span aria-hidden>{theme === 'dark' ? '🌙' : '🌞'}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default ThemeToggle;
