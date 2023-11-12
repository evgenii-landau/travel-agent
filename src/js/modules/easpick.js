import { easepick, TimePlugin } from '@easepick/bundle';

function easepickFunc() {
	const picker = new easepick.create({
		element: document.getElementById('datePicker'),
		css: [
			'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
			'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@1.2.1/dist/index.css',
		],
		plugins: [TimePlugin],
		zIndex: 10,
		format: 'HH:mm, DD/MM/YY',
	});
}

export default easepickFunc;
