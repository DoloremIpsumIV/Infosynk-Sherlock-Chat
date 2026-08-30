import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
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
    const newMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);
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
