import { Customer } from '../../domain/aggregate/Customer';
import { CustomerAlreadyExistError } from '../../domain/errors/CustomerAlreadyExistError';
import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';
import { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';
import { CustomerId } from '../../domain/valueObjects/CustomerId';
import { CustomerPassword } from '../../domain/valueObjects/CustomerPassword';
import { CustomerUsername } from '../../domain/valueObjects/CustomerUsername';

import type { CustomerRepository } from '../../domain/repository/CustomerRepository';

export class CustomerUpdate {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(
		id: string,
		email?: string,
		username?: string,
		password?: string
	): Promise<void> {
		const customerAlreadyRegistered = await this.repository.search({ id: new CustomerId(id) });

		if (!customerAlreadyRegistered) throw new CustomerNotExistError('Not found');

		const isCustomerEmailAlreadyRegistered =
			email !== undefined &&
			(await this.repository.search({ email: new CustomerEmail(email) })) !== undefined;

		if (isCustomerEmailAlreadyRegistered) {
			throw new CustomerAlreadyExistError('Email already registered');
		}

		const isCustomerUsernameAlreadyRegistered =
			username !== undefined &&
			(await this.repository.search({ username: new CustomerUsername(username) })) !== undefined;

		if (isCustomerUsernameAlreadyRegistered) {
			throw new CustomerAlreadyExistError('Username already registered');
		}

		const customer = Customer.fromPrimitives({
			id,
			email: email !== undefined ? email : customerAlreadyRegistered.email.value,
			username: username !== undefined ? username : customerAlreadyRegistered.username.value,
			password:
				password !== undefined
					? CustomerPassword.fromPlainToHashed(password).value
					: customerAlreadyRegistered.password.value
		});

		await this.repository.update(customer);
	}
}
