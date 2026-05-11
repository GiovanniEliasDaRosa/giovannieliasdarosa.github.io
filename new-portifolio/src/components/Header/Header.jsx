import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.header_logo}>
          <img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="" />
          <p>Giovanni's Portfolio</p>
        </div>
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
      </nav>
    </header>
  );
}
