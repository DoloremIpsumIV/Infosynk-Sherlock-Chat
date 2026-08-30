function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "message-row--user" : "message-row--assistant"
      }`}
    >
      {!isUser && (
        <div className="avatar">
          <img src="/sherlock-logo.svg" alt="placeholder" />
        </div>
      )}

      <div
        className={`message ${isUser ? "message--user" : "message--assistant"}`}
      >
        {!isUser && <span className="message-author">Sherlock</span>}

        <p>{message.content}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
