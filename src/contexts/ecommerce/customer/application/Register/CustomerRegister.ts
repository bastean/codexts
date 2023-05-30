import { CustomerAlreadyExistError } from '../../domain/errors/CustomerAlreadyExistError';

import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';

export class CustomerRegister {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(customer: Customer): Promise<void> {
		const isCustomerEmailAlreadyRegister = await this.repository.search(
			customer.email,
			customer.id
		);

		if (isCustomerEmailAlreadyRegister) {
			throw new CustomerAlreadyExistError('Email already registered');
		}

		await this.repository.save(customer);
	}
}
