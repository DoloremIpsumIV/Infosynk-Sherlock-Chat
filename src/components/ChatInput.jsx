import { useState } from "react";

function ChatInput({ onSendMessage, disabled }) {
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
        disabled={disabled}
        aria-label="Message Sherlock"
      />

      <button type="submit" disabled={!input.trim() || disabled}>
        Send
      </button>
    </form>
  );
}

export default ChatInput;
