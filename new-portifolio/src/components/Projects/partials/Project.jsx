import styles from "./Project.module.css";

export default function Project({ project, ref }) {
  function formatDate(date) {
    return new Date(`${date} 00:00:00`).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className={`${styles.project_card} no_default_styles`} ref={ref}>
      <img
        src={`/assets/images/cover/${project.image.src}`}
        alt={project.image.alt}
        loading="lazy"
      />

      <div className={styles.contents}>
        <div className={styles.header}>
          <div className={styles.header_tittle}>
            <p className={styles.tittle}>{project.tittle}</p>
            <p className={styles.type}>{project.type}</p>
          </div>
          <p className={styles.description}>{project.description}</p>
          <p className={styles.tags}>
            {project.tags.map((tag) => {
              return (
                <span key={tag} className={`${styles.tag} ${styles[tag]}`}>
                  {tag}
                </span>
              );
            })}
          </p>
        </div>

        <div className={styles.repository}>
          <div className={styles.repository_tittle}>
            <p className={`icons github brands ${styles.repository_tittle_tittle}`}>Repository</p>
            <p>16 commits</p>
          </div>

          <div className={styles.commits}>
            <p>
              <span>Fist commit</span> <span>{formatDate(project.repository.firstCommitDate)}</span>
            </p>
            <p>
              <span>Last commit</span> <span>{formatDate(project.repository.lastCommitDate)}</span>
            </p>
          </div>
        </div>

        <div className={styles.buttons}>
          <a
            href={project.repository.link + "?utm_medium=profile&utm_campaign=portfolio"}
            className="no_default_styles icons  github brands"
          >
            View on Github
          </a>

          {/* If has a deployment link */}
          {project.deployment == null ? null : (
            <a
              href={project.deployment + "?utm_medium=profile&utm_campaign=portfolio"}
              className="no_default_styles icons  up_right_from_square"
            >
              Live demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
