# Travel Planner

> A small React + Vite app to browse countries, view details and save favorites.

This repository contains a lightweight travel explorer demo that uses the Rest Countries API to show country information and flags. It includes a Home page with a search and continent filter, a Favorites feature (context), and a country details page.

## Live demo

See the deployed app on Vercel: https://travelplanner-pi.vercel.app/

## What you'll find here

- React (Vite) single-page app
- Components under `src/components/` (common, Home, etc.)
- Pages under `src/Pages/` (HomePage, CountryDetailsPage, FavoritesPage)
- Context for favorites in `src/Context/`
- AI features: a 3-day trip planner and a ChatGPT-powered chatbot (see `src/components/services/AiApi.js`)

# Travel Planner

A small React + Vite app to browse countries, view details, save favorites, and get AI-powered travel help.

This demo app uses the Rest Countries API for country data and integrates a small AI assistant (ChatGPT) to generate 3-day itineraries and answer travel questions.

## Key features

- Browse countries (search + continent filter) from the Home page
- Country details page with statistics, flag, map (Mapbox), and actions
- Favorites (persisted to localStorage) via a React Context (`src/Context/FavoritesContext.jsx`)
- AI features:
  - 3-day trip planner (generates a concise 3-day itinerary for the selected country)
  - ChatGPT-powered chatbot (conversational travel assistant shown on the country details page)

## Tech & notable deps

- React + Vite
- react-router-dom for routing
- framer-motion for small animations
- mapbox-gl / react-map-gl for the country map (optional, requires `VITE_MAPBOX_TOKEN`)

# Travel Planner

A small React + Vite app to browse countries, view details, save favorites, and get AI-powered travel help.

This demo app uses the Rest Countries API for country data and integrates a small AI assistant (ChatGPT) to generate 3-day itineraries and answer travel questions.

## Key features

- Browse countries (search + continent filter) from the Home page
- Country details page with statistics, flag, map (Mapbox), and actions
- Favorites (persisted to localStorage) via a React Context (`src/Context/FavoritesContext.jsx`)
- AI features:
  - 3-day trip planner (generates a concise 3-day itinerary for the selected country)
  - ChatGPT-powered chatbot (conversational travel assistant shown on the country details page)

## Tech & notable deps

- React + Vite
- react-router-dom for routing
- framer-motion for small animations
- mapbox-gl / react-map-gl for the country map (optional, requires `VITE_MAPBOX_TOKEN`)

See `package.json` for the full list of dependencies.

## Project structure (important files)

```
src/
  components/
    common/                # CountryCard, Navbar, Footer
    Home/                  # HeroBanner, SearchBar, ContinentFilter
    services/AiApi.js      # ChatGPT + itinerary helper (OpenAI integration)
    CountryDetails.jsx     # UI that calls AI and shows map
  Context/
    FavoritesContext.jsx   # Favorites state (localStorage)
  Pages/
    HomePage.jsx
    CountryDetailsPage.jsx # Chat + itinerary wired here
    FavoritesPage.jsx
  App.jsx
  main.jsx
```

## Quick start

1. Install dependencies

```bash
# from repo root
npm install
```

2. Add environment variables (for AI and Mapbox)

Create a `.env` file in the project root (Vite requires env vars to start with `VITE_`):

```env
VITE_OPENAI_API_KEY=sk-...your-openai-key...
VITE_MAPBOX_TOKEN=pk. ...optional Mapbox token...
```

Do NOT commit `.env` to source control. Add it to `.gitignore`.

3. Run the dev server

```bash
npm run dev
```

4. Build / preview

```bash
npm run build
npm run preview
```

## AI features — how to use

- 3-day trip planner: On a country's details page click the "✈️ Get 3-Day Travel Plan" button. The app calls `fetchChatResponse` in `src/components/services/AiApi.js` and displays the result in the details panel.

- ChatGPT chatbot: The right-side chat panel on the country details page is a simple conversational UI. Type a question and submit; the app calls `fetchChatBotResponse` in `src/components/services/AiApi.js` using the same `VITE_OPENAI_API_KEY`.

Notes:

- The AI service expects the OpenAI key in `import.meta.env.VITE_OPENAI_API_KEY` (see `AiApi.js`).
- Keep prompts concise; the app requests the `gpt-3.5-turbo` model with a token limit to keep responses short.

## Data & caching

- Countries are fetched from the public Rest Countries API and cached to `localStorage` under the key `countries` to avoid extra API calls during development. See `src/Pages/HomePage.jsx` for the exact fields requested.
- Favorites are managed via `FavoritesContext` and persisted to `localStorage` under the key `favorites`.

## Mapbox

If you want the map to render in the country details view, set `VITE_MAPBOX_TOKEN` in your `.env`. If you don't provide a token the map section will not render.

## CORS / API notes

- If you run into CORS issues fetching from `https://restcountries.com`, use a small server-side proxy or a temporary public CORS proxy while developing. A minimal Express proxy example (server.js) can forward the request to the Rest Countries API and return JSON to your frontend.

## Development tips

- While building UI, use `countries.slice(0, 10)` to speed up rendering.
- When reading country data remember `country.name` is an object — use `country.name.common` for display. Flags are at `country.flags.png` or `country.flags.svg`.

## Known issues

- Rest Countries API behavior can change (fields param, occasional 400). If you see `400` about `fields`, include the proper `fields` query.
- The project stores small amounts of data in `localStorage`; clear it when testing different scenarios.

## Contributing

1. Fork the repo
2. Create a branch for your feature
3. Open a pull request with a description of your changes

## License

Choose a license (MIT is common for small demos).

---

Enjoy! 🚀
