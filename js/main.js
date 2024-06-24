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

// const all = [...document.querySelectorAll("main > *")];
// let spacetime = 200;
// let decrement = spacetime / all.length;
// let ease = spacetime;

// for (let i = 0; i < all.length; i++) {
//   const element = all[i];
//   console.log(ease);

//   element.classList.add("toanimate");

//   setTimeout(() => {
//     element.classList.add("animate");

//     setTimeout(() => {
//       element.classList.remove("toanimate");
//       element.classList.remove("animate");
//     }, 550);
//   }, (spacetime - ease) * i + 200);

//   ease -= decrement;
// }

// /* animate */
// .toanimate {
//   transform: scale(0.2);
//   transform-origin: 0% 50%;
//   opacity: 0;

//   transition: 0s ease-out;
// }

// #cards.toanimate {
//   transform-origin: 50% 50%;
// }

// .animate {
//   transform: scale(1);
//   opacity: 1;
//   transition: 0.5s ease-out;
// }
