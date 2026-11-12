import React, { useCallback, useEffect, useState } from 'react';
import { subjects, allQuestions, subjectById } from './data.js';
import { loadProgress, saveProgress, grade } from './srs.js';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import SubjectView from './components/SubjectView.jsx';
import Quiz from './components/Quiz.jsx';
import Summary from './components/Summary.jsx';

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [view, setView] = useState({ name: 'home' });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view.name, view.id]);

  const answer = useCallback((uid, result) => {
    setProgress((p) => ({ ...p, [uid]: grade(p[uid], result) }));
  }, []);

  const startSession = (questions, mode, title, back) =>
    setView({ name: 'quiz', questions, mode, title, back, sid: Date.now() });

  const goBack = (back) => setView(back ?? { name: 'home' });

  let body;
  if (view.name === 'subject') {
    body = (
      <SubjectView
        subject={subjectById(view.id)}
        progress={progress}
        onBack={() => setView({ name: 'home' })}
        onStart={(qs, mode, title) => startSession(qs, mode, title, view)}
      />
    );
  } else if (view.name === 'quiz') {
    body = (
      <Quiz
        key={view.sid}
        questions={view.questions}
        mode={view.mode}
        title={view.title}
        onAnswer={answer}
        onExit={() => goBack(view.back)}
        onFinish={(results) => setView({ name: 'summary', results, mode: view.mode, title: view.title, back: view.back })}
      />
    );
  } else if (view.name === 'summary') {
    body = (
      <Summary
        results={view.results}
        mode={view.mode}
        title={view.title}
        onBack={() => goBack(view.back)}
        onRetry={(qs) => startSession(qs, 'smart', 'Powtórka błędów', view.back)}
      />
    );
  } else {
    body = (
      <Home
        subjects={subjects}
        allQuestions={allQuestions}
        progress={progress}
        onOpen={(id) => setView({ name: 'subject', id })}
        onStart={(qs, mode, title) => startSession(qs, mode, title, { name: 'home' })}
      />
    );
  }

  return (
    <div className="app">
      <Header
        progress={progress}
        setProgress={setProgress}
        onHome={view.name === 'quiz' ? null : () => setView({ name: 'home' })}
      />
      <main className="container">{body}</main>
    </div>
  );
}
