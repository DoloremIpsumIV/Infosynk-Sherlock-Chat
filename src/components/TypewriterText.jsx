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

function TypewriterText({ text, onComplete }) {
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
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        onComplete?.();
        return;
      }

      const typedCharacter = text[index - 1];
      timeoutId = window.setTimeout(
        typeNextCharacter,
        getCharacterDelay(typedCharacter),
      );
    };

    timeoutId = window.setTimeout(
      typeNextCharacter,
      getCharacterDelay(text[0]),
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [text, onComplete]);

  return <p>{visibleText}</p>;
}

export default TypewriterText;
