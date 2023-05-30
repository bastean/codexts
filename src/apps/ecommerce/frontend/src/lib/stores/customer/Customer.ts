import { writable, readonly } from 'svelte/store';
import { v4 as randomUUID } from 'uuid';

import { CustomerEmail, isCustomerEmailValid } from './CustomerEmail';
import { CustomerUsername, isCustomerUsernameValid } from './CustomerUsername';

interface ICustomer {
	id: string;
	username: string;
	email: string;
}

const store = writable<ICustomer>({
	id: randomUUID(),
	username: '',
	email: ''
});

export const Customer = readonly(store);

CustomerUsername.subscribe((username) => {
	store.update((currentCustomer) => ({ ...currentCustomer, username }));
});

CustomerEmail.subscribe((email) => {
	store.update((currentCustomer) => ({ ...currentCustomer, email }));
});

export const isCustomerValid = (): boolean => {
	let hasCustomerValidValues = true;

	hasCustomerValidValues = isCustomerUsernameValid();
	hasCustomerValidValues = isCustomerEmailValid();

	return hasCustomerValidValues;
};
