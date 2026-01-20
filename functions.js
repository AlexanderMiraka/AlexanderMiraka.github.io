document.addEventListener("DOMContentLoaded", () => {
  changeTextAnimation();
  navigateButton("personalInfoButton", "workExperience");
  navigateButton("personalProjectsButton", "personalProjects");
  showWorkInfo();
  closeNavBar();
  openNavBar();
  navigateButton("aboutBtn", "personalInfo");
  navigateButton("workBtn", "workExperience");
  navigateButton("personalProjectsBtn", "personalProjects");
  animatePersonalXp();
});

function changeTextAnimation() {
  const words = ["Hi, My Name Is", "Γειά, Λέγομαι"];
  let index = 0;
  const target = document.getElementById("animationTarget");

  setInterval(() => {
    target.classList.add("fade-out");
    setTimeout(() => {
      index = (index + 1) % words.length;
      target.textContent = words[index];
      target.classList.remove("fade-out");
    }, 1000);
  }, 2000);
}

function navigateButton(source, destination) {
  const navButton = document.getElementById(source);
  const slideBar = document.querySelector(".sideBar");
  const windowWidth = window.innerWidth;
  navButton.addEventListener("click", (e) => {
    e.preventDefault();
    const to = document.getElementById(destination);
    const top = to.offsetTop;
    window.scrollTo({ top: top, behavior: "smooth" });
    slideBar.classList.remove("open");
    if (windowWidth < 1024) {
      document.querySelector("body").style.overflow = "";
    }
  });
}

function showWorkInfo() {
  const buttons = document.getElementsByClassName("workFieldsContent");
  const targets = document.getElementsByClassName("workFieldsInfoContent");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseover", (e) => {
      e.preventDefault();
      for (let i = 0; i < targets.length; i++) {
        targets[i].classList.remove("fade-in");
      }
      targets[[...buttons].indexOf(e.currentTarget)].classList.add("fade-in");
    });
  }
}
function closeNavBar() {
  const windowWidth = window.innerWidth;
  const closeBtn = document.querySelector(".closeBtn");
  closeBtn.addEventListener("click", () => {
    const sideBar = document.querySelector(".sideBar");
    sideBar.classList.remove("open");
    if (windowWidth < 1024) {
      document.querySelector("body").style.overflow = "";
    }
  });
}
function openNavBar() {
  const windowWidth = window.innerWidth;
  const burgerBtn = document.querySelector(".sideBarBtn");
  burgerBtn.addEventListener("click", () => {
    const sideBar = document.querySelector(".sideBar");
    sideBar.classList.add("open");
    if (windowWidth < 1024) {
      document.querySelector("body").style.overflow = "hidden";
    }
  });
}

function animatePersonalXp() {
  if (window.innerWidth < 1025) {
    const animationTarget = document.querySelectorAll(".workFieldsContent");
    const options = {
      threshold: 0.9,
      rootMargin: "-50px 0px",
    };
    const intersection = new IntersectionObserver((intersectionEntries) => {
      intersectionEntries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("waveAnimation")
        ) {
          entry.target.classList.add("waveAnimation");
        }
      });
    }, options);
    animationTarget.forEach((target) => {
      intersection.observe(target);
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  var slider = document.querySelector(".slidesCarousel"),
    sliderItems = document.querySelector(".slidesWrapper"),
    prev = document.querySelector(".slidesPrev"),
    next = document.querySelector(".slidesNext");

  function slide(wrapper, items, prev, next) {
    var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.querySelectorAll(".slides"),
      slidesLength = slides.length,
      slideSize = items.querySelectorAll(".slides")[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
    createCarouselDots();
    const dots = document.querySelectorAll(".dot");
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);
    prev.addEventListener("click", function () {
      shiftSlide(-1);
    });
    next.addEventListener("click", function () {
      shiftSlide(1);
    });
    items.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;
      posX1 = e.touches[0].clientX;
    }

    function dragAction(e) {
      e = e || window.event;
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
      items.style.left = items.offsetLeft - posX2 + "px";
    }

    function dragEnd(e) {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, "drag");
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, "drag");
      } else {
        items.style.left = posInitial + "px";
      }
    }

    function shiftSlide(dir, action) {
      items.classList.add("smooth");

      if (allowShift) {
        if (!action) {
          posInitial = items.offsetLeft;
        }

        if (dir == 1) {
          items.style.left = posInitial - slideSize + "px";
          index++;
        } else if (dir == -1) {
          items.style.left = posInitial + slideSize + "px";
          index--;
        }
      }
      allowShift = false;
    }

    function checkIndex() {
      items.classList.remove("smooth");

      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + "px";
        index = 0;
      }
      allowShift = true;
      if (window.innerWidth < 1025) {
        for (let i = 0; i < dots.length; i++) {
          dots[i].classList.remove("dotActive");
        }
        dots[index].classList.add("dotActive");
      }
    }
  }

  function createCarouselDots() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1025) {
      const numOfDots = document.querySelectorAll(".slides").length;
      const carousel = document.querySelector(".slidesCarousel");
      const carouselDots = document.createElement("div");
      carouselDots.classList.add("dotsContainer");
      for (let i = 0; i < numOfDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        carouselDots.appendChild(dot).cloneNode(true);
      }
      carousel.appendChild(carouselDots).cloneNode(true);
      document.querySelector(".dot").classList.add("dotActive");
    }
  }
  slide(slider, sliderItems, prev, next);
});
