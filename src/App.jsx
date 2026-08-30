import { useCallback, useEffect, useRef, useState } from "react";
import ChatInput from "./components/ChatInput";
import { getSherlockResponse } from "./data/responses";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

const AUDIO_STORAGE_KEY = "sherlock-audio-enabled";
const TYPEWRITER_SOUND_URL = "/typewriter.wav";

function App() {
  const [messages, setMessages] = useState(() => [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Good evening, Detective. What would you like me to investigate?",
      animate: false,
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [activeTypingMessageId, setActiveTypingMessageId] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(() => {
    try {
      return localStorage.getItem(AUDIO_STORAGE_KEY) !== "false";
    } catch {
      return true;
    }
  });

  const audioEnabledRef = useRef(audioEnabled);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioLoadPromiseRef = useRef(null);
  const audioUnlockedRef = useRef(false);

  const isBusy = isThinking || activeTypingMessageId !== null;

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }, []);

  const preloadTypewriterSound = useCallback(async () => {
    if (audioBufferRef.current) {
      return audioBufferRef.current;
    }

    if (audioLoadPromiseRef.current) {
      return audioLoadPromiseRef.current;
    }

    const context = getAudioContext();

    if (!context) {
      return null;
    }

    audioLoadPromiseRef.current = fetch(TYPEWRITER_SOUND_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load typewriter sound");
        }

        return response.arrayBuffer();
      })
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        audioBufferRef.current = audioBuffer;
        return audioBuffer;
      })
      .catch(() => {
        audioLoadPromiseRef.current = null;
        return null;
      });

    return audioLoadPromiseRef.current;
  }, [getAudioContext]);

  useEffect(() => {
    try {
      localStorage.setItem(AUDIO_STORAGE_KEY, String(audioEnabled));
    } catch {
      // The preference is optional if storage is unavailable.
    }
  }, [audioEnabled]);

  useEffect(() => {
    const unlockAudio = () => {
      audioUnlockedRef.current = true;
      const context = getAudioContext();

      if (context?.state === "suspended") {
        void context.resume();
      }

      void preloadTypewriterSound();

      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [getAudioContext, preloadTypewriterSound]);

  useEffect(
    () => () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    },
    [],
  );

  const handleSendMessage = (text) => {
    if (!text.trim() || isBusy) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsThinking(true);

    window.setTimeout(() => {
      const id = crypto.randomUUID();
      const sherlockMessage = {
        id,
        role: "assistant",
        content: getSherlockResponse(text),
        animate: true,
      };

      setActiveTypingMessageId(id);
      setMessages((currentMessages) => [...currentMessages, sherlockMessage]);
      setIsThinking(false);
    }, 850);
  };

  const handleTypingComplete = useCallback((messageId) => {
    setActiveTypingMessageId((currentId) =>
      currentId === messageId ? null : currentId,
    );
  }, []);

  const handleCharacter = useCallback(
    (character) => {
      if (!audioEnabledRef.current || !audioUnlockedRef.current) {
        return;
      }

      const context = audioContextRef.current;
      const buffer = audioBufferRef.current;

      if (!context || !buffer) {
        void preloadTypewriterSound();
        return;
      }

      if (context.state === "suspended") {
        void context.resume();
      }

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start();
    },
    [preloadTypewriterSound],
  );

  const handleToggleAudio = useCallback(() => {
    setAudioEnabled((currentValue) => {
      const nextValue = !currentValue;
      audioEnabledRef.current = nextValue;
      return nextValue;
    });
  }, []);

  return (
    <div className="app">
      <main className="chat">
        <ChatHeader
          audioEnabled={audioEnabled}
          onToggleAudio={handleToggleAudio}
        />

        <ChatMessages
          messages={messages}
          isThinking={isThinking}
          onCharacter={handleCharacter}
          onTypingComplete={handleTypingComplete}
        />

        <ChatInput onSendMessage={handleSendMessage} disabled={isBusy} />
      </main>
    </div>
  );
}

export default App;
