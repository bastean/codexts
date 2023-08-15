import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

type Customer = {
	id?: string;
	email?: string;
	username?: string;
};

const key = 'codexts-customer';

export const CustomerStore = persist(
	writable<Customer | null>(null),
	createLocalStorage(true),
	key
);
