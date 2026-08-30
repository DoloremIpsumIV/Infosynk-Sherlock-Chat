import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

function ChatMessages({ messages, isThinking }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isThinking && (
        <div className="thinking">
          Sherlock is investigating
          <span className="thinking-dots">...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;