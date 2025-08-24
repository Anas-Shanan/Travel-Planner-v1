import React from "react";
import { NavLink } from "react-router-dom";

export default function FavoritesList({ favorites, dispatch }) {
  console.log(favorites);

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">❤️</div>
        <div className="empty-state-title">No favorites yet</div>
        <div className="empty-state-text">
          Start exploring countries and add them to your favorites to see them
          here!
        </div>
        <NavLink
          to="/"
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Explore Countries
        </NavLink>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      {favorites &&
        favorites.map((country, index) => (
          <div key={index} className="favorite-item">
            <img
              src={country.flags?.png}
              alt={`${country.name.common} flag`}
              className="favorite-flag"
            />
            <div className="favorite-info">
              <h3 className="favorite-name">{country.name.common}</h3>
              {country.capital?.[0] && (
                <p className="favorite-capital">
                  Capital: {country.capital[0]}
                </p>
              )}
            </div>
            <div className="favorite-actions">
              <NavLink
                to={`/country/${encodeURIComponent(country.name.common)}`}
                className="btn btn-primary"
              >
                View Details
              </NavLink>
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_COUNTRY",
                    payload: { name: country.name },
                  })
                }
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
