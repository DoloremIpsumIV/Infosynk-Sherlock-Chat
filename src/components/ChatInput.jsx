import { useState } from "react";

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input.trim()) return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Ask Sherlock about the case..."
      />

      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
