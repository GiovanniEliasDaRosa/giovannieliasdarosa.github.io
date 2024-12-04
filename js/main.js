// #region Theme
const root = document.querySelector(":root");
const changetheme__button = Array.from(document.querySelectorAll(".changetheme__button"));
let theme = "auto";
let themes = ["auto", "light", "dark"];

let transitionTimeout = "";
let savedTheme = localStorage.getItem("theme");

if (savedTheme != null) {
  let wantedTheme = themes.indexOf(savedTheme);
  if (wantedTheme - 1 < 0) {
    wantedTheme = 2;
  } else {
    wantedTheme -= 1;
  }

  theme = themes[wantedTheme];
  ChangeTheme();
} else {
  theme = "dark";
  ChangeTheme();
}

changetheme__button.forEach((button) => {
  button.onclick = () => {
    ChangeTheme(true);
  };
});

function ChangeTheme(user = false) {
  if (theme == "auto") {
    changetheme__button.forEach((button) => {
      button.classList.remove("adjust");
      button.classList.add("sun");
    });
    theme = "light";
    root.setAttribute("data-theme", "light");
  } else if (theme == "light") {
    changetheme__button.forEach((button) => {
      button.classList.remove("adjust");
      button.classList.remove("sun");
    });
    theme = "dark";
    root.setAttribute("data-theme", "dark");
  } else {
    changetheme__button.forEach((button) => {
      button.classList.remove("sun");
      button.classList.add("adjust");
    });
    let darkTheme = true;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      darkTheme = false;
    }
    let selectedTheme = darkTheme ? "dark" : "light";
    root.setAttribute("data-theme", selectedTheme);
    theme = "auto";
  }

  clearTimeout(transitionTimeout);
  if (user) {
    localStorage.setItem("theme", theme);

    root.setAttribute("data-transition", "true");

    transitionTimeout = setTimeout(() => {
      root.removeAttribute("data-transition");
    }, 800);
  }
}

const imgs = Array.from(document.querySelectorAll("img"));
imgs.forEach((img) => {
  if (img.dataset.image != null) {
    img.src = "img/" + img.dataset.image;
  }
});
// #endregion

// #region Header
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

const header__options__button = Array.from(document.querySelectorAll(".header__options__button"));

const header__options__ul = document.querySelector("#header__options_ul");
const header__options__openmenu = document.querySelector("#header__options__openmenu");
const header__popupmenu = document.querySelector("#header__popupmenu");
const header__popupmenu__closemenu = document.querySelector("#header__popupmenu__closemenu");
let size = 42;
let headerMenuTimeout = "";
let headerH1Timeout = "";
let headerMenuShown = false;
let fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

header__options__openmenu.onclick = () => {
  clearTimeout(headerMenuTimeout);

  enable(header__popupmenu);
  header__popupmenu__closemenu.focus();

  header__popupmenu.setAttribute("data-open", "true");
  header__popupmenu.removeAttribute("data-close");
  headerMenuTimeout = setTimeout(() => {
    header__popupmenu.removeAttribute("data-open");
    disable(header__options__openmenu);
    somePopUpOpen(true);
  }, 750);
};

header__popupmenu__closemenu.onclick = () => {
  closePopUp();
};

header__options__button.forEach((headerButton) => {
  headerButton.onclick = () => {
    closePopUp();
  };
});

function closePopUp() {
  clearTimeout(headerMenuTimeout);
  header__options__openmenu.focus();

  enable(header__options__openmenu);
  somePopUpOpen(false);

  header__popupmenu.setAttribute("data-close", "true");
  header__popupmenu.removeAttribute("data-open");
  headerMenuTimeout = setTimeout(() => {
    header__popupmenu.removeAttribute("data-close");
    disable(header__popupmenu);
  }, 750);
}

function checkHeader() {
  let buttons = Array.from(header__options__ul.children).filter((child) =>
    child.classList.contains("normal__nav")
  );

  clearTimeout(headerH1Timeout);
  let screenWidth = window.innerWidth;

  if (screenWidth > size * fontSize) {
    disable(header__options__openmenu);
    for (let i = 0; i < buttons.length; i++) {
      enable(buttons[i]);
    }

    disable(header__popupmenu);
    somePopUpOpen(false);

    headerMenuShown = true;
    return;
  }
  headerMenuShown = false;

  for (let i = 0; i < buttons.length; i++) {
    disable(buttons[i]);
  }
  enable(header__options__openmenu);
  header__options__openmenu.disabled = false;
}

function somePopUpOpen(open = true) {
  if (open) {
    if (footer != null) {
      disable(footer);
    }
    disable(main);
    let headerChildren = Array.from(header.children);
    headerChildren.forEach((child) => {
      if (child.tagName == "A") {
        disable(child);
      }
    });
    let subChilds = Array.from(header.querySelector("#header__options").children);
    subChilds.forEach((subChild) => {
      if (subChild.id != "header__popupmenu" && subChild.ariaDisabled == null) {
        subChild.setAttribute("data-re-enable", "true");
        disable(subChild);
      }
    });
  } else {
    if (footer != null) {
      enable(footer);
    }
    enable(main);
    let headerChildren = Array.from(header.children);
    headerChildren.forEach((child) => {
      if (child.tagName == "A") {
        enable(child);
      }
    });
    let subChilds = Array.from(header.querySelector("#header__options").children);
    subChilds.forEach((subChild) => {
      if (subChild.dataset.reEnable == "true") {
        enable(subChild);
      }
      subChild.removeAttribute("data-re-enable");
    });
  }
}

window.onresize = () => {
  checkHeader();
};

checkHeader();
// #endregion

// #region Functions
function enable(element) {
  element.removeAttribute("aria-disabled");
  element.removeAttribute("disabled");
  element.style.display = "";
}

function disable(element) {
  element.setAttribute("aria-disabled", "true");
  element.setAttribute("disabled", "true");
  element.style.display = "none";
}
// #endregion
