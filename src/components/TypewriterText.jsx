import { useEffect, useState } from "react";

function getCharacterDelay(character) {
  if (/[.!?]/.test(character)) {
    return 190;
  }

  if (/[,;:]/.test(character)) {
    return 105;
  }

  if (character === " ") {
    return 18;
  }

  return 30 + Math.floor(Math.random() * 24);
}

function TypewriterText({ text, onCharacter, onComplete }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");

    if (!text) {
      onComplete?.();
      return undefined;
    }

    let index = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      const character = text[index];
      index += 1;

      setVisibleText(text.slice(0, index));
      onCharacter?.(character);

      if (index >= text.length) {
        onComplete?.();
        return;
      }

      timeoutId = window.setTimeout(
        typeNextCharacter,
        getCharacterDelay(character),
      );
    };

    timeoutId = window.setTimeout(
      typeNextCharacter,
      getCharacterDelay(text[0]),
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [text, onCharacter, onComplete]);

  return <p>{visibleText}</p>;
}

export default TypewriterText;
