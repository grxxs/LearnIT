import React from 'react';

// Renders plain text with light formatting used in question/notes data:
//  ```code block```  -> monospaced block (newlines kept)
//  `inline code`     -> monospaced inline
//  **bold**          -> <strong>
// Only <span>/<code>/<strong> are produced, so it is safe inside <h2>, <p> and <button>.
function inline(text, key) {
  return text.split(/`([^`]+)`/).map((p, j) => {
    if (j % 2 === 1) return <code key={`${key}-c${j}`} className="code-inline">{p}</code>;
    return p.split(/\*\*([^*]+)\*\*/).map((q, k) =>
      k % 2 === 1 ? <strong key={`${key}-${j}-b${k}`}>{q}</strong> : <React.Fragment key={`${key}-${j}-${k}`}>{q}</React.Fragment>
    );
  });
}

export default function Rich({ text }) {
  if (typeof text !== 'string') return text ?? null;
  const blocks = text.split(/```([\s\S]*?)```/);
  return (
    <span className="rich">
      {blocks.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="codeblock">{part.replace(/^\n|\n$/g, '')}</span>
        ) : (
          inline(part, i)
        )
      )}
    </span>
  );
}
