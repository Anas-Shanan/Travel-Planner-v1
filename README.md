# Travel Planner

> A small React + Vite app to browse countries, view details and save favorites.

This repository contains a lightweight travel explorer demo that uses the Rest Countries API to show country information and flags. It includes a Home page with a search and continent filter, a Favorites feature (context), and a country details page.

## What you'll find here

- React (Vite) single-page app
- Components under `src/components/` (common, Home, etc.)
- Pages under `src/Pages/` (HomePage, CountryDetailsPage, FavoritesPage)
- Context for favorites in `src/Context/`

## Quick demo

1. Install dependencies

```bash
# from repo root
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

> These commands assume the project was created with Vite (the usual scripts are `dev`, `build`, `preview`). If your `package.json` has different script names, use those instead.

## Requirements

- Node.js 16+ (recommended)
- npm (or use yarn/pnpm if you prefer; adjust commands accordingly)

## Project structure

```
Travel-Planner/
  public/
  src/
    assets/
    components/
      common/          # CountryCard, Navbar, Footer, etc.
      Home/            # SearchBar, HeroBanner, ContinentFilter
    Context/
      FevoritesContext.js
    Pages/
      HomePage.jsx
      CountryDetailsPage.jsx
      FavoritesPage.jsx
      PageNotFound.jsx
    App.jsx
    main.jsx
  package.json
  vite.config.js
  README.md
```

## How it works (API + CORS notes)

The app fetches country data from the Rest Countries API. During development you may encounter CORS or API validation errors (for example the API may require a `fields` query param in some configurations, or the server may not send `Access-Control-Allow-Origin` for direct browser requests).

If you see CORS errors in the browser console (blocked by CORS), you have a few options:

1. Use a backend proxy (recommended): create a small Node/Express proxy that fetches from `https://restcountries.com` and returns the data to your frontend. The browser will allow requests to your backend.

Example (minimal proxy):

```javascript
// server.js
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));
const app = express();

app.get("/api/countries", async (req, res) => {
  try {
    const r = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,languages,currencies"
    );
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Proxy listening on http://localhost:3001"));
```

Then change the fetch URL in the React app to `http://localhost:3001/api/countries`.

2. Use a public CORS proxy (not recommended for production). Example: `https://cors.bridged.cc/https://restcountries.com/v3.1/all` — availability and reliability vary.

3. If you only need a few fields and the API supports it, use the `fields` query parameter to request only the fields you need (example: `?fields=name,flags,capital`). Note: in some configurations the API may return 400 if `fields` is missing; adjust accordingly.

## Development tips

- Use `countries.slice(0, 10)` to show a smaller set for faster rendering while developing the UI.
- When mapping API items to components, be careful: `country.name` is an object (`{ common, official, nativeName }`), so use `country.name.common` for display. Flags are under `country.flags.png` (or `svg`) and capital is usually an array (`country.capital[0]`).
- Keys in lists must be primitive and unique: use `country.name.official` or `country.cca3` if present.

## Known issues

- CORS: depending on the API and environment, you may need to run a local proxy.
- The Rest Countries API may sometimes change behavior; if you see `400` with message about `fields`, include a proper `fields` param.

## Contributing

1. Fork the repo
2. Create a branch for your feature
3. Open a pull request with a description of your changes

## License

Add a license of your choice. (MIT is common for small projects.)

---

If you'd like, I can also:

- add a ready-to-run Express proxy in a new `server/` folder,
- or update `HomePage.jsx` to use the proxy URL and improve filtering/search.

Enjoy! 🚀
