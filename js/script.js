$(document).ready(function () {

const hamburger = document.querySelector(".hamburger"); 
const navList = document.querySelector(".nav__list");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");
})


  function theaterView(selector) {
    $(selector).click(function () {
      // Get the video source URL from the iframe inside the clicked element
      var videoSrc = $(this).find('iframe').attr('src');
      
      // Add autoplay=1 to the video URL to auto-start the video
      var autoplaySrc = videoSrc.includes('?') ? videoSrc + '&autoplay=1' : videoSrc + '?autoplay=1';
      
      // Set the video source URL in the pop-up iframe
      $('#theater__video').attr('src', autoplaySrc);
      
      // Fade in the pop-up video player
      $('#theater_view').fadeIn(400);
    });
  }

  // Handle closing the pop-up video player
  $('.theater__card .close').click(function () {
    $('#theater_view').fadeOut(400, function () {
      // Clear the video source URL to stop the video
      $('#theater__video').attr('src', '');
    });
  });


  theaterView('.hero__video');

// Carousel
const carousel = document.querySelector('.carousel');
const reviewBoxes = document.querySelectorAll('.review__box');
let currentIndex = 0;

function getReviewsToShow() {
    const containerWidth = document.querySelector('.carousel__container').clientWidth;
    if (containerWidth >= 1000) {
        return 3; 
    } else if (containerWidth >= 600) {
        return 2; 
    } else {
        return 1;
    }
}

function cloneBoxes() {
    const reviewsToShow = getReviewsToShow();
    for (let i = 0; i < reviewsToShow; i++) {
        const clone = reviewBoxes[i].cloneNode(true);
        carousel.appendChild(clone);
    }
}

function removeClones() {
    const clones = document.querySelectorAll('.carousel .review__box');
    for (let i = reviewBoxes.length; i < clones.length; i++) {
        clones[i].remove();
    }
}

// Function to update the carousel's position
function updateCarousel() {
    const reviewsToShow = getReviewsToShow();
    const width = document.querySelector('.review__box').clientWidth + 20;
    currentIndex++;
    
    carousel.style.transform = `translateX(${-width * currentIndex}px)`;

    // If we have reached the end of the original set of reviews, reset the position
    if (currentIndex === reviewBoxes.length) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = 0;
            carousel.style.transform = `translateX(0px)`; 
        }, 500); 
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
        }, 600);
    }
}


setInterval(updateCarousel, 2000);


cloneBoxes();

window.addEventListener('resize', () => {
    removeClones(); 
    cloneBoxes(); 
});


});
