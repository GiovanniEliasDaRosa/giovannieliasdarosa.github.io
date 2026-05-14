import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import Project from "./partials/Project";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Projects() {
  const projectContainerRef = useRef(null);
  const projectsRefs = useRef([]);
  const [index, setIndex] = useState(0);

  const [scrolled, setScrolled] = useState("left");
  const scrollTimeoutRef = useState(null);
  const skipSeekRef = useRef(false);

  const updateMask = useCallback(() => {
    const container = projectContainerRef.current;
    let current = container.scrollLeft;
    let scrollMax = container.scrollLeftMax ?? container.scrollWidth - container.clientWidth;

    function seekSelected() {
      const middleContainer = container.scrollLeft + container.clientWidth / 2;
      let betterLeft = {
        value: -Infinity,
        index: null,
      };
      let betterRight = {
        value: Infinity,
        index: null,
      };

      for (let i = 0; i < projectsRefs.current.length; i++) {
        const project = projectsRefs.current[i];

        const fromLeft = project.offsetLeft >= container.scrollLeft;
        const fromRight = project.offsetLeft <= container.scrollLeft + container.clientWidth;

        if (!fromLeft || !fromRight) {
          continue;
        }

        const middle = project.offsetLeft + project.clientWidth - middleContainer;

        if (middle > betterLeft.value && middle < 0) {
          betterLeft = {
            value: middle,
            index: i,
          };
        }

        if (middle < betterRight.value && middle > 0) {
          betterRight = {
            value: middle,
            index: i,
          };
        }
      }

      if (betterLeft.value < betterRight.value) {
        setIndex(betterRight.index);
      } else {
        setIndex(betterLeft.index);
      }
    }

    if (current == 0) {
      setScrolled("left");
      setIndex(0);

      return;
    } else if (current == scrollMax) {
      setScrolled("right");
      setIndex(projectsRefs.current.length - 1);

      return;
    }

    setScrolled("middle");

    if (!skipSeekRef.current) {
      seekSelected();
    }
  }, [skipSeekRef]);

  const scrolling = useCallback(() => {
    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      updateMask();
      skipSeekRef.current = false;
    }, 150);
  }, [scrollTimeoutRef, updateMask]);

  function previous() {
    const previous = Math.max(index - 1, 0);
    setIndex(previous);

    projectsRefs.current[previous]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
    skipSeekRef.current = true;
  }

  function next() {
    const next = Math.min(index + 1, projects.length - 1);
    setIndex(next);

    projectsRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
    skipSeekRef.current = true;
  }

  useEffect(() => {
    const container = projectContainerRef.current;
    container.addEventListener("scroll", scrolling);

    return () => {
      container.removeEventListener("scroll", scrolling);
    };
  }, [scrolling, updateMask]);

  return (
    <section className={`${styles.projects} full_width`} id="projects">
      <h2>Projects</h2>

      <div className={styles.projects_div}>
        <div
          className={styles.projects_div_scroll}
          ref={projectContainerRef}
          data-scroll={scrolled}
        >
          {projects.map((project, i) => {
            return (
              <Project
                key={project.tittle}
                project={project}
                ref={(el) => (projectsRefs.current[i] = el)}
              />
            );
          })}
        </div>

        <div className={styles.dots}>
          {projects.map((project, i) => {
            return <span key={i} data-selected={i == index ? "true" : null}></span>;
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
