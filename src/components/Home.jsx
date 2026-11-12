import React, { useMemo } from 'react';
import { statsFor, masteryFor } from '../srs.js';
import SessionLauncher from './SessionLauncher.jsx';
import { Bar, StatRow } from './Stats.jsx';

export default function Home({ subjects, allQuestions, progress, onOpen, onStart }) {
  const total = useMemo(() => statsFor(allQuestions, progress), [allQuestions, progress]);
  const mastery = masteryFor(allQuestions, progress);

  return (
    <>
      <section className="hero">
        <h1>Co dziś powtarzamy?</h1>
        <p className="muted">
          Krótkie, codzienne sesje działają lepiej niż jedna długa. Odpowiadaj, zanim zajrzysz w wyjaśnienie.
        </p>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>Tryb mieszany</h2>
            <p className="muted small">Wszystkie przedmioty naraz · {allQuestions.length} pytań</p>
          </div>
          <span className="pct">{Math.round(mastery * 100)}%</span>
        </div>
        <Bar value={mastery} label="Opanowanie wszystkich przedmiotów" />
        <StatRow s={total} />
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
                <div>
                  <span className="tag">{s.short ?? s.id}</span>
                  <h3>{s.name}</h3>
                </div>
                <span className="pct">{Math.round(m * 100)}%</span>
              </div>
              <Bar value={m} label={`Opanowanie: ${s.name}`} />
              <p className="muted small">
                {s.lectures.length} wykładów · {qs.length} pytań
                {st.due > 0 && <> · <span className="accent-text">{st.due} do powtórki</span></>}
              </p>
            </button>
          );
        })}
      </div>
      {subjects.length < 2 && (
        <p className="muted small center">Kolejne przedmioty pojawią się tutaj po dodaniu ich pytań.</p>
      )}
    </>
  );
}
