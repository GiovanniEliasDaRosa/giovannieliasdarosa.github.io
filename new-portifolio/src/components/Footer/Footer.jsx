import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made with
        <span className={`icons nomargin brands react ${styles.react}`}>React</span>
      </p>
    </footer>
  );
}
