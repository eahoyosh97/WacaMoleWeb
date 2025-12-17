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
    left: direction * itemWidth * 2,
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


/* === BOOKING FORM === */
if (document.getElementById('eventDate')) {
  flatpickr("#eventDate", {
    minDate: "today",
    dateFormat: "F d, Y",
    disableMobile: true,
    locale: {
      firstDayOfWeek: 0
    },
    allowInput: false
  });
}

const calendarIcon = document.querySelector('.calendar-icon');
const eventDateInput = document.getElementById('eventDate');

if (calendarIcon && eventDateInput && eventDateInput._flatpickr) {
    calendarIcon.addEventListener('click', function() {
        eventDateInput._flatpickr.open();
    });
}

const bookingForms = document.querySelectorAll('.booking-form');

if (bookingForms.length > 0) {
    bookingForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const dateInput = this.querySelector('input[name="eventDate"]');
            
            // Validar email
            if (emailInput) {
                const email = emailInput.value;
                const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
                
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    emailInput.focus();
                    return;
                }
            }
            
            if (dateInput && dateInput.value) {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate <= today) {
                    alert('Please select a future date for your event.');
                    return;
                }
            }
            
            console.log('Formulario válido, listo para enviar');
            // this.submit(); // Descomenta para enviar el formulario
        });
    });
}

document.querySelectorAll('.booking-form input[type="email"]').forEach(emailInput => {
    const emailError = emailInput.nextElementSibling;
    
    emailInput.addEventListener('input', function() {
        if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
            if (emailError && emailError.classList.contains('error-message')) {
                emailError.textContent = 'Please enter a valid email address (e.g., example@email.com)';
                emailError.style.display = 'block';
            }
        } else {
            if (emailError && emailError.classList.contains('error-message')) {
                emailError.style.display = 'none';
            }
        }
    });
});