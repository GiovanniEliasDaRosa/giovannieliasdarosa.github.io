const root = document.querySelector(":root");
const body = document.body;
const ThemeButton = document.querySelector("#ThemeButton");
let darktheme = false;

let transitionTimeout = "";

let savedTheme = localStorage.getItem("theme");
if (savedTheme != null) {
  darktheme = savedTheme == "true" ? false : true;
  ChangeTheme();
} else {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    ChangeTheme();
  }
}

ThemeButton.addEventListener("click", () => {
  ChangeTheme(true);
});

function ChangeTheme(user = false) {
  if (darktheme) {
    ThemeButton.classList.remove("sun");
    darktheme = false;
    body.removeAttribute("data-dark");

    root.style.colorScheme = "light";
  } else {
    ThemeButton.classList.add("sun");
    darktheme = true;
    body.setAttribute("data-dark", "");

    root.style.colorScheme = "dark";
  }

  localStorage.setItem("theme", darktheme);

  clearTimeout(transitionTimeout);
  if (user) {
    body.setAttribute("data-transition", "");

    transitionTimeout = setTimeout(() => {
      body.removeAttribute("data-transition");
    }, 800);
  }
}

/* animate in elements on scroll */
// const observer = new IntersectionObserver(
//   (entries) => {
//     let timer = 0;
//     let rest = 300;
//     entries.forEach((entry) => {
//       if (entry.isIntersecting && !entry.target.classList.contains("show")) {
//         setTimeout(() => {
//           entry.target.classList.add("show");
//           setTimeout(() => {
//             entry.target.classList.remove("hidden");
//             entry.target.classList.remove("show");
//           }, 1000);
//         }, timer * rest + 10);
//         timer++;
//         rest = Math.abs(rest * 0.98);
//       }
//     });
//   },
//   {
//     threshold: 0.4,
//   }
// );

// const hiddenElements = document.querySelectorAll(
//   "main > *, ul > *, #cards > *, footer > *, .tags__group > *"
// );

// hiddenElements.forEach((element) => {
//   element.classList.add("hidden");
//   observer.observe(element);
// });

// setTimeout(() => {
//   window.scrollTo(0, 0);
// }, 200);
