import { CustomerNotExistError } from '../errors/CustomerNotExistError';

import type { CustomerHashing } from '../models/CustomerHashing';

export const isCustomerPasswordInvalid = (
	hashing: CustomerHashing,
	plain: string,
	hashed: string
) => {
	const isNotEqual = hashing.isNotEqual(plain, hashed);

	if (isNotEqual) {
		throw new CustomerNotExistError('Incorrect Password');
	}
};
