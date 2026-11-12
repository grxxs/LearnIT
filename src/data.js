// Loads every subject from /data/<subjectId>/ at build time.
// To add a subject: create data/<id>/subject.json + one JSON file per lecture, then rebuild.
//
// subject.json: { id, name, short, description, lectures: ["w01", ...] }
// <lecture>.json: { id, title, questions: [{ id, q, a: [correct, wrong, wrong, wrong], e }] }
// The first answer in `a` is always the correct one; the app shuffles the order.

const files = import.meta.glob('../data/*/*.json', { eager: true, import: 'default' });

function folderOf(path) {
  const parts = path.split('/');
  return { folder: parts[parts.length - 2], file: parts[parts.length - 1].replace('.json', '') };
}

const raw = {};
for (const [path, content] of Object.entries(files)) {
  const { folder, file } = folderOf(path);
  raw[folder] ??= { meta: null, lectures: {} };
  if (file === 'subject') raw[folder].meta = content;
  else raw[folder].lectures[file] = content;
}

export const subjects = Object.entries(raw)
  .filter(([, s]) => s.meta)
  .map(([folder, s]) => {
    const order = s.meta.lectures ?? Object.keys(s.lectures).sort();
    const lectures = order
      .filter((id) => s.lectures[id])
      .map((id) => {
        const lec = s.lectures[id];
        return {
          id: lec.id ?? id,
          title: lec.title ?? id,
          questions: lec.questions.map((q) => ({
            ...q,
            uid: `${s.meta.id ?? folder}:${q.id}`,
            subjectId: s.meta.id ?? folder,
            lectureId: lec.id ?? id,
            lectureTitle: lec.title ?? id,
          })),
        };
      });
    return { ...s.meta, id: s.meta.id ?? folder, lectures };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'pl'));

export const allQuestions = subjects.flatMap((s) => s.lectures.flatMap((l) => l.questions));

export function subjectById(id) {
  return subjects.find((s) => s.id === id);
}
