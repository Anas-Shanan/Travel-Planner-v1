export default function ContinentFilter({ value, onChange }) {
  return (
    <div className="search-group">
      <label className="search-label" htmlFor="continent-select">
        Filter by Continent
      </label>
      <select
        id="continent-select"
        className="search-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="All">All Continents</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
