import { CustomerAlreadyExistError } from '../../domain/errors/CustomerAlreadyExistError';

import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';

export class CustomerRegister {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(customer: Customer): Promise<void> {
		const isCustomerIdAlreadyRegistered = await this.repository.search({
			id: customer.id
		});

		if (isCustomerIdAlreadyRegistered) {
			throw new CustomerAlreadyExistError('Id already registered');
		}

		const isCustomerEmailAlreadyRegistered = await this.repository.search({
			email: customer.email
		});

		if (isCustomerEmailAlreadyRegistered) {
			throw new CustomerAlreadyExistError('Email already registered');
		}

		const isCustomerUsernameAlreadyRegistered = await this.repository.search({
			username: customer.username
		});

		if (isCustomerUsernameAlreadyRegistered) {
			throw new CustomerAlreadyExistError('Username already registered');
		}

		await this.repository.save(customer);
	}
}
