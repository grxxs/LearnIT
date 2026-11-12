// Spaced repetition tuned for a ~1-week exam horizon (Leitner boxes).
// box 0 = wrong / not learned, box 5 = solid. Research suggests ~1 day gaps are
// optimal for a 7-day retention interval, so intervals stay short.

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const INTERVALS = [0, 10 * MIN, 1 * DAY, 2 * DAY, 3 * DAY, 5 * DAY];
export const MASTERED_BOX = 3;

const KEY = 'learnit:progress:v1';

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

export function saveProgress(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — progress lives only in memory */
  }
}

/**
 * Apply an answer to one question's record.
 * result: 'correct' | 'guess' (correct but unsure) | 'wrong'
 */
export function grade(rec, result, now = Date.now()) {
  const r = rec ? { ...rec } : { box: 0, seen: 0, ok: 0, bad: 0 };
  r.seen += 1;
  r.last = now;
  if (result === 'wrong') {
    r.bad += 1;
    r.box = 0;
    r.weak = true;
  } else if (result === 'guess') {
    r.ok += 1;
    r.box = Math.min(r.box, 1); // a lucky guess is not knowledge
    r.weak = true;
  } else {
    r.ok += 1;
    r.box = Math.min(r.box + 1, INTERVALS.length - 1);
    r.weak = false;
  }
  r.due = now + INTERVALS[r.box];
  return r;
}

export function statsFor(questions, progress, now = Date.now()) {
  let seen = 0, mastered = 0, due = 0, weak = 0;
  for (const q of questions) {
    const r = progress[q.uid];
    if (!r) continue;
    seen++;
    if (r.box >= MASTERED_BOX) mastered++;
    if (r.weak) weak++;
    if (r.due <= now) due++;
  }
  return { total: questions.length, seen, mastered, due, weak, fresh: questions.length - seen };
}

/** Score 0..1 used for progress bars: average box / max box. */
export function masteryFor(questions, progress) {
  if (!questions.length) return 0;
  const max = INTERVALS.length - 1;
  let sum = 0;
  for (const q of questions) sum += (progress[q.uid]?.box ?? 0) / max;
  return sum / questions.length;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Interleave lists round-robin so consecutive questions come from different lectures. */
function interleaveBy(list, keyFn) {
  const groups = new Map();
  for (const item of list) {
    const k = keyFn(item);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(item);
  }
  const queues = shuffle([...groups.values()]);
  const out = [];
  while (queues.some((q) => q.length)) {
    for (const q of queues) if (q.length) out.push(q.shift());
  }
  return out;
}

/**
 * Build a session from a pool.
 * mode: 'smart' (due first, then new, then weakest) | 'weak' | 'new' | 'exam'
 */
export function buildSession(pool, progress, mode, size, now = Date.now()) {
  const seen = pool.filter((q) => progress[q.uid]);
  const fresh = shuffle(pool.filter((q) => !progress[q.uid]));
  const byWeakness = (a, b) => {
    const ra = progress[a.uid], rb = progress[b.uid];
    return ra.box - rb.box || ra.due - rb.due;
  };

  let picked;
  if (mode === 'exam') {
    picked = shuffle(pool).slice(0, size);
  } else if (mode === 'new') {
    picked = fresh.slice(0, size);
  } else if (mode === 'weak') {
    picked = seen.filter((q) => progress[q.uid].weak).sort(byWeakness).slice(0, size);
  } else {
    const due = seen.filter((q) => progress[q.uid].due <= now).sort(byWeakness);
    picked = due.slice(0, size);
    if (picked.length < size) picked = picked.concat(fresh.slice(0, size - picked.length));
    if (picked.length < size) {
      const rest = seen.filter((q) => !picked.includes(q)).sort(byWeakness);
      picked = picked.concat(rest.slice(0, size - picked.length));
    }
  }
  return interleaveBy(shuffle(picked), (q) => q.lectureId);
}
