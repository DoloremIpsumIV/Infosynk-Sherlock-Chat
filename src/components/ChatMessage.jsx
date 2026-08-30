import TypewriterText from "./TypewriterText";

function ChatMessage({
  message,
  onTypewriterCharacter,
  onTypingComplete,
  isActiveTyping,
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "message-row--user" : "message-row--assistant"
      }`}
    >
      {!isUser && (
        <div className="avatar">
          <img src="/sherlock-logo.svg" alt="Logo of AI sherlock" />
        </div>
      )}

      <div
        className={`message ${isUser ? "message--user" : "message--assistant"}`}
      >
        {!isUser && <span className="message-author">Sherlock</span>}

        <p>
          {isUser || message.animate === false ? (
            message.content
          ) : (
            <TypewriterText
              text={message.content}
              onCharacter={onTypewriterCharacter}
              onComplete={isActiveTyping ? onTypingComplete : undefined}
            />
          )}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
