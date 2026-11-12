import React from 'react';

export function Bar({ value, label }) {
  const pct = Math.round(value * 100);
  return (
    <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export function StatRow({ s }) {
  return (
    <div className="stat-row">
      <Stat value={s.mastered} label="opanowane" tone="good" />
      <Stat value={s.due} label="do powtórki" tone="accent" />
      <Stat value={s.weak} label="słabe" tone="bad" />
      <Stat value={s.fresh} label="nowe" />
    </div>
  );
}

function Stat({ value, label, tone }) {
  return (
    <div className={`stat ${tone ?? ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
