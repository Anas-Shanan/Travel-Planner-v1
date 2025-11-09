import React from "react";
import FavoritesList from "../components/FavoritesList";
import { useFavorites } from "../Context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, dispatch } = useFavorites();

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          My Favorite Countries
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            margin: 0,
          }}
        >
          {favorites.length} {favorites.length === 1 ? "country" : "countries"}{" "}
          saved
        </p>
      </div>
      <FavoritesList favorites={favorites} dispatch={dispatch} />
    </div>
  );
}
