import { CustomerAlreadyExistError } from '../../domain/errors/CustomerAlreadyExistError';

import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';

export class CustomerRegister {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(customer: Customer): Promise<void> {
		const isCustomerIdAlreadyRegister = await this.repository.search({
			id: customer.id
		});

		if (isCustomerIdAlreadyRegister) {
			throw new CustomerAlreadyExistError('Id already registered');
		}

		const isCustomerEmailAlreadyRegister = await this.repository.search({
			email: customer.email
		});

		if (isCustomerEmailAlreadyRegister) {
			throw new CustomerAlreadyExistError('Email already registered');
		}

		const isCustomerUsernameAlreadyRegister = await this.repository.search({
			username: customer.username
		});

		if (isCustomerUsernameAlreadyRegister) {
			throw new CustomerAlreadyExistError('Username already registered');
		}

		await this.repository.save(customer);
	}
}
