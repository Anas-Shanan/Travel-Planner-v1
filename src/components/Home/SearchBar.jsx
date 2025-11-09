import { NavLink } from "react-router-dom";

export default function SearchBar({ onSearch, value }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search-group">
      <label className="search-label">Search Countries</label>
      <input
        type="text"
        className="search-input"
        placeholder="Enter country name..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
