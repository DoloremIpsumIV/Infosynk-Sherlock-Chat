const fallbackResponses = [
  "Interesting. Tell me more about what you've observed.",
  "Every detail matters. What else do we know?",
  "There may be more to this than first appears.",
  "Alright, that seems like something to keep in mind.",
  "Hmm, okay, curious...",
];

export function getSherlockResponse(message) {
  const text = message.toLowerCase();

  if (text.includes("suspect")) {
    return "A suspect should never be judged by appearances alone. We need motive, opportunity, and evidence.";
  }

  if (text.includes("evidence")) {
    return "Evidence is only useful when considered in context. What exactly was found?";
  }

  if (text.includes("alibi")) {
    return "An alibi is only as strong as the person or evidence supporting it.";
  }

  if (text.includes("victim")) {
    return "Understanding the victim may tell us why the crime occurred.";
  }

  if (text.includes("murder")) {
    return "Then we must establish motive, means, and opportunity.";
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Good evening, Detective. What mystery are we examining today?";
  }

  return fallbackResponses[
    Math.floor(Math.random() * fallbackResponses.length)
  ];
}
