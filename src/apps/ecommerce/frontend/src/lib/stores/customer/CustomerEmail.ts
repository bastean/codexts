import { writable, get } from 'svelte/store';

import { Validator } from '../../utils/Validator';

export const CustomerEmail = writable('');
export const CustomerEmailInvalid = writable(false);

export const isCustomerEmailValid = (): boolean => {
	if (Validator.isEmail(get(CustomerEmail))) {
		return true;
	}

	CustomerEmailInvalid.set(true);

	return false;
};
