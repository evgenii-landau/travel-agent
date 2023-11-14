import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function swiperFunc() {
	const swiper = new Swiper('#swiper-popular', {
		slidesPerView: 1,
		spaceBetween: 32,
		navigation: {
			nextEl: '#sliderNext',
			prevEl: '#sliderPrev',
		},
		breakpoints: {
			425: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 50,
			},
		},
	});
}

export default swiperFunc;
