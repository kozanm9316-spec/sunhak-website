let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot'); // New: Grab the dots

function showSlide(index) {
    // 1. Reset everything
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active'); // Remove active from current dot
    
    // 2. Calculate new index
    currentSlide = (index + slides.length) % slides.length;
    
    // 3. Set new active states
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active'); // Add active to the new dot
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

// Allow users to click a specific dot to jump to that slide
function currentSlideTo(index) {
    showSlide(index);
}

// Auto-play
setInterval(() => {
    moveSlide(1);
}, 5000);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the item is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once it's shown, we can stop observing it
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target all timeline items with the 'reveal' class
document.querySelectorAll('.reveal').forEach(item => {
    observer.observe(item);
});

const backToTopButton = document.querySelector("#backToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
}

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Creates a prestigious, slow glide back to the top
    });
});
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
const menuToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Function to toggle menu
function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    
    // Toggle the icon between bars and X
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);

    // Prevent scrolling when menu is open
    body.style.overflow = isOpen ? 'hidden' : 'auto';
}

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents immediate closing
        toggleMenu();
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) toggleMenu();
    });
});

// Close menu when clicking anywhere outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});