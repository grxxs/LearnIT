import React, { useMemo, useState } from 'react';
import { statsFor, masteryFor, buildSession } from '../srs.js';
import SessionLauncher from './SessionLauncher.jsx';
import { Bar, StatRow } from './Stats.jsx';

const EXAMS_KEY = 'learnit:exams';

function readExams() {
  try {
    return JSON.parse(localStorage.getItem(EXAMS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + 'T00:00:00');
  return Math.round((d - today) / 86400000);
}

export default function SubjectView({ subject, progress, onBack, onStart }) {
  const [selected, setSelected] = useState(() => new Set(subject.lectures.map((l) => l.id)));
  const [exams, setExams] = useState(readExams);

  const pool = useMemo(
    () => subject.lectures.filter((l) => selected.has(l.id)).flatMap((l) => l.questions),
    [subject, selected]
  );
  const all = useMemo(() => subject.lectures.flatMap((l) => l.questions), [subject]);
  const st = statsFor(all, progress);

  const toggle = (id) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const allOn = selected.size === subject.lectures.length;
  const toggleAll = () => setSelected(allOn ? new Set() : new Set(subject.lectures.map((l) => l.id)));

  const setExam = (v) => {
    const next = { ...exams, [subject.id]: v };
    setExams(next);
    try {
      localStorage.setItem(EXAMS_KEY, JSON.stringify(next));
    } catch {}
  };
  const left = daysUntil(exams[subject.id]);

  return (
    <>
      <button className="link-btn" onClick={onBack}>← Wszystkie przedmioty</button>
      <section className="hero">
        <span className="tag">{subject.short ?? subject.id}</span>
        <h1>{subject.name}</h1>
        {subject.description && <p className="muted">{subject.description}</p>}
        <div className="exam-date">
          <label>
            <span className="muted small">Data egzaminu</span>
            <input type="date" value={exams[subject.id] ?? ''} onChange={(e) => setExam(e.target.value)} />
          </label>
          {left !== null && (
            <span className={`pill ${left <= 2 ? 'bad' : ''}`}>
              {left > 1 ? `${left} dni do egzaminu` : left === 1 ? 'Egzamin jutro' : left === 0 ? 'Egzamin dziś' : 'Po egzaminie'}
            </span>
          )}
        </div>
      </section>

      <section className="card">
        <StatRow s={st} />
        <SessionLauncher
          pool={pool}
          progress={progress}
          onStart={onStart}
          title={subject.short ?? subject.name}
        />
        <p className="muted small">
          Wybrane wykłady: {selected.size}/{subject.lectures.length} · {pool.length} pytań
        </p>
      </section>

      <div className="section-title row">
        <h2>Wykłady</h2>
        <button className="link-btn" onClick={toggleAll}>{allOn ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}</button>
      </div>
      <ul className="lectures">
        {subject.lectures.map((l) => {
          const ls = statsFor(l.questions, progress);
          const m = masteryFor(l.questions, progress);
          const on = selected.has(l.id);
          return (
            <li key={l.id} className={on ? 'on' : ''}>
              <label>
                <input type="checkbox" checked={on} onChange={() => toggle(l.id)} />
                <div className="lec-body">
                  <div className="lec-title">
                    <span>{l.title}</span>
                    <span className="muted small">{Math.round(m * 100)}%</span>
                  </div>
                  <Bar value={m} label={`Opanowanie: ${l.title}`} />
                  <span className="muted small">
                    {l.questions.length} pyt. · {ls.mastered} opanowane
                    {ls.weak > 0 && <> · <span className="bad-text">{ls.weak} słabe</span></>}
                    {ls.fresh > 0 && <> · {ls.fresh} nowe</>}
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
