import { useRef, useState } from "react";
import styles from "./Header.module.css";
import ThemeButton from "./partials/ThemeButton";

export default function Header() {
  const [mobile, setMobile] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef();

  function toggleMenu(overrideClose) {
    const dialog = dialogRef.current;

    // If no dialog anymore
    if (!dialog) {
      dialogRef.current?.close();
      setMenuOpen(false);
      document.body.style.overflow = "";
      return;
    }

    if (!menuOpen && !overrideClose) {
      // If not open, open it
      setMenuOpen(true);
      dialog.showModal();

      dialog.classList.remove(styles.show);
      dialog.classList.remove(styles.hide);
      dialog.classList.remove(styles.hide_clicked);

      requestAnimationFrame(() => {
        dialog.classList.add(styles.show);

        dialog.addEventListener(
          "animationend",
          () => {
            document.body.style.overflow = "hidden";
          },
          { once: true },
        );
      });
    } else {
      // If open, close it

      dialog.classList.remove(styles.show);
      dialog.classList.remove(styles.hide);
      dialog.classList.remove(styles.hide_clicked);

      // Overriding animation to close
      if (overrideClose) {
        dialog.classList.add(styles.hide_clicked);
      } else {
        dialog.classList.add(styles.hide);
      }

      dialog.addEventListener(
        "animationend",
        () => {
          dialogRef.current?.close();
          setMenuOpen(false);
          document.body.style.overflow = "";
        },
        { once: true },
      );
    }
  }

  function clickedMenuLink() {
    // Close menu
    toggleMenu(true);
  }

  useState(() => {
    let timeoutUpdateHeader = null;

    function updateHeader() {
      const fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
      const isMobile = window.innerWidth < fontSize * 43;

      setMobile((prevMobile) => {
        if (prevMobile === isMobile) return prevMobile;

        return isMobile;
      });
    }

    function debounceHeader() {
      clearTimeout(timeoutUpdateHeader);

      timeoutUpdateHeader = setTimeout(updateHeader, 150);
    }

    window.addEventListener("resize", debounceHeader);
    updateHeader();

    return () => {
      window.removeEventListener("resize", debounceHeader);

      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.header_logo}>
            <img src={`/assets/images/logo.png`} alt="" />
            <p>Giovanni's Portfolio</p>
          </div>

          {mobile ? (
            // Show menu button on nav
            <button
              className={`square icons nomargin bars ${styles.open_menu}`}
              aria-label="Open menu"
              onClick={() => {
                toggleMenu(false);
              }}
            ></button>
          ) : (
            // Show buttons
            <div className={styles.header_links}>
              <a className="button" href="#skills">
                Skills
              </a>
              <a className="button" href="#projects">
                Projects
              </a>
              <a className="button" href="#contact">
                Contact
              </a>
              <ThemeButton display="square" />
            </div>
          )}
        </nav>
      </header>

      <dialog ref={dialogRef} className={styles.header_dialog}>
        <div className={`${styles.header_links} ${styles.header_mobile}`}>
          <button
            className={`square icons nomargin xmark ${styles.close_button}`}
            aria-label="Close menu"
            onClick={() => {
              toggleMenu(false);
            }}
          ></button>
          <a className="button" href="#skills" onClick={clickedMenuLink}>
            Skills
          </a>
          <a className="button" href="#projects" onClick={clickedMenuLink}>
            Projects
          </a>
          <a className="button" href="#contact" onClick={clickedMenuLink}>
            Contact
          </a>
          <ThemeButton display="large" />
        </div>
      </dialog>
    </>
  );
}
