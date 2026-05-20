import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${styles.hero} full_width`}>
      <img src={`${import.meta.env.BASE_URL}assets/images/background.jpg`} alt="Coding" />

      <div className={styles.hero_middle}>
        <h1>
          <span>
            A passionate web developer
            <span className={styles.hero_blinker}></span>
          </span>
        </h1>

        <p>I create responsive & accessible websites with clean code & UX that feels natural</p>
      </div>

      <a
        href="#skills"
        className="no_default_styles icons nomargin chevron_down"
        id={styles.go_down}
        aria-label="Go to skills"
      ></a>

      <p>
        <span>Photo by</span>
        <a
          className="default_styles"
          href="https://unsplash.com/@krishna2803?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash"
        >
          Krishna Pandey
        </a>
        <span>on</span>
        <a
          className="default_styles"
          href="https://unsplash.com/photos/text-KNZHyTpre18?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash"
        >
          Unsplash
        </a>
      </p>
    </section>
  );
}
