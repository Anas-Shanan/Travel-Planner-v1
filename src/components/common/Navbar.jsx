import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../index.css";

export default function Navbar() {
  const location = useLocation();
  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) => (isActive ? "activeLink" : "link")}
      >
        Favorites
      </NavLink>
    </nav>
  );
}
