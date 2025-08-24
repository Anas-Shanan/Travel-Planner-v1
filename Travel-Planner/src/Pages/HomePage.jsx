import HeroBanner from "../components/Home/HeroBanner";
import ContinentFilter from "../components/Home/ContinentFilter";
import SearchBar from "../components/Home/SearchBar";
import CountryCard from "../components/common/CountryCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [_error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      setisLoading(true);
      try {
        const cachedCountries = localStorage.getItem("countries");

        if (cachedCountries) {
          const parsedCountries = JSON.parse(cachedCountries);
          console.log("Using cached countries data");
          setCountries(parsedCountries);
          setisLoading(false);

          return;
        }

        console.log("Fetching countries from API");
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,languages,currencies,flags,latlng"
        );
        if (!response.ok) {
          throw new Error("error fetching the data");
        }
        const data = await response.json();

        localStorage.setItem("countries", JSON.stringify(data));
        console.log("Countries data cached in localStorage");

        setCountries(data);
        setisLoading(false);
      } catch (error) {
        setError(error.message);
        setisLoading(false);
        console.error(error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredCountries(
        countries.filter((country) => {
          const matchesSearch = country.name.common
            .toLowerCase()
            .startsWith(search.toLowerCase());
          const matchesContinent =
            continent === "All" || country.region === continent;
          return matchesSearch && matchesContinent;
        })
      );
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [search, continent, countries]);

  const featuredCountryNames = [
    "France",
    "Spain",
    "United Kingdom",
    "Turkey",
    "China",
    "Egypt",
    "Brazil",
    "Ecuador",
    "Canada",
    "Australia",
  ];

  //  shown when continent is all and no search)
  const featuredCountries = featuredCountryNames
    .map((targetName) =>
      countries.find(
        (c) => c.name?.common?.toLowerCase() === targetName.toLowerCase()
      )
    )
    .filter(Boolean);

  //  when no search is active
  const continentCountries =
    continent !== "All"
      ? countries.filter((c) => c.region === continent).slice(0, 10)
      : [];

  const handleReset = () => {
    setContinent("All");
    setSearch("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <HeroBanner />

      {/* Search Section */}
      <div className="search-section">
        <div className="search-form">
          <ContinentFilter value={continent} onChange={setContinent} />
          <SearchBar value={search} onSearch={setSearch} />
          <div className="search-group">
            <button
              onClick={handleReset}
              className="btn btn-primary"
              style={{ opacity: search || continent !== "All" ? "1" : "0.5" }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {(search || continent !== "All") && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
              }}
            >
              🌍 Continent: <strong>{continent}</strong> | 🔎 Search:{" "}
              <strong>{search || "None"}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{ padding: "0 2rem 2rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {search === "" && continent === "All"
            ? "Featured Destinations"
            : search !== ""
            ? `Search Results for "${search}"`
            : `${continent} Countries`}
        </h2>

        <div className="country-grid">
          {!isLoading && (
            <>
              {search === "" && continent === "All" ? (
                // Featured countries
                featuredCountries.map((country) => (
                  <CountryCard
                    key={country.name.official}
                    name={country.name.common}
                    flag={country.flags?.png}
                    capital={country.capital?.[0]}
                  />
                ))
              ) : search === "" && continent !== "All" ? (
                // Continent countries
                continentCountries.map((country) => (
                  <CountryCard
                    key={country.name.official}
                    name={country.name.common}
                    flag={country.flags?.png}
                    capital={country.capital?.[0]}
                  />
                ))
              ) : search !== "" && filteredCountries.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <div className="empty-state-title">No countries found</div>
                  <div className="empty-state-text">
                    Try adjusting your search terms or filters
                  </div>
                </div>
              ) : (
                // Filtered countries
                filteredCountries.map((country) => (
                  <CountryCard
                    key={country.name.official}
                    name={country.name.common}
                    flag={country.flags?.png}
                    capital={country.capital?.[0]}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
