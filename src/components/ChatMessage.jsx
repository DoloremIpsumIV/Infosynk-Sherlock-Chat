import { useCallback } from "react";
import TypewriterText from "./TypewriterText";

function ChatMessage({ message, onTypingComplete }) {
  const isUser = message.role === "user";
  const handleTypingComplete = useCallback(() => {
    onTypingComplete?.(message.id);
  }, [message.id, onTypingComplete]);

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

        {message.role === "assistant" && message.animate ? (
          <TypewriterText
            text={message.content}
            onComplete={handleTypingComplete}
          />
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
