export const fetchChatResponse = async (countryName) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Travel question about ${countryName}. Format as: Itinerary: [3-day plan]. Suggestions: [general tips].`,
          },
        ],
        max_tokens: 250,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch AI response");
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};

export const fetchChatBotResponse = async (
  userInput,
  countryName = null,
  conversationHistory = []
) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    // Create system message with country context
    const systemMessage = countryName
      ? `You are a helpful travel assistant. The user is currently viewing information about ${countryName}. Provide relevant travel advice, tips, and information about ${countryName}. Keep responses concise and helpful.`
      : `You are a helpful travel assistant. Provide relevant travel advice and information. Keep responses concise and helpful.`;

    // Build messages array with conversation history
    const messages = [
      { role: "system", content: systemMessage },
      ...conversationHistory.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: userInput },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 250,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch AI response");
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
