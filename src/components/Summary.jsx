import React from 'react';

export default function Summary({ results, mode, title, onBack, onRetry }) {
  const total = results.length;
  const ok = results.filter((r) => r.ok && !r.guess).length;
  const guessed = results.filter((r) => r.ok && r.guess).length;
  const wrong = results.filter((r) => !r.ok);
  const pct = total ? Math.round(((ok + guessed) / total) * 100) : 0;
  const toReview = results.filter((r) => !r.ok || r.guess).map((r) => r.q);

  const verdict =
    pct >= 90 ? 'Świetnie, tak trzymaj.' : pct >= 70 ? 'Dobrze. Błędy wrócą w kolejnych powtórkach.' : pct >= 50 ? 'Nieźle. Powtórz błędy jeszcze dziś.' : 'To dopiero początek, a błędy to najlepszy materiał do nauki.';

  return (
    <>
      <section className="hero">
        <span className="muted small">{title}</span>
        <h1>{mode === 'exam' ? 'Wynik egzaminu próbnego' : 'Koniec sesji'}</h1>
        <p className="muted">{verdict}</p>
      </section>

      <section className="card score-card">
        <div className="score">
          <strong>{pct}%</strong>
          <span className="muted small">poprawnych za pierwszym razem</span>
        </div>
        <div className="stat-row">
          <div className="stat good"><strong>{ok}</strong><span>wiedziałem</span></div>
          <div className="stat accent"><strong>{guessed}</strong><span>strzał</span></div>
          <div className="stat bad"><strong>{wrong.length}</strong><span>błędne</span></div>
          <div className="stat"><strong>{total}</strong><span>pytań</span></div>
        </div>
        <div className="quiz-actions">
          <button className="btn ghost" onClick={onBack}>Wróć</button>
          {toReview.length > 0 && (
            <button className="btn primary" onClick={() => onRetry(toReview)}>
              Powtórz błędy i strzały ({toReview.length})
            </button>
          )}
        </div>
      </section>

      {wrong.length > 0 && (
        <>
          <h2 className="section-title">Do przejrzenia</h2>
          <ul className="review">
            {wrong.map((r, i) => (
              <li key={i} className="card">
                <span className="tag">{r.q.lectureTitle}</span>
                <p className="question sm">{r.q.q}</p>
                <p className="ans bad-text">✕ {r.chosen}</p>
                {r.chosenWhy && <p className="small trap">{r.chosenWhy}</p>}
                <p className="ans good-text">✓ {r.correctText}</p>
                <p className="muted small">{r.q.e}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
