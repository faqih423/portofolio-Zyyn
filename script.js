// ==========================================
// FAQIH ZAYYAN - PREMIUM PORTFOLIO JAVASCRIPT
// ==========================================


// 1. ELEMENT SELECTOR
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");


// 2. MOBILE NAVIGATION
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("show");

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


// 3. AUTOMATIC YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 4. DIGITAL CLOCK WIB
function updateClock() {

    const now = new Date();

    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    if (clock) {

        clock.textContent = now.toLocaleTimeString("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

    }

    if (date) {

        date.textContent = now.toLocaleDateString("id-ID", {
            timeZone: "Asia/Jakarta",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    }

}

updateClock();

setInterval(updateClock, 1000);


// 5. DARK MODE & LIGHT MODE
function updateThemeIcon() {

    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light");

    themeToggle.innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';

}

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

updateThemeIcon();

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


// 6. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");
                entry.target.classList.remove("hidden");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        element.classList.add("hidden");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("active");
    });

}


// 7. ACTIVE NAVIGATION
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navigationLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );

                });

            }

        });

    }, {
        threshold: 0.35
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


// 8. 3D CARD HOVER EFFECT
const cards = document.querySelectorAll(
    ".skill-card, .project-card"
);

cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 18;
        const rotateY = (x - centerX) / 18;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

});


// 9. TYPING EFFECT
const typingElement = document.querySelector(".hero-content h2");

if (typingElement) {

    const originalText = typingElement.innerHTML;

    const typingTexts = [
        "Creative Mind. Future Developer.",
        "Web Development Engineering.",
        "Always Learning. Always Growing."
    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentText = typingTexts[textIndex];

        if (deleting) {

            charIndex--;

        } else {

            charIndex++;

        }

        typingElement.textContent =
            currentText.substring(0, charIndex);

        let speed = deleting ? 35 : 75;

        if (!deleting && charIndex === currentText.length) {

            deleting = true;
            speed = 1800;

        } else if (deleting && charIndex === 0) {

            deleting = false;

            textIndex = (textIndex + 1) % typingTexts.length;

            speed = 400;

        }

        setTimeout(typeEffect, speed);

    }

    // Aktifkan efek mengetik setelah halaman siap
    setTimeout(typeEffect, 1800);

}


// 10. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// 11. SCROLL TO TOP BUTTON
const backToTop = document.querySelector(".back-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    });

}


// 12. LIGHTNING INTRO EFFECT
window.addEventListener("load", () => {

    // Jangan tampilkan efek dua kali
    if (sessionStorage.getItem("intro-played")) return;

    const lightning = document.createElement("div");

    lightning.className = "lightning";

    document.body.appendChild(lightning);

    sessionStorage.setItem("intro-played", "true");

    setTimeout(() => {

        lightning.remove();

    }, 1300);

});


// 13. CONSOLE WELCOME
console.log(
    "%c FAQIH ZAYYAN PORTFOLIO ",
    "background: #8b5cf6; color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 5px;"
);

console.log(
    "%c Welcome to my digital world! 🚀",
    "color: #06b6d4; font-size: 13px; font-weight: bold;"
);
