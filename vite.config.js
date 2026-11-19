import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  fetchOpenRouterResponse,
  validateMessages,
} from "./server/openrouter.js";

function openRouterDevApi() {
  return {
    name: "openrouter-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (request, response) => {
        if (request.method !== "POST") {
          response.setHeader("Allow", "POST");
          response.writeHead(405, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        try {
          const chunks = [];
          let size = 0;
          for await (const chunk of request) {
            size += chunk.length;
            if (size > 65536) {
              response.writeHead(413, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ error: "Request body is too large." }));
              return;
            }
            chunks.push(chunk);
          }

          const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          const validationError = validateMessages(body?.messages);
          if (validationError) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ error: validationError }));
            return;
          }

          const content = await fetchOpenRouterResponse(body.messages);
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ content }));
        } catch (error) {
          console.error("OpenRouter chat request failed:", error);
          response.writeHead(
            error.statusCode || (error instanceof SyntaxError ? 400 : 500),
            {
              "Content-Type": "application/json",
            }
          );
          response.end(
            JSON.stringify({
              error: error.message || "Unable to get an AI response.",
            })
          );
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (!process.env.OPENROUTER_API_KEY && env.OPENROUTER_API_KEY) {
    process.env.OPENROUTER_API_KEY = env.OPENROUTER_API_KEY;
  }

  return {
    plugins: [react(), openRouterDevApi()],
  };
})
