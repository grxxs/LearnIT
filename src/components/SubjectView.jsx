import React, { useMemo, useState } from 'react';
import { statsFor, masteryFor, buildSession } from '../srs.js';
import SessionLauncher from './SessionLauncher.jsx';
import { Bar, StatLine } from './Stats.jsx';

export default function SubjectView({ subject, progress, onBack, onStart }) {
  const [selected, setSelected] = useState(() => new Set(subject.lectures.map((l) => l.id)));

  const pool = useMemo(
    () => subject.lectures.filter((l) => selected.has(l.id)).flatMap((l) => l.questions),
    [subject, selected]
  );
  const all = useMemo(() => subject.lectures.flatMap((l) => l.questions), [subject]);
  const st = statsFor(all, progress);
  const m = masteryFor(all, progress);

  const toggle = (id) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const allOn = selected.size === subject.lectures.length;
  const toggleAll = () => setSelected(allOn ? new Set() : new Set(subject.lectures.map((l) => l.id)));

  return (
    <>
      <button className="link-btn" onClick={onBack}>← Wszystkie przedmioty</button>
      <h1 className="page-title">{subject.name}</h1>

      <section className="card">
        <div className="card-head">
          <p className="muted small">
            {selected.size === subject.lectures.length
              ? `Wszystkie wykłady · ${pool.length} pytań`
              : `Wybrane wykłady: ${selected.size}/${subject.lectures.length} · ${pool.length} pytań`}
          </p>
          <span className="pct">{Math.round(m * 100)}%</span>
        </div>
        <Bar value={m} label={`Opanowanie: ${subject.name}`} />
        <StatLine s={st} />
        <SessionLauncher pool={pool} progress={progress} onStart={onStart} title={subject.short ?? subject.name} />
      </section>

      <div className="section-title row">
        <h2>Wykłady</h2>
        <button className="link-btn" onClick={toggleAll}>{allOn ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</button>
      </div>
      <ul className="lectures">
        {subject.lectures.map((l) => {
          const ls = statsFor(l.questions, progress);
          const lm = masteryFor(l.questions, progress);
          const on = selected.has(l.id);
          return (
            <li key={l.id} className={on ? 'on' : ''}>
              <label>
                <input type="checkbox" checked={on} onChange={() => toggle(l.id)} />
                <div className="lec-body">
                  <div className="lec-title">
                    <span>{l.title}</span>
                    <span className="muted small">{Math.round(lm * 100)}%</span>
                  </div>
                  <Bar value={lm} label={`Opanowanie: ${l.title}`} />
                  <span className="muted small">
                    {l.questions.length} pyt.
                    {ls.weak > 0 && <> · <span className="bad-text">{ls.weak} słabe</span></>}
                    {ls.fresh > 0 && ls.fresh < l.questions.length && <> · {ls.fresh} nowe</>}
                  </span>
                </div>
              </label>
              <button
                className="btn ghost sm"
                title="Szybka sesja tylko z tego wykładu"
                onClick={() => onStart(buildSession(l.questions, progress, 'smart', 15), 'smart', l.title)}
              >
                Ucz się
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
