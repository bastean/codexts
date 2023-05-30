import { writable } from 'svelte/store';

export const showErrorNotification = writable('');
let isNotErrorShowing = true;

showErrorNotification.subscribe((message) => {
	if (isNotErrorShowing && message !== '') {
		isNotErrorShowing = false;

		setTimeout(() => {
			showErrorNotification.set('');
			isNotErrorShowing = true;
		}, 3000);
	}
});
