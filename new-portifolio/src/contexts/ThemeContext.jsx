import { createContext, useCallback, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  function tryGetSavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme == "auto" || savedTheme == "light" || savedTheme == "dark") {
      return savedTheme;
    }

    localStorage.setItem("theme", "auto");
    return "auto";
  }

  const [theme, setTheme] = useState(tryGetSavedTheme);

  const updateThemeVisual = useCallback(() => {
    let selectedTheme = theme;

    // IF selected theme is auto, get the light/dark prefered
    if (theme == "auto") {
      selectedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-theme", selectedTheme);
  }, [theme]);

  useEffect(() => {
    function updateAutomaticTheme() {
      // Only when theme is auto
      if (theme == "auto") {
        // Update for light or dark mode
        updateThemeVisual();
      }
    }

    localStorage.setItem("theme", theme);

    updateThemeVisual();

    const prefersDarkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDarkModeMedia.addEventListener("change", updateAutomaticTheme);

    return () => {
      prefersDarkModeMedia.removeEventListener("change", updateAutomaticTheme);
    };
  }, [theme, updateThemeVisual]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
