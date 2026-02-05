const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in, .fade-up")
    .forEach(el => observer.observe(el));

window.addEventListener("load", () => {
    const images = document.querySelectorAll(".hero-img");

    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add("show");
        }, index * 250);
    });
});

// cardinfo
const infoCards = document.querySelectorAll(".info-card");

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

function animateCardsOnScroll() {
    infoCards.forEach((card, index) => {
        if (!card.classList.contains("show") && isInViewport(card)) {
            setTimeout(() => {
                card.classList.add("show");
            }, index * 250);
        }
    });
}

window.addEventListener("scroll", animateCardsOnScroll);

window.addEventListener("load", animateCardsOnScroll);

//panah
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

const carouselItems = [
    document.getElementById("carouselItem1"),
    document.getElementById("carouselItem2"),
    document.getElementById("carouselItem3"),
    document.getElementById("carouselItem4"),
    document.getElementById("carouselItem5")
];

let currentIndex = 0;

function showItem(index) {
    carouselItems.forEach((item, i) => {
        item.style.display = i === index ? "block" : "none";
    });

    if (currentIndex === 0) {
        prevArrow.style.opacity = 0.3;
        prevArrow.style.cursor = "default";
    } else {
        prevArrow.style.opacity = 1;
        prevArrow.style.cursor = "pointer";
    }

    if (currentIndex === carouselItems.length - 1) {
        nextArrow.style.opacity = 0.3;
        nextArrow.style.cursor = "default";
    } else {
        nextArrow.style.opacity = 1;
        nextArrow.style.cursor = "pointer";
    }
}

nextArrow.addEventListener("click", () => {
    if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
        showItem(currentIndex);
    }
});

prevArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showItem(currentIndex);
    }
});

showItem(currentIndex);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight Active Section in Navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Music Button Feedback
function muteMusic() {
    const bgm = document.getElementById('bgm');
    bgm.muted = true;
    bgm.pause();
    document.querySelectorAll('.tombolMusik').forEach(button => button.classList.remove('active'));
}

function unmuteMusic() {
    const bgm = document.getElementById('bgm');
    bgm.muted = false;
    bgm.play();
    document.querySelectorAll('.tombolMusik').forEach(button => button.classList.add('active'));
}

// Hamburger Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');

        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.1, // Trigger earlier
        rootMargin: "-10px 0px -10px 0px" // Trigger slightly inside the viewport
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When it enters the screen (scrolling down OR up)
                entry.target.classList.add("active");
            } else {
                // When it leaves the screen (scrolling past it)
                // This resets the state so it can animate again!
                entry.target.classList.remove("active");
            }
        });
    }, observerOptions);

    // List all elements that should react to scroll
    const reactiveElements = document.querySelectorAll(
        'section, .info-card, .kesenian-card, .adat-card, .wisata-card, .keberagaman-image-item, .hero-left, .image-stack'
    );

    reactiveElements.forEach(el => {
        el.classList.add("reveal");
        scrollObserver.observe(el);
    });
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? "down" : "up";

    // Add a class to the body to help CSS know which way we are moving
    if (direction === "up") {
        document.body.classList.add("scrolling-up");
        document.body.classList.remove("scrolling-down");
    } else {
        document.body.classList.add("scrolling-down");
        document.body.classList.remove("scrolling-up");
    }

    lastScrollY = currentScrollY;
});

document.addEventListener("DOMContentLoaded", () => {
    const bubble = document.getElementById("image-bubble");
    const bubbleImg = bubble.querySelector("img");
    const teamLinks = document.querySelectorAll(".team-link");

    teamLinks.forEach(link => {
        // 1. Show and set image on Mouse Enter
        link.addEventListener("mouseenter", (e) => {
            const imageUrl = link.getAttribute("data-image");
            bubbleImg.src = imageUrl;
            bubble.classList.add("active");
        });

        // 2. Make the bubble follow the cursor
        link.addEventListener("mousemove", (e) => {
            // We use requestAnimationFrame for silky smooth performance
            requestAnimationFrame(() => {
                bubble.style.left = `${e.clientX}px`;
                bubble.style.top = `${e.clientY}px`;
            });
        });

        // 3. Hide on Mouse Leave
        link.addEventListener("mouseleave", () => {
            bubble.classList.remove("active");
        });
    });
});