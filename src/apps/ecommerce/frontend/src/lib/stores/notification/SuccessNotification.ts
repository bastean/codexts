import { writable } from 'svelte/store';

export const showSuccessNotification = writable('');
let isNotSuccessShowing = true;

showSuccessNotification.subscribe((message) => {
	if (isNotSuccessShowing && message !== '') {
		isNotSuccessShowing = false;

		setTimeout(() => {
			showSuccessNotification.set('');
			isNotSuccessShowing = true;
		}, 3000);
	}
});
