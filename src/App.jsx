import React, { useState, useEffect } from "react";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import {Calculadora} from "./components/Calculadora"

// Crear el contexto de tema
export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light"); // Inicializamos el tema con "light"

  // Seleccionar el tema correcto con base en la cadena
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <Calculadora/>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}



export default App;
