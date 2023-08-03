import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';
import { Password } from '../../domain/services/Password';

import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';
import type { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';

export class CustomerLogin {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(email: CustomerEmail, password: string): Promise<Customer> {
		const registeredCustomer = await this.repository.search({ email });

		if (!registeredCustomer) throw new CustomerNotExistError('Email not found');

		if (Password.isNotEqual(password, registeredCustomer.password)) {
			throw new CustomerNotExistError('Incorrect Password');
		}

		return Promise.resolve(registeredCustomer);
	}
}
