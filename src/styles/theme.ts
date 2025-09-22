export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme';

export function getStoredTheme(): Theme {
  const t = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return t ?? 'system';
}

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement; // <html>
  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark());

  root.classList.toggle('dark', isDark);
  // Optional body background to avoid flash
  document.body.classList.toggle('bg-slate-50', !isDark);
  document.body.classList.toggle('bg-slate-900', isDark);
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function initTheme() {
  applyTheme(getStoredTheme());
  // Keep in sync if the system setting changes while app is open
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => applyTheme(getStoredTheme());
  media.addEventListener('change', handler);
  return () => media.removeEventListener('change', handler);
}
