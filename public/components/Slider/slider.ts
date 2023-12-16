import * as templateSlider from '@components/Slider/slider.hbs';

/**
 * Класс рендеринга авторизации
 * @class Slider
 * @typedef {Slider}
 */
export class Slider {
  slideIndex = 0;

  /**
   * Метод рендеринга элемента
   * @return {string} html авторизации
   */
  render () {
    return templateSlider();
  }

  plusSlides () {
    this.showSlides((this.slideIndex += 1));
  }

  minusSlides () {
    this.showSlides((this.slideIndex -= 1));
  }

  showSlides (n) {
    const slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[this.slideIndex - 1].style.display = 'block';
  }

  showSlidesAuto () {
    const bannerContainer = document.getElementById('banner-container');
    bannerContainer?.remove();

    let i;
    const slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }

    try {
      slides[this.slideIndex - 1].style.display = 'block';
      setTimeout(this.showSlidesAuto.bind(this), 7000);
    } catch {}

    // document.addEventListener('DOMContentLoaded', () => {fetchBanner();});

    // const fetchBanner = () => {
    //   fetch('http://84.23.53.168:8080/api/v1/getad?id=1')
    //       .then(response => {
    //         return response.text();
    //       })
    //       .then(data => {
    //         const bannerContainer = document.getElementById('banner-container');
    //         bannerContainer!.innerHTML = data;
    //       })
    //       .catch(error => {
    //         console.error('Fetch error:', error);
    //         const bannerContainer = document.getElementById('banner-container');
    //         bannerContainer?.remove();
    //
    //         let i;
    //         const slides = document.getElementsByClassName(
    //             'mySlides'
    //         ) as HTMLCollectionOf<HTMLElement>;
    //         for (i = 0; i < slides.length; i++) {
    //           slides[i].style.display = 'none';
    //         }
    //         this.slideIndex++;
    //         if (this.slideIndex > slides.length) {
    //           this.slideIndex = 1;
    //         }
    //
    //         try {
    //           slides[this.slideIndex - 1].style.display = 'block';
    //           setTimeout(this.showSlidesAuto.bind(this), 7000);
    //         } catch {
    //           console.log('ShowSlides', error);
    //         }
    //       });
  }

  showSliders () {
    const sliders = document.querySelector('.slider') as HTMLElement;
    const prev = document.querySelector('.slider-prev');
    const next = document.querySelector('.slider-next');

    sliders.addEventListener('wheel', (event) => {
      event.preventDefault();
      sliders.scrollLeft += event.deltaY;
      sliders.style.scrollBehavior = 'smooth';
    });

    prev?.addEventListener('click', () => {
      sliders.style.scrollBehavior = 'smooth';
      sliders.scrollLeft -= 280;
    });

    next?.addEventListener('click', () => {
      sliders.style.scrollBehavior = 'smooth';
      sliders.scrollLeft += 280;
    });
  }

  addEvents () {
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    prev?.addEventListener('click', this.minusSlides.bind(this));
    next?.addEventListener('click', this.plusSlides.bind(this));

    const sliderFull = document.querySelector('.slideshow-container');
    sliderFull?.classList.remove('noactive');

    this.showSlidesAuto();
  }

  addEventsLine () {
    const sliderFull = document.querySelector('.slider-full');
    const sliderContainer = document.querySelector('.slider-container');
    const sliders = document.querySelector('.slider') as HTMLElement;
    sliderFull?.classList.remove('noactive');

    let startX = 0; // Инициализируем startX значением 0
    const handleTouchStart = (event) => {
      startX = event.touches[0].clientX; // Запоминаем позицию касания относительно слайдера
    }

    const handleTouchMove = (event) => {
      const currentX = event.touches[0].clientX;
      const diffX = startX - currentX;

      sliders.scrollLeft = diffX;

    }

    sliderContainer?.addEventListener('touchstart', handleTouchStart, false);
    sliderContainer?.addEventListener('touchmove', handleTouchMove, false);

    this.showSliders();
  }
}

export const slider = new Slider();
