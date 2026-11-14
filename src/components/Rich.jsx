import React from 'react';

// Renders plain text with light formatting used in question data:
//  ```code block```  -> monospaced block (newlines kept)
//  `inline code`     -> monospaced inline
// Only <span>s are produced, so it is safe inside <h2>, <p> and <button>.
export default function Rich({ text }) {
  if (typeof text !== 'string') return text ?? null;
  const blocks = text.split(/```([\s\S]*?)```/);
  return (
    <span className="rich">
      {blocks.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="codeblock">{part.replace(/^\n|\n$/g, '')}</span>
        ) : (
          part.split(/`([^`]+)`/).map((p, j) =>
            j % 2 === 1 ? <code key={`${i}-${j}`} className="code-inline">{p}</code> : <React.Fragment key={`${i}-${j}`}>{p}</React.Fragment>
          )
        )
      )}
    </span>
  );
}
