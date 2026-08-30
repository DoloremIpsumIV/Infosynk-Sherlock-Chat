import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({
  messages,
  isThinking,
  activeTypingMessageId,
  onTypewriterCharacter,
  onTypingComplete,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  return (
    <div className="chat-messages" aria-live="polite">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onTypewriterCharacter={onTypewriterCharacter}
          onTypingComplete={onTypingComplete}
          isActiveTyping={message.id === activeTypingMessageId}
        />
      ))}

      {isThinking && (
        <div className="typing-indicator">
          <span className="typing-indicator__dots">
            <i />
            <i />
            <i />
          </span>
          Sherlock is investigating...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;
