import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';
import { isCustomerPasswordInvalid } from '../../domain/services/isCustomerPasswordInvalid';

import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerHashing } from '../../domain/models/CustomerHashing';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';
import type { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';
import type { CustomerPassword } from '../../domain/valueObjects/CustomerPassword';

export class CustomerLogin {
	public constructor(
		private readonly repository: CustomerRepository,
		private readonly hashing: CustomerHashing
	) {}

	public async run(email: CustomerEmail, password: CustomerPassword): Promise<Customer> {
		const isCustomerRegistered = await this.repository.search({ email });

		if (!isCustomerRegistered) throw new CustomerNotExistError('Email not found');

		isCustomerPasswordInvalid(this.hashing, password.value, isCustomerRegistered.password.value);

		return Promise.resolve(isCustomerRegistered);
	}
}
