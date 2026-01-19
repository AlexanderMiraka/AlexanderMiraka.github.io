document.addEventListener("DOMContentLoaded", () => {
  changeTextAnimation();
  navigateButton("personalInfoButton", "workExperience");
  navigateButton("personalProjectsButton", "personalProjects");
  showWorkInfo();
  slideCarousel();
  closeNavBar();
  openNavBar();
  navigateButton('aboutBtn','personalInfo');
  navigateButton('workBtn','workExperience');
  navigateButton('personalProjectsBtn','personalProjects');
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
  const slideBar = document.querySelector('.sideBar');
  const windowWidth = window.innerWidth;
  navButton.addEventListener("click", (e) => {
    e.preventDefault();
    const to = document.getElementById(destination);
    const top = to.offsetTop;
    window.scrollTo({ top: top, behavior: "smooth" });
    slideBar.classList.remove('open');
    if(windowWidth < 1024) {
      document.querySelector('body').style.overflow = '';
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

function createCarouselDots() {
  const windowWidth = window.innerWidth;
  if(windowWidth < 1025) {
    const numOfDots = document.querySelectorAll('.slides').length;
    const carousel = document.querySelector('.slidesCarousel');
    const carouselDots = document.createElement('div');
    carouselDots.classList.add('dotsContainer');
    for(let i=0; i<numOfDots;i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      carouselDots.appendChild(dot).cloneNode(true);
    }
    carousel.appendChild(carouselDots).cloneNode(true);
  }
}

function slideCarousel() {
  let offset = 0;
  let slides = document.querySelectorAll(".slides");
  let carousel = document.querySelector(".slidesWrapper");
  let nextButton = document.querySelector(".slidesNext");

  let posInitial;
  let slideWidth = slides[0].clientWidth;

  // This is needed to make the carousel infinite. Clone the first 
  // and last slide and then when you reach on both ends translate to the 
  // corresponding slide
  let firstSlide = slides[0].cloneNode(true);
  let lastSlide = slides[slides.length - 1].cloneNode(true);
  createCarouselDots();
  const dots = document.querySelectorAll('.dot');
  carousel.appendChild(firstSlide);
  carousel.insertBefore(lastSlide, slides[0]);

  nextButton.addEventListener("click", () => {
      posInitial = carousel.offsetLeft;
      carousel.style.left = `${posInitial - slideWidth}px `;
      offset++;
      carousel.classList.add('smooth');
  });

  let prevButton = document.querySelector(".slidesPrev");
  prevButton.addEventListener("click", () => {
      posInitial = carousel.offsetLeft;
      carousel.style.left = `${posInitial + slideWidth}px`;
      offset--;
      carousel.classList.add('smooth');
  });
// if you are at the first slide wanting to go left 
dots[0].classList.add('dotActive');
  carousel.addEventListener('transitionend',()=>{
    if(offset === -1) {
      carousel.classList.remove('smooth');
      carousel.style.left = `-${slides.length*slideWidth}px`;
      offset = slides.length - 1;
    }
    // if you are at the last slide wanting to go right
    if(offset === slides.length) {
      carousel.classList.remove('smooth');
      carousel.style.left = `-${slideWidth}px`;
      offset = 0;
    }
    for(let i=0;i<dots.length; i++) {
      dots[i].classList.remove('dotActive');
    }
    dots[offset].classList.add('dotActive');
  });

}
function closeNavBar() {
  const windowWidth = window.innerWidth;
  const closeBtn = document.querySelector('.closeBtn');
  closeBtn.addEventListener('click',()=>{
    const sideBar = document.querySelector('.sideBar');
    sideBar.classList.remove('open');
    if(windowWidth < 1024) {
      document.querySelector('body').style.overflow = '';
    }
  });
}
function openNavBar() {
  const windowWidth = window.innerWidth;
  const burgerBtn = document.querySelector('.sideBarBtn');
  burgerBtn.addEventListener('click',()=>{
    const sideBar = document.querySelector('.sideBar');
    sideBar.classList.add('open');
    if(windowWidth < 1024) {
      document.querySelector('body').style.overflow = 'hidden';
    }
  });
}

function animatePersonalXp() {
  if(window.innerWidth < 1025) {
    const animationTarget = document.querySelectorAll('.workFieldsContent');
    const options = {
      threshold:0.9,
      rootMargin: '-50px 0px'
    }
    const intersection = new IntersectionObserver((intersectionEntries)=>{
      intersectionEntries.forEach((entry)=>{
        if(entry.isIntersecting && !entry.target.classList.contains('waveAnimation')) {
          entry.target.classList.add('waveAnimation');
        }
      });
    },options);
    animationTarget.forEach((target)=>{
      intersection.observe(target);
    });
  }
}
// TODO: 1) Add touchmove carousel,