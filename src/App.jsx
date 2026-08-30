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

  const handleSendMessage = (text) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const sherlockMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: getSherlockResponse(text),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      sherlockMessage,
    ]);
  };

  return (
    <div className="app">
      <main className="chat">
        <ChatHeader />

        <ChatMessages messages={messages} />

        <ChatInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}

export default App;
