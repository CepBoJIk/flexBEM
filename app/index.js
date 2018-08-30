import Slider from './js/slider';

const script = require('./js/script');
require('./scss/style.scss');

script();

const sliderUl = document.querySelector('.slider');
const prev = document.querySelector('.slider-wrapper .prev');
const next = document.querySelector('.slider-wrapper .next');

const slider = new Slider(sliderUl, prev, next);
slider.init();
