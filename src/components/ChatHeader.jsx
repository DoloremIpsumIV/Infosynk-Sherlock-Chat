function ChatHeader({ audioEnabled, onToggleAudio }) {
  return (
    <>
      <div className="ai-warning" role="note">
        <span>
          <strong>AI can be wrong.</strong> Sherlock may produce inaccurate or
          misleading information. Always fact-check important claims with
          reliable sources.
        </span>
      </div>

      <header className="chat-header">
        <div className="sherlock-avatar" aria-hidden="true">
          <img src="/sherlock-logo.svg" alt="" />
        </div>

        <div className="chat-header__identity">
          <h1>Sherlock Chat</h1>
          <p>
            <span className="status-dot" aria-hidden="true" />
            AI Detective Assistant
          </p>
        </div>

        <button
          className={`audio-toggle ${audioEnabled ? "is-on" : "is-off"}`}
          type="button"
          onClick={onToggleAudio}
          aria-pressed={audioEnabled}
          aria-label={
            audioEnabled ? "Mute typewriter sounds" : "Enable typewriter sounds"
          }
          title={
            audioEnabled ? "Mute typewriter sounds" : "Enable typewriter sounds"
          }
        >
          <span>{audioEnabled ? "Sound on" : "Sound off"}</span>
        </button>
      </header>
    </>
  );
}

export default ChatHeader;
