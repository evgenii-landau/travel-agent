// import autoCompleteFunc from './modules/autoComplete.js'
// autoCompleteFunc()

import { easepick, TimePlugin } from '@easepick/bundle'

const picker = new easepick.create({
	element: document.getElementById('datePicker'),
	css: [
		'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
		'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@1.2.1/dist/index.css'
	],
	plugins: [TimePlugin],
	format: 'HH:mm, DD/MM/YY'
})

// import mobileNav from './modules/mobile-nav.js';
// mobileNav();
