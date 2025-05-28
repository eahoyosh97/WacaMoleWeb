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