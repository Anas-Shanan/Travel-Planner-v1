const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";

export function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 30) {
    return "Messages must contain between 1 and 30 entries.";
  }

  const validRoles = new Set(["system", "user", "assistant"]);
  const isValid = messages.every(
    (message) =>
      message &&
      validRoles.has(message.role) &&
      typeof message.content === "string" &&
      message.content.trim().length > 0 &&
      message.content.length <= 4000
  );

  return isValid ? null : "Each message must have a valid role and content.";
}

export async function fetchOpenRouterResponse(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const error = new Error("OPENROUTER_API_KEY is not configured on the server.");
    error.statusCode = 500;
    throw error;
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = new Error(`OpenRouter returned ${response.status}.`);
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  const content = choice?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    const completionTokens = data.usage?.completion_tokens ?? "unknown";
    const reasoningTokens =
      data.usage?.completion_tokens_details?.reasoning_tokens ?? "unknown";
    const error = new Error(
      `OpenRouter returned no text (model: ${data.model || "unknown"}, finish reason: ${choice?.finish_reason || "unknown"}, completion tokens: ${completionTokens}, reasoning tokens: ${reasoningTokens}).`
    );
    error.statusCode = 502;
    throw error;
  }

  return content.trim();
}
