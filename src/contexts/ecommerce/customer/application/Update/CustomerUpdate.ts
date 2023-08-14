import { CustomerAlreadyExistError } from '../../domain/errors/CustomerAlreadyExistError';
import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';
import { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';
import { CustomerId } from '../../domain/valueObjects/CustomerId';
import { CustomerPassword } from '../../domain/valueObjects/CustomerPassword';
import { CustomerUsername } from '../../domain/valueObjects/CustomerUsername';

import type { CustomerHashing } from '../../domain/models/CustomerHashing';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';

export class CustomerUpdate {
	public constructor(
		private readonly repository: CustomerRepository,
		private readonly hashing: CustomerHashing
	) {}

	public async run(
		id: string,
		email?: string,
		username?: string,
		currentPassword?: string,
		updatedPassword?: string
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

		const isCustomerPasswordUpdated = updatedPassword !== undefined;
		const isCustomerCurrentPasswordInvalid = this.hashing.isNotEqual(
			currentPassword ?? '',
			customerAlreadyRegistered.password.value
		);

		if (isCustomerPasswordUpdated && isCustomerCurrentPasswordInvalid) {
			throw new CustomerNotExistError('Incorrect Password');
		}

		await this.repository.update({
			id: new CustomerId(id).value,
			email: email !== undefined ? new CustomerEmail(email).value : email,
			username: username !== undefined ? new CustomerUsername(username).value : username,
			password:
				updatedPassword !== undefined
					? new CustomerPassword(updatedPassword).value
					: updatedPassword
		});
	}
}
