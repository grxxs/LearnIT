import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { shuffle } from '../srs.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const REQUEUE_GAP = 4; // a missed question comes back a few questions later

function prepare(q, again = false) {
  // q.a[0] is the correct answer; shuffle once per appearance.
  // q.w (optional) explains why each wrong answer is wrong: q.w[i-1] belongs to q.a[i].
  const options = shuffle(q.a.map((text, i) => ({ text, correct: i === 0, why: i > 0 ? q.w?.[i - 1] : null })));
  return { q, options, again };
}

export default function Quiz({ questions, mode, title, onAnswer, onExit, onFinish }) {
  const exam = mode === 'exam';
  const [queue, setQueue] = useState(() => questions.map((q) => prepare(q)));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState([]); // first attempt per question
  const [requeued, setRequeued] = useState(() => new Set());

  const item = queue[idx];
  const revealed = picked !== null && !exam;
  const firstAttempt = useMemo(() => !results.some((r) => r.q.uid === item?.q.uid), [results, item]);

  const finish = useCallback((res) => onFinish(res), [onFinish]);

  const advance = useCallback(
    (res = results) => {
      if (idx + 1 >= queue.length) finish(res);
      else {
        setIdx(idx + 1);
        setPicked(null);
      }
    },
    [idx, queue.length, finish, results]
  );

  const choose = useCallback(
    (i) => {
      if (picked !== null || !item) return;
      setPicked(i);
      const ok = item.options[i].correct;
      const record = {
        q: item.q,
        chosen: item.options[i].text,
        chosenWhy: item.options[i].why,
        correctText: item.options.find((o) => o.correct).text,
        ok,
      };
      let res = results;
      if (firstAttempt) {
        res = [...results, record];
        setResults(res);
      }
      if (!ok) {
        onAnswer(item.q.uid, 'wrong');
        if (!exam && !requeued.has(item.q.uid)) {
          setRequeued((s) => new Set(s).add(item.q.uid));
          setQueue((qu) => {
            const n = [...qu];
            n.splice(Math.min(idx + 1 + REQUEUE_GAP, n.length), 0, prepare(item.q, true));
            return n;
          });
        }
      } else if (exam) {
        onAnswer(item.q.uid, 'correct');
      }
      if (exam) setTimeout(() => advance(res), 180);
    },
    [picked, item, results, firstAttempt, onAnswer, exam, requeued, idx, advance]
  );

  // Correct answers in learning mode: user says whether they knew or guessed.
  const confirmCorrect = useCallback(
    (guess) => {
      onAnswer(item.q.uid, guess ? 'guess' : 'correct');
      let res = results;
      const last = res[res.length - 1];
      if (guess && last && last.q.uid === item.q.uid) {
        res = [...res.slice(0, -1), { ...last, guess: true }];
        setResults(res);
      }
      advance(res);
    },
    [item, onAnswer, advance, results]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (picked === null) {
        const n = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'abcd'.indexOf(k);
        if (n >= 0 && n < (item?.options.length ?? 0)) {
          e.preventDefault();
          choose(n);
        }
      } else if (revealed) {
        const ok = item.options[picked].correct;
        if (k === 'enter' || k === ' ') {
          e.preventDefault();
          ok ? confirmCorrect(false) : advance();
        } else if (ok && k === 's') {
          e.preventDefault();
          confirmCorrect(true);
        }
      }
      if (k === 'escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [picked, revealed, item, choose, confirmCorrect, advance, onExit]);

  if (!item) return null;

  // Progress counts only the questions the session started with;
  // re-queued mistakes are shown separately so the total never "grows".
  const total = questions.length;
  const originalsBefore = queue.slice(0, idx).filter((x) => !x.again).length;
  const current = Math.min(originalsBefore + (item.again ? 0 : 1), total);
  const repeatsLeft = queue.slice(idx + 1).filter((x) => x.again).length;
  const pct = (originalsBefore / total) * 100;
  const pickedOk = picked !== null && item.options[picked].correct;
  const correctIdx = item.options.findIndex((o) => o.correct);

  return (
    <div className="quiz">
      <div className="quiz-top">
        <button className="link-btn" onClick={onExit}>✕ Zakończ</button>
        <span className="muted small">{title}</span>
        <span className="counter small tabular">
          {item.again ? 'Powtórka błędu' : `Pytanie ${current} / ${total}`}
          {repeatsLeft > 0 && (
            <span className="pill bad" title="Pytania, na które odpowiedziałeś źle, wrócą jeszcze w tej sesji">
              +{repeatsLeft} {repeatsLeft === 1 ? 'powtórka' : repeatsLeft < 5 ? 'powtórki' : 'powtórek'}
            </span>
          )}
        </span>
      </div>
      <div className="bar thin"><span style={{ width: `${pct}%` }} /></div>

      <article className="card question-card">
        <span className="tag">{item.q.lectureTitle}</span>
        {item.again && <span className="tag again">powtórka</span>}
        <h2 className="question">{item.q.q}</h2>

        <div className="options">
          {item.options.map((o, i) => {
            let cls = 'option';
            if (picked !== null) {
              if (exam) cls += i === picked ? ' chosen' : '';
              else if (o.correct) cls += ' correct';
              else if (i === picked) cls += ' wrong';
              else cls += ' dim';
            }
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={picked !== null}>
                <span className="letter">{LETTERS[i]}</span>
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className={`feedback ${pickedOk ? 'ok' : 'no'}`}>
            <strong>{pickedOk ? 'Dobrze!' : 'Niestety nie.'}</strong>
            {!pickedOk && (
              <p className="answer-line">
                Poprawna odpowiedź: <b>{LETTERS[correctIdx]}</b> · {item.options[correctIdx].text}
              </p>
            )}
            {!pickedOk && item.options[picked].why && (
              <p className="trap"><span>Twój wybór ({LETTERS[picked]}):</span> {item.options[picked].why}</p>
            )}
            <p className="why"><span>Dlaczego:</span> {item.q.e}</p>
            {!pickedOk && !item.again && (
              <p className="muted small">To pytanie wróci za kilka pytań.</p>
            )}
          </div>
        )}
      </article>

      {revealed && (
        <div className="quiz-actions">
          {pickedOk ? (
            <>
              <button className="btn ghost" onClick={() => confirmCorrect(true)} title="Skrót: S">
                Strzelałem <kbd>S</kbd>
              </button>
              <button className="btn primary" onClick={() => confirmCorrect(false)} autoFocus>
                Wiedziałem · dalej <kbd>Enter</kbd>
              </button>
            </>
          ) : (
            <button className="btn primary" onClick={() => advance()} autoFocus>
              Dalej <kbd>Enter</kbd>
            </button>
          )}
        </div>
      )}
      {picked === null && (
        <p className="muted small center keys-hint">
          Klawisze <kbd>1</kbd>–<kbd>4</kbd> lub <kbd>A</kbd>–<kbd>D</kbd> · <kbd>Esc</kbd> kończy sesję
        </p>
      )}
    </div>
  );
}
