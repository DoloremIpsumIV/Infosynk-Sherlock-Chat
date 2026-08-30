# Sherlock Chat

Sherlock Chat is a small React/Vite front-end project built around a detective-themed chat interface. The user can ask Sherlock about a case and receive locally mocked replies with a short thinking state, a typewriter animation, and optional typing audio.

The project intentionally has no backend and does not call an AI API. Keeping the responses local makes the example focused on React component structure, UI state, responsiveness, and interaction details.

## Run locally

### Requirements

- Node.js 20.19+
- npm

### Setup

```bash
npm install
npm run dev
```

Vite will show the local development address in the terminal.

## What is included

- User-to-Sherlock chat flow with mocked local responses
- A short investigating/thinking delay before each assistant reply
- Typewriter-style assistant messages with punctuation-aware timing
- Responsive desktop/mobile layout with an independently scrolling message area
- Reduced-motion handling for users who prefer less animation
- Disabled/focus/hover states for the input controls
- Sherlock logo used in the header, assistant avatar, and favicon
- A visible reminder that generated answers can be inaccurate

The included typewriter sound is based on the Freesound asset by BMacZero (sound 160678). The Sherlock SVG branding used in the interface is included in the `public` folder.

## Structure

```text
src/
  components/
    ChatHeader.jsx
    ChatInput.jsx
    ChatMessage.jsx
    ChatMessages.jsx
    TypewriterText.jsx
  data/
    responses.js
  App.jsx
  App.css
  index.css
  main.jsx
public/
  sherlock-logo.svg
  typewriter.wav
```

`App.jsx` owns the conversation, thinking state, active typing state, and sound preference. The smaller components are mainly responsible for rendering one part of the interface, while `responses.js` keeps the mocked response selection separate from the UI.

## Implementation notes

### Mock responses

A few case-related keywords such as `suspect`, `evidence`, `alibi`, `victim`, and `murder` receive targeted replies. Everything else uses a small fallback pool. This is enough to demonstrate the interaction without introducing a backend service.

### Typing and audio

Assistant replies are revealed one character at a time. Punctuation uses longer delays than ordinary letters so the animation reads more naturally. Short audio samples are played through the Web Audio API, allowing consecutive keystroke sounds to overlap.

Browsers commonly keep Web Audio suspended until the user interacts with the page. The sound is therefore preloaded when possible and the audio context is unlocked on the first pointer or keyboard interaction. The initial Sherlock greeting is already visible instead of animating on page load.

### Styling

The UI uses plain CSS rather than a component or styling library. The layout is a single chat column with a fixed viewport shell, scrollable messages, responsive spacing, and mobile `svh` handling.

## Scope

For this exercise the focus is the front-end experience, so the project does not include authentication, persistent conversation history, a database, a real AI integration, or third-party state management. Those would be natural additions if the project were expanded beyond a small demonstration.
