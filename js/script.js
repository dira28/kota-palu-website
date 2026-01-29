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
