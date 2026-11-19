import {
  fetchOpenRouterResponse,
  validateMessages,
} from "../server/openrouter.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const messages = request.body?.messages;
  const validationError = validateMessages(messages);
  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  try {
    const content = await fetchOpenRouterResponse(messages);
    return response.status(200).json({ content });
  } catch (error) {
    console.error("OpenRouter chat request failed:", error);
    return response
      .status(error.statusCode || 500)
      .json({ error: error.message || "Unable to get an AI response." });
  }
}
