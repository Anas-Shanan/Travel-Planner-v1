const requestChatResponse = async (messages) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `AI request failed (${response.status}).`);
  }

  return data.content;
};

export const fetchChatResponse = async (countryName) =>
  requestChatResponse([
    {
      role: "user",
      content: `Travel question about ${countryName}. Format as: Itinerary: [3-day plan]. Suggestions: [general tips].`,
    },
  ]);

export const fetchChatBotResponse = async (
  userInput,
  countryName = null,
  conversationHistory = []
) => {
  const systemMessage = countryName
    ? `You are a helpful travel assistant. The user is currently viewing information about ${countryName}. Provide relevant travel advice, tips, and information about ${countryName}. Keep responses concise and helpful.`
    : "You are a helpful travel assistant. Provide relevant travel advice and information. Keep responses concise and helpful.";

  const messages = [
    { role: "system", content: systemMessage },
    ...conversationHistory.slice(-20).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: userInput },
  ];

  return requestChatResponse(messages);
};
