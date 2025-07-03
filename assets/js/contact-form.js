document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("HQ8LSw1CjxkFuB-Or");

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const loader = document.getElementById("formLoader");
        const messageBox = document.getElementById("formMessage");
        loader.style.display = "block"; // Mostrar loader
        messageBox.style.display = "none"; // Ocultar mensajes anteriores

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!email || !message) {
            loader.style.display = "none";
            showMessage("Please fill out all required fields (Email and Message).", false);
            return;
        }

        if (!isValidEmail(email)) {
            loader.style.display = "none";
            showMessage("Please enter a valid email address.", false);
            return;
        }

        let fullMessage = '';
        if (name) {
            fullMessage += `Nombre de contacto: ${name}\n`;
        }

        fullMessage += `Email de contacto: ${email}\n\n${message}`;

        const params = {
            name: name || "Anonymous",
            email: email,
            title: subject || "(No Subject)",
            message: fullMessage
        };

        emailjs.send("service_zb8ilgy", "template_34iwanb", params).then(function(response) {
            loader.style.display = "none";
            showMessage("Message sent successfully!", true);
            document.getElementById("contactForm").reset();
        }, function(error) {
            loader.style.display = "none";
            showMessage("Failed to send message. Please try again later.", false);
            console.error("EmailJS error:", error);
        });
    });

    function showMessage(text, isSuccess) {
        const messageBox = document.getElementById("formMessage");
        messageBox.style.display = "block";
        messageBox.style.color = isSuccess ? "green" : "#D70026";
        messageBox.textContent = text;

        setTimeout(() => {
            messageBox.style.display = "none";
        }, 5000);
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});