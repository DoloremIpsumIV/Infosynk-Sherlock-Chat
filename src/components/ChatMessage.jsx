import TypewriterText from "./TypewriterText";

function ChatMessage({
  message,
  onTypewriterCharacter,
  onTypingComplete,
  isActiveTyping,
}) {
  const isUser = message.role === "user";
  const rowClass = `message-row ${
    isUser ? "message-row--user" : "message-row--assistant"
  }`;
  const messageClass = `message ${
    isUser ? "message--user" : "message--assistant"
  }`;

  return (
    <div className={rowClass}>
      {!isUser && (
        <div className="avatar" aria-hidden="true">
          <img alt="" src="/sherlock-logo.svg" />
        </div>
      )}

      <div className={messageClass}>
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
