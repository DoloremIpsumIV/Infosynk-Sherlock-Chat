import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import "./App.css";

function App() {
  const welcomeMessage = {
    id: 1,
    role: "assistant",
    content: "Good evening, Detective. What would you like me to investigate?",
  };
  return (
    <div className="app">
      <main className="chat">
        <ChatHeader message={welcomeMessage}/>

        <div className="chat-messages">
          <ChatMessage message={welcomeMessage} />
        </div>

        <ChatInput />
      </main>
    </div>
  );
}

export default App;
