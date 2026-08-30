import { useEffect, useRef, useState } from "react";

const BASE_DELAY = 34;


function getCharacterDelay(character) {
  if (/[.!?]/.test(character)) return 190;
  if (/[,;:]/.test(character)) return 105;
  if (character === " ") return 18;
  return BASE_DELAY + Math.floor(Math.random() * 24);
}

function TypewriterText({ text, onCharacter, onComplete }) {
  const [visibleText, setVisibleText] = useState("");
  const indexRef = useRef(0);
  const onCharacterRef = useRef(onCharacter);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCharacterRef.current = onCharacter;
  }, [onCharacter]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    indexRef.current = 0;

    if (prefersReducedMotion) {
      setVisibleText(text);
      onCompleteRef.current?.();
      return undefined;
    }

    setVisibleText("");
    let timeoutId;
    let cancelled = false;

    const typeNextCharacter = () => {
      if (cancelled) return;

      const nextIndex = indexRef.current + 1;
      const character = text[indexRef.current];

      setVisibleText(text.slice(0, nextIndex));
      indexRef.current = nextIndex;

      if (character && !/\s/.test(character)) {
        onCharacterRef.current?.(character);
      }

      if (nextIndex >= text.length) {
        onCompleteRef.current?.();
        return;
      }

      timeoutId = window.setTimeout(
        typeNextCharacter,
        getCharacterDelay(character),
      );
    };

    timeoutId = window.setTimeout(typeNextCharacter, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <span className="typewriter-text">
      {visibleText}
      {visibleText.length < text.length && (
        <span className="typewriter-cursor" />
      )}
    </span>
  );
}

export default TypewriterText;
