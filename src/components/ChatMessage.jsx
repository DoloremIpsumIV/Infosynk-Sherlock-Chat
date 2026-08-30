function ChatMessage({ message }) {
  return (
    <div className="message-row">
      <div className="avatar">
        <img src="/sherlock-logo.svg" alt="placeholderr" />
      </div>

      <div className="message message--assistant">
        <span className="message-author">Sherlock</span>
        <p>{message.content}</p>
      </div>
    </div>
  );
}

export default ChatMessage;