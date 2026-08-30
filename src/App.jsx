import "./App.css";

function App() {
  return (
    <div className="app">
      <main className="chat">
        <header className="chat-header">
          <div className="sherlock-avatar">
            <img src="/sherlock-logo.svg" alt="placeholder" />
          </div>

          <div>
            <h1>Sherlock Chat</h1>
            <p>AI Detective Assistant</p>
          </div>
        </header>

        <div className="chat-messages">
          <div className="message-row">
            <div className="avatar">
              <img src="/sherlock-logo.svg" alt="placeholder" />
            </div>

            <div className="message message--assistant">
              <span className="message-author">Sherlock</span>
              <p>
                Good evening, Detective. What would you like me to investigate?
              </p>
            </div>
          </div>
        </div>

        <form className="chat-input">
          <input type="text" placeholder="Ask Sherlock about the case..." />

          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;
