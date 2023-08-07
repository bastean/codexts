import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';

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
		const registeredCustomer = await this.repository.search({ email });

		if (!registeredCustomer) throw new CustomerNotExistError('Email not found');

		if (this.hashing.isNotEqual(password.value, registeredCustomer.password.value)) {
			throw new CustomerNotExistError('Incorrect Password');
		}

		return Promise.resolve(registeredCustomer);
	}
}
