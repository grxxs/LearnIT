import React from 'react';
import Rich from './Rich.jsx';

// Study notes for one lecture/lab: task description + every source file split into
// chunks, each chunk shown as code followed by what it means.
// Data shape (in <lecture>.json): notes: [{ title, text?, chunks?: [{ code, text }] }]
export default function NotesView({ subject, lectureId, onBack }) {
  const lecture = subject?.lectures.find((l) => l.id === lectureId);
  if (!lecture) return null;
  return (
    <>
      <button className="link-btn" onClick={onBack}>← {subject.name}</button>
      <h1 className="page-title">{lecture.title}</h1>
      <p className="muted small">Notatki: treść zadań oraz kody z repozytorium z objaśnieniem każdego fragmentu.</p>
      {lecture.notes.map((n, i) => (
        <details className="card note" key={i} open={i === 0}>
          <summary className="note-title">{n.title}</summary>
          {n.text && <p className="note-text"><Rich text={n.text} /></p>}
          {(n.chunks ?? []).map((c, j) => (
            <div className="chunk" key={j}>
              <pre className="codeblock">{c.code}</pre>
              <p className="note-text"><Rich text={c.text} /></p>
            </div>
          ))}
        </details>
      ))}
      <button className="link-btn" onClick={onBack}>← Wróć do wykładów</button>
    </>
  );
}
