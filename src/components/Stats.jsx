import React from 'react';

export function Bar({ value, label }) {
  const pct = Math.round(value * 100);
  return (
    <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Compact one-line summary: only non-zero numbers, in a fixed order. */
export function StatLine({ s }) {
  const items = [
    { v: s.due, label: 'do powtórki', tone: 'accent' },
    { v: s.weak, label: 'słabe', tone: 'bad' },
    { v: s.fresh, label: 'nowe' },
    { v: s.mastered, label: 'opanowane', tone: 'good' },
  ].filter((x) => x.v > 0);
  if (!items.length) return null;
  return (
    <p className="stat-line">
      {items.map((x) => (
        <span key={x.label} className={x.tone ?? ''}>
          <strong>{x.v}</strong> {x.label}
        </span>
      ))}
    </p>
  );
}
