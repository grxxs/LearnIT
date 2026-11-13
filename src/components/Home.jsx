import React, { useMemo } from 'react';
import { statsFor, masteryFor } from '../srs.js';
import SessionLauncher from './SessionLauncher.jsx';
import { Bar, StatLine } from './Stats.jsx';

// Polish plural forms: 1 wykład, 2–4 wykłady, 5+ wykładów (but 12–14 → wykładów).
function plural(n, one, few, many) {
  if (n === 1) return one;
  const d = n % 10, t = n % 100;
  return d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many;
}

export default function Home({ subjects, allQuestions, progress, onOpen, onStart }) {
  const total = useMemo(() => statsFor(allQuestions, progress), [allQuestions, progress]);
  const mastery = masteryFor(allQuestions, progress);

  return (
    <>
      <h1 className="page-title">Co dziś powtarzamy?</h1>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>Tryb mieszany</h2>
            <p className="muted small">Wszystkie przedmioty · {allQuestions.length} pytań</p>
          </div>
          <span className="pct">{Math.round(mastery * 100)}%</span>
        </div>
        <Bar value={mastery} label="Opanowanie wszystkich przedmiotów" />
        <StatLine s={total} />
        <SessionLauncher pool={allQuestions} progress={progress} onStart={onStart} title="Mieszany" />
      </section>

      <h2 className="section-title">Przedmioty</h2>
      <div className="grid">
        {subjects.map((s) => {
          const qs = s.lectures.flatMap((l) => l.questions);
          const st = statsFor(qs, progress);
          const m = masteryFor(qs, progress);
          return (
            <button key={s.id} className="card subject-card" onClick={() => onOpen(s.id)}>
              <div className="card-head">
                <h3>{s.name}</h3>
                <span className="pct">{Math.round(m * 100)}%</span>
              </div>
              <Bar value={m} label={`Opanowanie: ${s.name}`} />
              <p className="muted small">
                {s.lectures.length} {plural(s.lectures.length, 'wykład', 'wykłady', 'wykładów')} · {qs.length} pytań
                {st.due > 0 && <> · <span className="accent-text">{st.due} do powtórki</span></>}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}
