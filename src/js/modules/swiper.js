import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function swiperFunc() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 4,
		spaceBetween: 32,
		navigation: {
			nextEl: '#sliderNext',
			prevEl: '#sliderPrev',
		},
	});
}

export default swiperFunc;
