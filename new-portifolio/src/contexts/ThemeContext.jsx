import { createContext, useCallback, useEffect, useRef, useState } from "react";

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
  const loadedRef = useRef(false);
  const timeoutThemeTransitionRef = useRef(null);

  function updateThemeVisualTransition() {
    clearTimeout(timeoutThemeTransitionRef.current);
    let selectedTheme = theme;

    // IF selected theme is auto, get the light/dark prefered
    if (theme == "auto") {
      selectedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-theme", selectedTheme);

    timeoutThemeTransitionRef.current = setTimeout(() => {
      document.documentElement.setAttribute("data-chaging-theme", false);
    }, 750);
  }

  const updateThemeVisual = useCallback(() => {
    document.documentElement.setAttribute("data-chaging-theme", true);
    // If don't support transition, and don't animate first transition, as is page changing colors
    if (!document.startViewTransition || !loadedRef.current) {
      updateThemeVisualTransition();
      return;
    }

    document.startViewTransition(() => {
      updateThemeVisualTransition();
    });
  }, [theme]);

  function updateAutomaticTheme() {
    // Only when theme is auto
    if (theme == "auto") {
      // Update for light or dark mode
      updateThemeVisual();
    }
  }

  useEffect(() => {
    const prefersDarkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDarkModeMedia.addEventListener("change", updateAutomaticTheme);

    return () => {
      prefersDarkModeMedia.removeEventListener("change", updateAutomaticTheme);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    updateThemeVisual();
    loadedRef.current = true;
  }, [theme, updateThemeVisual]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
