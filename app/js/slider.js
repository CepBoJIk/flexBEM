export default class Slider {
  constructor(sliderUl, prevBtn, nextBtn) {
    this.prev = prevBtn;
    this.next = nextBtn;
    this.slider = sliderUl;
    this.sliderHeight = this.slider.children[0].offsetHeight;
    this.itemsLength = this.calculateItemLength();
    this.activeSlide = 0;
  }

  init() {
    this.prev.addEventListener('click', this.prevSlide.bind(this));
    this.next.addEventListener('click', this.nextSlide.bind(this));
  }

  calculateItemLength() {
    const { children } = this.slider;

    const listItems = [].map.call(children, elem => elem.tagName === 'LI');

    return listItems.length;
  }

  prevSlide() {
    if (this.activeSlide === 0) {
      this.activeSlide = this.itemsLength - 1;
    } else {
      this.activeSlide -= 1;
    }

    this.slider.style.marginTop = `${-(this.activeSlide * this.sliderHeight)}px`;
  }

  nextSlide() {
    if (this.activeSlide === this.itemsLength - 1) {
      this.activeSlide = 0;
    } else {
      this.activeSlide += 1;
    }

    this.slider.style.marginTop = `${-(this.activeSlide * this.sliderHeight)}px`;
  }
}
