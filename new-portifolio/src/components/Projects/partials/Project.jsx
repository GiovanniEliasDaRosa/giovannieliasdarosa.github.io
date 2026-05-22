import styles from "./Project.module.css";

export default function Project({ project, ref }) {
  return (
    <a href={project.link} className={`${styles.project_card} no_default_styles`} ref={ref}>
      <img
        src={`/assets/images/cover/${project.image.url}`}
        alt={project.image.alt}
        loading="lazy"
      />
      <span>
        <span className={styles.project_card_tittle}>{project.tittle}</span>
        <span className={styles.project_card_description}>{project.description}</span>
        <span className={styles.project_card_tags}>
          {project.tags.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })}
        </span>
      </span>
    </a>
  );
}
