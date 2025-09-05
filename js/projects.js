const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const indicator = document.querySelector('.indicator');

// Clones para loop infinito
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = Array.from(track.children);

let currentIndex = 1;
let isTransitioning = false;

const slideWidth = 100;
track.style.transform = `translateX(${-slideWidth * currentIndex}%)`;

function updateIndicator() {
    let slideNum = currentIndex;
    if (allSlides[currentIndex].id === 'first-clone') slideNum = 1;
    else if (allSlides[currentIndex].id === 'last-clone') slideNum = slides.length;
    indicator.textContent = `${slideNum} / ${slides.length}`;
}

function moveToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    track.style.transition = 'transform 0.6s ease';
    track.style.transform = `translateX(${-slideWidth * index}%)`;
    currentIndex = index;
}

nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

track.addEventListener('transitionend', () => {
    if (allSlides[currentIndex].id === 'first-clone') {
        track.style.transition = 'none';
        currentIndex = 1;
        track.style.transform = `translateX(${-slideWidth * currentIndex}%)`;
    }
    if (allSlides[currentIndex].id === 'last-clone') {
        track.style.transition = 'none';
        currentIndex = allSlides.length - 2;
        track.style.transform = `translateX(${-slideWidth * currentIndex}%)`;
    }
    updateIndicator();
    isTransitioning = false;
});

updateIndicator();