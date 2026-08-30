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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="chat-messages" aria-live="polite">
      {messages.map((message) => {
        const isCurrentTypingMessage = message.id === activeTypingMessageId;

        return (
          <ChatMessage
            key={message.id}
            message={message}
            isActiveTyping={isCurrentTypingMessage}
            onTypewriterCharacter={onTypewriterCharacter}
            onTypingComplete={onTypingComplete}
          />
        );
      })}

      {isThinking && (
        <div className="typing-indicator">
          <span className="typing-indicator__dots" aria-hidden="true">
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
