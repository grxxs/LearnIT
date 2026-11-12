import React, { useMemo, useState } from 'react';
import { buildSession, statsFor } from '../srs.js';

export const MODES = [
  { id: 'smart', label: 'Inteligentna', hint: 'Najpierw zaległe powtórki, potem nowe pytania. Najlepsza do codziennej nauki.' },
  { id: 'new', label: 'Nowe', hint: 'Tylko pytania, których jeszcze nie widziałeś. Dobre na pierwsze przejście materiału.' },
  { id: 'weak', label: 'Słabe', hint: 'Pytania, na których się myliłeś albo strzelałeś.' },
  { id: 'exam', label: 'Egzamin próbny', hint: 'Losowe pytania bez podpowiedzi. Wynik i wyjaśnienia pokazują się na końcu.' },
];

const SIZES = [10, 20, 30, 50, 0];

export default function SessionLauncher({ pool, progress, onStart, title }) {
  const [mode, setMode] = useState('smart');
  const [size, setSize] = useState(20);
  const s = useMemo(() => statsFor(pool, progress), [pool, progress]);

  const available =
    mode === 'new' ? s.fresh : mode === 'weak' ? s.weak : pool.length;
  const n = size === 0 ? available : Math.min(size, available);
  const modeInfo = MODES.find((m) => m.id === mode);

  const start = () => {
    const qs = buildSession(pool, progress, mode, size === 0 ? pool.length : size);
    if (qs.length) onStart(qs, mode, `${title} · ${modeInfo.label}`);
  };

  return (
    <div className="launcher">
      <div className="segmented" role="tablist">
        {MODES.map((m) => (
          <button key={m.id} role="tab" aria-selected={mode === m.id} className={mode === m.id ? 'on' : ''} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>
      <p className="hint">{modeInfo.hint}</p>
      <div className="launcher-row">
        <label className="size">
          <span>Liczba pytań</span>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
            {SIZES.map((v) => (
              <option key={v} value={v}>{v === 0 ? 'Wszystkie' : v}</option>
            ))}
          </select>
        </label>
        <button className="btn primary" disabled={!n} onClick={start}>
          {n ? `Start · ${n} pyt.` : mode === 'weak' ? 'Brak słabych pytań' : 'Brak pytań'}
        </button>
      </div>
    </div>
  );
}
