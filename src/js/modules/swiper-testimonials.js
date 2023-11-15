import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function swiperFunc() {
	let swiper;
	let swiperHorizontal;

	// Устанавливаем breakpoint
	const breakpoint = window.matchMedia('(max-width: 1023px)');

	// Ф-я которая проверяет срабатывание media запросов
	const breakpointChecker = function () {
		if (breakpoint.matches === true) {
			swiperHorizontal = new Swiper('#testimonials__horizontal-swiper', {
				direction: 'horizontal',
				slidesPerView: 1,
				// slidesPerView: 'auto',
				spaceBetween: 32,
				grabCursor: true,
				a11y: false,
				freeMode: true,
				speed: 8000,
				loop: true,
				autoplay: {
					delay: 0.0,
					disableOnInteraction: false,
				},
				425: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 40,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 50,
				},
			});
			return;
		} else if (breakpoint.matches === false) {
			swiper = new Swiper('#testimonails-col-1', {
				direction: 'vertical',
				// slidesPerView: 4,
				slidesPerView: 'auto',
				spaceBetween: 0,
				grabCursor: true,
				a11y: false,
				freeMode: true,
				speed: 8000,
				loop: true,
				autoplay: {
					delay: 0.0,
					disableOnInteraction: false,
				},
			});
			if (swiperHorizontal !== undefined)
				swiperHorizontal.destroy(true, true);
			return;
		}
	};

	breakpoint.addListener(breakpointChecker);
	breakpointChecker();
}

export default swiperFunc;
