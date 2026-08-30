import { useCallback, useState } from "react";
import ChatInput from "./components/ChatInput";
import { getSherlockResponse } from "./data/responses";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

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

  const isBusy = isThinking || activeTypingMessageId !== null;

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

  return (
    <div className="app">
      <main className="chat">
        <ChatHeader />

        <ChatMessages
          messages={messages}
          isThinking={isThinking}
          onTypingComplete={handleTypingComplete}
        />

        <ChatInput onSendMessage={handleSendMessage} disabled={isBusy} />
      </main>
    </div>
  );
}

export default App;
