import React, { useEffect, useRef, useState } from 'react';

const THEME_KEY = 'learnit:theme';
const THEMES = ['system', 'light', 'dark'];
const THEME_LABEL = { system: 'Motyw: systemowy', light: 'Motyw: jasny', dark: 'Motyw: ciemny' };

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) ?? 'system';
  } catch {
    return 'system';
  }
}

export default function Header({ progress, setProgress, onHome }) {
  const [theme, setTheme] = useState(readTheme);
  const [menu, setMenu] = useState(false);
  const fileRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (!menu) return;
    const close = (e) => menuRef.current && !menuRef.current.contains(e.target) && setMenu(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menu]);

  const cycleTheme = () => setTheme((t) => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length]);

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(progress)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `learnit-postep-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMenu(false);
  };

  const importProgress = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((txt) => {
      try {
        const data = JSON.parse(txt);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        setProgress((p) => ({ ...p, ...data }));
        alert('Postęp zaimportowany.');
      } catch {
        alert('Nieprawidłowy plik postępu.');
      }
    });
    e.target.value = '';
    setMenu(false);
  };

  const reset = () => {
    if (confirm('Na pewno usunąć cały postęp nauki? Tej operacji nie da się cofnąć.')) setProgress({});
    setMenu(false);
  };

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <button className="brand" onClick={onHome ?? undefined} disabled={!onHome} title="Strona główna">
          <span className="brand-mark" aria-hidden>
            <svg viewBox="0 0 32 32" width="22" height="22">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path d="M9 17l5 5 9-11" stroke="var(--surface)" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          LearnIT
        </button>
        <div className="topbar-actions">
          <button className="icon-btn" onClick={cycleTheme} title={THEME_LABEL[theme]} aria-label={THEME_LABEL[theme]}>
            {theme === 'dark' ? <MoonIcon /> : theme === 'light' ? <SunIcon /> : <AutoIcon />}
          </button>
          <div className="menu-wrap" ref={menuRef}>
            <button className="icon-btn" onClick={() => setMenu((m) => !m)} aria-label="Menu" title="Postęp">
              <DotsIcon />
            </button>
            {menu && (
              <div className="menu">
                <button onClick={exportProgress}>Eksportuj postęp</button>
                <button onClick={() => fileRef.current?.click()}>Importuj postęp</button>
                <hr />
                <button className="danger" onClick={reset}>Wyczyść postęp</button>
              </div>
            )}
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={importProgress} />
          </div>
        </div>
      </div>
    </header>
  );
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);
const AutoIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
  </svg>
);
const DotsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);
