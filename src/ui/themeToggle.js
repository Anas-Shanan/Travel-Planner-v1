import React, { useState } from "react";

export default function themeToggle() {
  return (
    <div>
      <button></button>
    </div>
  );
}

/* import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

export default function ThemeToggle() {
  const {isDarkMode, toggleTheme} = useContext(ThemeContext);

   const buttonStyle = {
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      backgroundColor: isDarkMode ? "#fff" : "#333",
      color: isDarkMode ? "#333" : "#fff"
   }

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      Toggle {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  )
}


*/

/* export default function ThemeProvider({children}){
   const [isDarkMode, setIsDarkMode] = useState(false);

   function toggleTheme(){
      setIsDarkMode(!isDarkMode);
   };

   return (
     
      <ThemeContext.Provider value={{isDarkMode, toggleTheme}} >
         {children}
      </ThemeContext.Provider>
   )
} */
