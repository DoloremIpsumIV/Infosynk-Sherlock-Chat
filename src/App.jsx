import { useState } from "react";
import ChatInput from "./components/ChatInput";
import { getSherlockResponse } from "./data/responses";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Good evening, Detective. What would you like me to investigate?",
    },
  ]);

  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = (text) => {
    if (!text.trim() || isThinking) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    setIsThinking(true);

    window.setTimeout(() => {
      const sherlockMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getSherlockResponse(text),
      };

      setMessages((currentMessages) => [...currentMessages, sherlockMessage]);

      setIsThinking(false);
    }, 850);
  };

  return (
    <div className="app">
      <main className="chat">
        <ChatHeader />

        <ChatMessages messages={messages} isThinking={isThinking} />

        <ChatInput onSendMessage={handleSendMessage} disabled={isThinking} />
      </main>
    </div>
  );
}

export default App;
