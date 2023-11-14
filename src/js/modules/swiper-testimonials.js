import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function swiperFunc() {
	const swiper = new Swiper('#testimonails-col-1', {
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
}

export default swiperFunc;
