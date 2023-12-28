import * as templateSlider from '@components/Slider/slider.hbs';
import * as templateSliderLine from '@components/Slider/sliderLine.hbs';
import { Component } from '@components/component';
import { ROOT } from '@utils/config';

export interface Slider {
  state: {
    slideIndex: number;
    prevHTML: any;
    nextHTML: any;
    sliderHTML: any;
    number: number;
  };
}

/**
 * Класс рендеринга слайдера
 * @class Slider
 * @typedef {Slider}
 */
export class Slider extends Component {
  constructor (ROOT, num = 0) {
    super(ROOT);
    this.state = {
      slideIndex: 0,
      prevHTML: '',
      nextHTML: '',
      sliderHTML: '',
      number: num
    };
  }

  /**
   * Метод рендеринга слайдера
   * @return {string} html слайдера
   */
  render () {
    return templateSlider();
  }

  /**
   * Метод рендеринга линейного слайдера
   * @return {string} html слайдера
   */
  renderLine () {
    return templateSliderLine();
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
    this.state.slideIndex++;
    if (this.state.slideIndex > slides.length) {
      this.state.slideIndex = 1;
    }

    try {
      slides[this.state.slideIndex - 1].style.display = 'block';
      setTimeout(this.showSlidesAuto.bind(this), 7000);
    } catch {}
  }

  showSliders () {
    const slider = document.querySelectorAll('.slider-container');
    this.state.sliderHTML = slider.length === 2 ? slider[0] : slider[1];
    this.state.prevHTML = document.querySelector('.slider-prev');
    this.state.nextHTML = document.querySelector('.slider-next');

    this.state.prevHTML?.addEventListener('click', () => {
      this.state.sliderHTML.style.scrollBehavior = 'smooth';
      this.state.sliderHTML.scrollLeft -= 280;
    });

    this.state.nextHTML?.addEventListener('click', () => {
      this.state.sliderHTML.style.scrollBehavior = 'smooth';
      this.state.sliderHTML.scrollLeft += 280;
    });
  }

  addEvents () {
    const sliderFull = document.querySelector('.slideshow-container');
    sliderFull?.classList.remove('noactive');

    this.showSlidesAuto();
  }

  addEventsLine () {
    const sliderFull = document.querySelector('.slider-full');
    sliderFull?.classList.remove('noactive');

    this.addEvents();
    this.showSliders();

    this.resizeEvent();
    window.addEventListener('resize', this.resizeEvent.bind(this));
  }

  addLine () {
    const slider = document.querySelectorAll('.slider-container');
    this.state.prevHTML = document.querySelector('.line-prev');
    this.state.nextHTML = document.querySelector('.line-next');
    this.state.sliderHTML = slider.length === 1 ? slider[0] : slider[1];

    this.state.prevHTML?.addEventListener('click', () => {
      this.state.sliderHTML.style.scrollBehavior = 'smooth';
      this.state.sliderHTML.scrollLeft -= 280;
    });

    this.state.nextHTML?.addEventListener('click', () => {
      this.state.sliderHTML.style.scrollBehavior = 'smooth';
      this.state.sliderHTML.scrollLeft += 280;
    });

    this.resizeEvent();
    window.addEventListener('resize', this.resizeEvent.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeEvent.bind(this));
  }

  resizeEvent () {
    let sliderAll;
    if (this.state.number === 0) {
      sliderAll = document.querySelectorAll('.slider')[0];
    } else if (this.state.number === 1) {
      sliderAll = document.querySelectorAll('.slider')[1];
    }

    if (
      this.state.sliderHTML?.offsetWidth < sliderAll?.offsetWidth ||
      window.innerWidth <= 500 ||
      sliderAll?.offsetWidth === 0
    ) {
      this.state.prevHTML.style.display = 'none';
      this.state.nextHTML.style.display = 'none';
    } else {
      this.state.prevHTML.style.display = 'block';
      this.state.nextHTML.style.display = 'block';
    }
  }
}

export const slider = new Slider(ROOT);
