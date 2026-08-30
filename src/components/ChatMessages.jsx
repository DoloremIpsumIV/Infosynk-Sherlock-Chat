import ChatMessage from "./ChatMessage";

// Displays more than one message on screen, i.e simulates the convo
function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}

export default ChatMessages;