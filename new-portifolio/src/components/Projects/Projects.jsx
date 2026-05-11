import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import Project from "./partials/Project";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Projects() {
  const projectContainerRef = useRef(null);
  const [scrolled, setScrolled] = useState("left");
  const scrollTimeoutRef = useState(null);

  const scrolling = useCallback(() => {
    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      updateMask();
    }, 150);
  }, [scrollTimeoutRef]);

  function updateMask() {
    const container = projectContainerRef.current;
    let current = container.scrollLeft;
    let max = container.scrollLeftMax ?? container.scrollWidth - container.clientWidth;

    if (current == 0) {
      setScrolled("left");
    } else if (current == max) {
      setScrolled("right");
    } else {
      setScrolled("middle");
    }
  }

  function previous() {
    projectContainerRef.current.scrollBy({
      left: -projectContainerRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  function next() {
    projectContainerRef.current.scrollBy({
      left: projectContainerRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const container = projectContainerRef.current;
    // container.addEventListener("scrollend", updateMask);
    container.addEventListener("scroll", scrolling);

    return () => {
      container.removeEventListener("scrollend", updateMask);
      container.removeEventListener("scroll", scrolling);
    };
  }, [scrolling]);

  return (
    <section className={`${styles.projects} full_width`} id="projects">
      <h2>Projects</h2>

      <div className={styles.projects_div}>
        <div
          className={styles.projects_div_scroll}
          ref={projectContainerRef}
          data-scroll={scrolled}
        >
          {projects.map((project) => {
            return <Project project={project} key={project.tittle} />;
          })}
        </div>

        <button
          className={`${styles.goleft} icons nomargin chevron_left`}
          aria-label="Go left"
          onClick={previous}
          aria-hidden={scrolled == "left"}
          style={{ display: scrolled == "left" ? "none" : "" }}
        ></button>
        <button
          className={`${styles.goright} icons nomargin chevron_right`}
          aria-label="Go right"
          onClick={next}
          aria-hidden={scrolled == "right"}
          style={{ display: scrolled == "right" ? "none" : "" }}
        ></button>
      </div>
    </section>
  );
}
