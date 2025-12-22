emailjs.init("o9vqXI7X-AQWyibPO");
const emailServiceID = "service_f15nohm";
const contactTemplateID = "template_rku77rf";
const bookingTemplateID = "template_3kdjx95";

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

// ========== FORMULARIO DE CONTACTO ==========
if (document.getElementById('contactForm')) {
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const loader = document.getElementById("formLoader");
        const messageBox = document.getElementById("formMessage");
        loader.style.display = "block";
        messageBox.style.display = "none";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!email || !message) {
            loader.style.display = "none";
            showMessage("formMessage", "Please fill out all required fields (Email and Message).", false);
            return;
        }

        if (!isValidEmail(email)) {
            loader.style.display = "none";
            showMessage("formMessage", "Please enter a valid email address.", false);
            return;
        }
        
        const params = {
            name: name || "Anonymous",
            email: email,
            title: subject || "(No Subject)",
            message: `Email de contacto: ${email}\n\n${message}`
        };

        emailjs.send(emailServiceID, contactTemplateID, params).then(function(response) {
            loader.style.display = "none";
            showMessage("formMessage", "Message sent successfully!", true);
            document.getElementById("contactForm").reset();
        }, function(error) {
            loader.style.display = "none";
            showMessage("formMessage", "Failed to send message. Please try again later.", false);
            console.error("EmailJS error:", error);
        });
    });
}

// ========== FORMULARIO BOOKING ==========
const bookingForms = document.querySelectorAll('.booking-form');

if (bookingForms.length > 0) {
    bookingForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const loader = document.getElementById("formLoader");
            const messageBox = document.getElementById("formMessage");
            loader.style.display = "block";
            messageBox.style.display = "none";

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const eventDate = document.getElementById("eventDate").value.trim();
            const address = document.getElementById("address").value.trim();
            const eventType = document.getElementById("eventType").value.trim();
            const people = document.getElementById("people").value.trim();
            const details = document.getElementById("details").value.trim();

            if (!isValidEmail(email)) {
                loader.style.display = "none";
                showMessage("formMessage", "Please enter a valid email address.", false);
                return;
            }

            const selectedDate = new Date(eventDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate <= today) {
                loader.style.display = "none";
                showMessage("formMessage", "Please select a future date for your event.", false);
                return;
            }

            const params = {
                to_email: "info.wacamole@gmail.com",
                from_name: fullName,
                from_email: email,
                event_date: eventDate,
                event_address: address,
                event_type: eventType,
                number_of_people: people,
                event_details: details || "No additional details provided",
                message: `
                    Catering Request

                    Name: ${fullName}
                    Email: ${email}
                    Event Date: ${eventDate}
                    Address: ${address}
                    Event Type: ${eventType}
                    Number of People: ${people}
                    Details: ${details || "No additional details"}
                `
            };

            emailjs.send(emailServiceID, bookingTemplateID, params).then(function(response) {
                loader.style.display = "none";
                showMessage("formMessage", "Booking request sent successfully! We'll contact you soon.", true);
                document.getElementById("booking-form").reset();
            }, function(error) {
                loader.style.display = "none";
                showMessage("formMessage", "Failed to send request. Please try again later.", false);
                console.error("EmailJS error:", error);
            });
        });
    });
}

// ========== FUNCIONALIDAD DEL ÍCONO DEL CALENDARIO ==========
document.querySelectorAll('.calendar-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const wrapper = icon.closest('.date-input-wrapper');
        if (wrapper) {
            const input = wrapper.querySelector('input[type="text"]');
            if (input && input._flatpickr) {
                input._flatpickr.open();
            }
        }
    });
});

// ========== VALIDACIÓN DE EMAIL ==========
document.querySelectorAll('.booking-form input[type="email"], .contact-form input[type="email"]').forEach(emailInput => {
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

// ========== UTILIDADES ==========
function showMessage(elementId, text, isSuccess) {
    const messageBox = document.getElementById(elementId);
    if (messageBox) {
        messageBox.style.display = "block";
        messageBox.style.color = isSuccess ? "#28a745" : "#D70026";
        messageBox.style.backgroundColor = isSuccess ? "#d4edda" : "#f8d7da";
        messageBox.style.border = `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`;
        messageBox.textContent = text;

        setTimeout(() => {
            messageBox.style.display = "none";
        }, 5000);
    }
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}