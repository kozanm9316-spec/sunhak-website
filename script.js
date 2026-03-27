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