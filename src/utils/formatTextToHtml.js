import React from "react";

export function splitTextIntoParagraphs(text) {
  const paragraphs = text.replace(/\\n/g, "\n").split("\n");

  return paragraphs.map((para, index) => {
    const parts = para.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.match(/\*\*(.*?)\*\*/) ? (
        <span className="font-bold text-black!" key={i}>
          {part.replace(/\*\*/g, "")}
        </span>
      ) : (
        part
      )
    );

    // Devolver un fragmento sin el <span> dentro del <p>
    return (
      <React.Fragment key={index}>
        {parts.length === 1 ? (
          <p>{parts}</p> // Si solo es un texto simple, envuelve en <p>
        ) : (
          parts // Si hay partes con span, simplemente las devuelve como una lista de elementos
        )}
      </React.Fragment>
    );
  });
}
