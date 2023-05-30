import { writable, get } from 'svelte/store';

import { Validator } from '../../utils/Validator';

export const CustomerUsername = writable('');
export const CustomerUsernameInvalid = writable(false);

export const isCustomerUsernameValid = (): boolean => {
	if (!Validator.isEmpty(get(CustomerUsername))) {
		return true;
	}

	CustomerUsernameInvalid.set(true);

	return false;
};
