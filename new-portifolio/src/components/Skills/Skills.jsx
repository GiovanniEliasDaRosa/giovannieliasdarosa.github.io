import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <h2>Skills</h2>
      <ul>
        <li className="icons nomargin brands html5">
          <span>
            <strong>HTML5</strong>: Clean, semantic and well structured
          </span>
        </li>
        <li className="icons nomargin brands css">
          <span>
            <strong>CSS</strong>: Responsive and well structured, focused on UX/UI principles
          </span>
        </li>
        <li className="icons nomargin brands square_js">
          <span>
            <strong>JS</strong>: Clean and organized, class based
          </span>
        </li>
        <li className="icons nomargin brands git">
          <span>
            <strong>Git & GitHub</strong>: Version control and collaborative development
          </span>
        </li>
        <li className="icons nomargin brands php">
          <span>
            <strong>PHP</strong>: Clean, organized, semantic and well structured
          </span>
        </li>
        <li className="icons nomargin database">
          <span>
            <strong>MySQL</strong>: data management and LucidChart to create diagrams
          </span>
        </li>
        <li className="icons nomargin brands trello">
          <span>
            <strong>Trello</strong>: organize tasks and enhance project management
          </span>
        </li>
        <li className="icons nomargin brands figma">
          <span>
            <strong>Figma</strong>: design prototypes, wireframes and mockups
          </span>
        </li>
      </ul>
    </section>
  );
}
