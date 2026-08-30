function ChatHeader({ audioEnabled, onToggleAudio }) {
  return (
    <header className="chat-header">
      <div className="sherlock-avatar">
        <img src="/sherlock-logo.svg" alt="Logo of AI sherlock" />
      </div>

      <div className="chat-header__title">
        <h1>Sherlock Chat</h1>
        <p>AI Detective Assistant</p>
      </div>

      <button
        className="audio-toggle"
        onClick={onToggleAudio}
        type="button"
        aria-pressed={audioEnabled}
        aria-label={audioEnabled ? "Mute typewriter sound" : "Enable typewriter sound"}
      >
        {audioEnabled ? "Sound on" : "Sound off"}
      </button>
    </header>
  );
}

export default ChatHeader;
