import { useRef, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [mobile, setMobile] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef();

  function toggleMenu() {
    if (!menuOpen) {
      // If not open, open it
      setMenuOpen(true);
      dialogRef.current?.showModal();

      requestAnimationFrame(() => {
        dialogRef.current?.classList.add(styles.show);
      });
    } else {
      // If open, close it
      const element = dialogRef.current;

      // If no element anymore
      if (!element) {
        dialogRef.current?.close();
        setMenuOpen(false);
        return;
      }

      element.classList.remove(styles.show);
      element.classList.add(styles.hide);

      element.addEventListener(
        "animationend",
        () => {
          dialogRef.current?.close();
          setMenuOpen(false);
        },
        { once: true },
      );
    }
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
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={styles.header_logo}>
            <img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="" />
            <p>Giovanni's Portfolio</p>
          </div>

          {mobile ? (
            // Show menu button on nav
            <button
              className="square icons nomargin bars"
              aria-label="Open menu"
              onClick={toggleMenu}
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
            </div>
          )}
        </nav>
      </header>

      <dialog ref={dialogRef} className={styles.header_dialog}>
        <div className={`${styles.header_links} ${styles.header_mobile}`}>
          <button
            className={`square icons nomargin xmark ${styles.close_button}`}
            aria-label="Close menu"
            onClick={toggleMenu}
          ></button>
          <a className="button" href="#skills">
            Skills
          </a>
          <a className="button" href="#projects">
            Projects
          </a>
          <a className="button" href="#contact">
            Contact
          </a>
        </div>
      </dialog>
    </>
  );
}
