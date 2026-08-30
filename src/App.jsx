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
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

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
    const trimmedText = text.trim();

    if (!trimmedText || isBusy) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedText,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsThinking(true);

    window.setTimeout(() => {
      const id = crypto.randomUUID();

      const sherlockMessage = {
        id,
        role: "assistant",
        content: getSherlockResponse(trimmedText),
        animate: true,
      };

      setActiveTypingMessageId(id);
      setMessages((currentMessages) => [...currentMessages, sherlockMessage]);
      setIsThinking(false);
    }, 850);
  };

  const handleTypingComplete = useCallback(() => {
    setActiveTypingMessageId(null);
  }, []);

  const handleCharacter = useCallback(() => {
    if (!audioEnabledRef.current || !audioUnlockedRef.current) {
      return;
    }

    const context = audioContextRef.current;
    const buffer = audioBufferRef.current;

    if (!context || !buffer) {
      void preloadTypewriterSound();
      return;
    }

    if (context.state !== "running") {
      return;
    }

    const source = context.createBufferSource();
    const gain = context.createGain();

    source.buffer = buffer;
    source.playbackRate.value = 0.94 + Math.random() * 0.12;
    gain.gain.value = 0.18;

    source.connect(gain);
    gain.connect(context.destination);
    source.start();
  }, [preloadTypewriterSound]);

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
          activeTypingMessageId={activeTypingMessageId}
          onTypewriterCharacter={handleCharacter}
          onTypingComplete={handleTypingComplete}
        />

        <ChatInput onSendMessage={handleSendMessage} disabled={isBusy} />
      </main>
    </div>
  );
}

export default App;
