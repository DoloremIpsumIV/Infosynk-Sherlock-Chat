import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import "./App.css";

// Simulating fake convo and showing it works fine
const messages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Good evening, Detective. What would you like me to investigate?",
  },
  {
    id: 2,
    role: "user",
    content:
      "I want to know more about the suspect?",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "Then we should look at their alibi.",
  },
];

function App() {
  return (
    <div className="app">
      <main className="chat">
        <ChatHeader />

        <ChatMessages messages={messages} />

        <ChatInput />
      </main>
    </div>
  );
}

export default App;