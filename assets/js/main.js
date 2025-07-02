document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const path = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (href === "index.html" && path === "")) {
      link.classList.add("active");
    }
  });
});


window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});


function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  const itemWidth = track.querySelector('.custom-carousel-item').offsetWidth + 20; // item width + margin
  track.scrollBy({
    left: direction * itemWidth * 2, // Avanza o retrocede 2 ítems
    behavior: 'smooth'
  });
}


document.querySelectorAll('.custom-carousel-item img').forEach(img => {
  img.addEventListener('click', function () {
    const lightbox = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImage');
    lightboxImg.src = this.src;
    lightbox.style.display = 'flex';
  });
});


function closeLightbox() {
  document.getElementById('lightboxOverlay').style.display = 'none';
}


const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.menu-overlay');
const closeBtn = document.querySelector('.menu-close');

function closeMenu() {
  nav.classList.remove('active');
  overlay.classList.remove('active');
}

toggle.addEventListener('click', () => {
  nav.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', closeMenu);
closeBtn.addEventListener('click', closeMenu);
