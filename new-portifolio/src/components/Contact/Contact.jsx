import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <h2>Contact</h2>
      <div>
        <a
          className="no_default_styles icons brands github"
          href="https://github.com/GiovanniEliasDaRosa"
        >
          GitHub
        </a>
        <a
          className="no_default_styles icons brands square_linkedin"
          href="https://www.linkedin.com/in/giovanni-elias/"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
