// export const func = () => {
//     let slideIndex = 1;
//
//
//     const plusSlides = () => {
//         showSlides(slideIndex += 1);
//     };
//
//     const minusSlides = () => {
//         showSlides(slideIndex -= 1);
//     };
//
//     function showSlides(n) {
//         const slides = document.getElementsByClassName('mySlides');
//         if (n > slides.length) {
//             slideIndex = 1;
//         }
//         if (n < 1) {
//             slideIndex = slides.length;
//         }
//         for (let i = 0; i < slides.length; i++) {// @ts-ignore
//             slides[i].style.display = "none";
//         }// @ts-ignore
//         slides[slideIndex - 1].style.display = 'block';
//     }
//
//
//
//     const prev = document.querySelector('.prev');
//     const next = document.querySelector('.next');
//
//     prev?.addEventListener('click', minusSlides);
//     next?.addEventListener('click', plusSlides);
//     showSlides(slideIndex);
// };
export const func = () => {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slides = Array.from(slider!.querySelectorAll('img'));
    const slideCount = slides.length;
    let slideIndex = 0;


    prevButton?.addEventListener('click', showPreviousSlide);
    nextButton?.addEventListener('click', showNextSlide);

    function showPreviousSlide() {
        slideIndex = (slideIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }

    function showNextSlide() {
        slideIndex = (slideIndex + 1) % slideCount;
        updateSlider();
    }

    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

// Инициализация слайдера
    updateSlider();

}

