import styles from "./Project.module.css";

export default function Project({ project, ref }) {
  function formatDate(date) {
    return new Date(`${date} 00:00:00`).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const imagePath = `/assets/images/cover/resized/${project.image.src}`;

  const splitPath = imagePath.match(/(^\S+)(\.\w+$)/);
  const fileName = splitPath[1];
  const fileExtension = splitPath[2];

  return (
    <div className={`${styles.project_card} no_default_styles`} ref={ref}>
      <img
        src={`${fileName}-320${fileExtension}`}
        srcSet={`
          ${fileName}-320${fileExtension} 320w,
          ${fileName}-480${fileExtension} 480w,
          ${fileName}-640${fileExtension} 640w,
          ${fileName}-960${fileExtension} 960w,
          ${fileName}-1280${fileExtension} 1280w
        `}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 1280px"
        alt={project.image.alt}
        loading="lazy"
        style={{
          background: `url(${fileName}-320${fileExtension})`,
        }}
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
            <p>{project.repository.commits} commits</p>
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

        {project.collaborations ? (
          <div className={styles.collaborations}>
            <p className={`icons people_group ${styles.collaborations_tittle}`}>Collaborations</p>

            <div className={styles.collaborations_persons}>
              {project.collaborations.map((item) => (
                <div className={styles.collaborations_person}>
                  <p className={styles.collaborations_person_name}>{item.collaborator}</p>
                  <p className={styles.collaborations_person_role}>{item.role}</p>
                  <a
                    href={item.link}
                    className={`no_default_styles button icons github brands ${styles.collaborations_link}`}
                  >
                    Go to GitHub
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : null}

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
