import React from 'react';

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

export default function AlphabetFilter({ selectedLetter, onSelectLetter, availableLetters = [] }) {
  return (
    <div className="alphabet-filter-wrapper">
      <div className="alphabet-label">A-Z Index:</div>
      <div className="alphabet-scroll">
        {ALPHABET.map((letter) => {
          const isAll = letter === 'ALL';
          const isSelected = isAll ? !selectedLetter : selectedLetter === letter;
          const hasTerms = isAll || availableLetters.includes(letter);

          return (
            <button
              key={letter}
              type="button"
              className={`alphabet-btn ${isSelected ? 'active' : ''} ${!hasTerms ? 'disabled' : ''}`}
              onClick={() => onSelectLetter(isAll ? '' : letter)}
              disabled={!hasTerms}
              title={hasTerms ? `View terms starting with ${letter}` : `No terms starting with ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
