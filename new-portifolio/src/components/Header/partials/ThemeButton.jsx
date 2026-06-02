import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styles from "../Header.module.css";

export default function ThemeButton({ display }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [helperText, setHelperText] = useState(`Toggle theme | Current theme: ${theme}`);

  function toggletheme(e) {
    if (theme == "auto") {
      setTheme("dark");
    } else if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("auto");
    }

    document.documentElement.style.setProperty("--transition-top", `${e.clientY}px`);
    document.documentElement.style.setProperty("--transition-left", `${e.clientX}px`);
  }

  let iconToUse = "circle_half_stroke";

  if (theme == "light") {
    iconToUse = "sun";
  } else if (theme == "dark") {
    iconToUse = "moon";
  }

  useEffect(() => {
    // Make fist letter capital
    const themeSelected = theme.charAt(0).toUpperCase() + theme.slice(1);
    setHelperText(`${themeSelected} theme`);
  }, [theme]);

  // If want a square button
  if (display == "square") {
    return (
      <button
        className={`square icons nomargin ${iconToUse} ${styles.toggle_theme_button}`}
        aria-label="Toggle theme"
        onClick={toggletheme}
      ></button>
    );
  }

  return (
    <button className={`icons ${iconToUse} ${styles.toggle_theme_button}`} onClick={toggletheme}>
      {helperText}
    </button>
  );
}
