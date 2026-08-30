function ChatInput() {
  return (
    <form className="chat-input">
      <input
        type="text"
        placeholder="Ask Sherlock about the case..."
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}

export default ChatInput;