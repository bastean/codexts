import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';

import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';
import type { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';

export class CustomerFind {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(email: CustomerEmail): Promise<Customer> {
		const customer = await this.repository.search(email);

		if (!customer) {
			throw new CustomerNotExistError('Email not found');
		}

		return Promise.resolve(customer);
	}
}
