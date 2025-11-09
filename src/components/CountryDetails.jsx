import React from "react";
import { NavLink } from "react-router-dom";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function CountryDetails({
  country,
  favorites,
  dispatch,
  travelSuggestions,
  onFetchTravelSuggestions,
  isAiLoading,
}) {
  const isFavorite =
    Array.isArray(favorites) &&
    favorites.some((fav) => fav.name?.common === country.name?.common);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_COUNTRY", payload: { name: country.name } });
    } else {
      dispatch({ type: "ADD_COUNTRY", payload: country });
    }
  };

  const latlng = country.latlng;

  if (!country) return <div>No country data available.</div>;

  return (
    <div className="country-details-container">
      <div className="country-details">
        {/* Header with flag and basic info */}
        <div className="country-header">
          {country.flags?.png && (
            <img
              src={country.flags.png}
              alt={`${country.name?.common || "flag"}`}
              className="country-flag"
            />
          )}
          <div className="country-info">
            <h1 className="country-title">
              {country.name?.common || "No name available"}
            </h1>
            <p className="country-official">
              {country.name?.official || "No official name available"}
            </p>
          </div>
        </div>

        {/* Country Statistics Grid */}
        <div className="country-stats">
          <div className="stat-item">
            <div className="stat-label">Capital</div>
            <div className="stat-value">{country.capital?.[0] || "N/A"}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Region</div>
            <div className="stat-value">{country.region || "N/A"}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Subregion</div>
            <div className="stat-value">{country.subregion || "N/A"}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Population</div>
            <div className="stat-value">
              {country.population ? country.population.toLocaleString() : "N/A"}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Languages</div>
            <div className="stat-value">
              {country.languages
                ? Array.isArray(country.languages)
                  ? country.languages.join(", ")
                  : typeof country.languages === "object"
                  ? Object.values(country.languages).join(", ")
                  : String(country.languages)
                : "N/A"}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Currencies</div>
            <div className="stat-value">
              {country.currencies
                ? typeof country.currencies === "object"
                  ? Object.values(country.currencies)
                      .map((cur) => cur?.name || cur?.code || "Unknown")
                      .filter(Boolean)
                      .join(", ")
                  : String(country.currencies)
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <NavLink to="/" className="btn btn-primary">
            ← Back to Home
          </NavLink>
          <button
            onClick={handleFavoriteToggle}
            className={`btn ${isFavorite ? "btn-danger" : "btn-success"}`}
          >
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>
          <button
            onClick={onFetchTravelSuggestions}
            className="btn btn-secondary"
            disabled={isAiLoading}
          >
            {isAiLoading ? (
              <>
                <span className="loading-spinner"></span>
                Loading...
              </>
            ) : (
              "✈️ Get 3-Day Travel Plan"
            )}
          </button>
        </div>

        {/* Travel Suggestions */}
        {travelSuggestions && (
          <div className="travel-suggestions">
            <h3>Travel Plan for {country.name.common}</h3>
            <p>{travelSuggestions}</p>
          </div>
        )}

        {/* Map */}
        {latlng && latlng.length === 2 && (
          <div className="map-container">
            <Map
              initialViewState={{
                longitude: latlng[1],
                latitude: latlng[0],
                zoom: 4,
              }}
              style={{ width: "100%", height: 400 }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            >
              <Marker longitude={latlng[1]} latitude={latlng[0]} />
            </Map>
          </div>
        )}
      </div>
    </div>
  );
}
