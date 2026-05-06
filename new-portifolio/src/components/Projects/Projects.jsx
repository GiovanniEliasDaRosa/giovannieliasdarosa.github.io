import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import Project from "./partials/Project";

export default function Projects() {
  return (
    <section className={`${styles.projects} full_width`} id="projects">
      <h2>Projects</h2>

      <div key="projects_div">
        {projects.map((project) => {
          return <Project project={project} key={project.tittle} />;
        })}
      </div>
    </section>
  );
}
