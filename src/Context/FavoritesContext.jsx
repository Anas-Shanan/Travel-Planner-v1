import { createContext, useContext, useReducer, useEffect } from "react";

const FavoritesContext = createContext();

function favoritesReducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "ADD_COUNTRY":
      if (
        state.favorites.some(
          (country) => country.name?.common === action.payload.name?.common
        )
      ) {
        console.log(
          "Country already in favorites:",
          action.payload.name?.common
        );
        return state;
      }
      console.log("Adding country:", action.payload.name?.common);
      return {
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_COUNTRY":
      console.log("Removing country:", action.payload.name?.common);
      return {
        favorites: state.favorites.filter(
          (country) => country.name?.common !== action.payload.name?.common
        ),
      };
    default:
      return state;
  }
}

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites: state.favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext);
