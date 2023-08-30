import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';
import { isCustomerPasswordInvalid } from '../../domain/services/isCustomerPasswordInvalid';
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
		const isCustomerRegistered = await this.repository.search({ id: new CustomerId(id) });

		if (!isCustomerRegistered) throw new CustomerNotExistError('Id not found');

		const isCustomerPasswordUpdated = updatedPassword !== undefined;

		if (isCustomerPasswordUpdated) {
			isCustomerPasswordInvalid(
				this.hashing,
				currentPassword ?? '',
				isCustomerRegistered.password.value
			);
		}

		const customerValuesToUpdate = {
			id: new CustomerId(id).value,
			email: email !== undefined ? new CustomerEmail(email).value : undefined,
			username: username !== undefined ? new CustomerUsername(username).value : undefined,
			password: isCustomerPasswordUpdated ? new CustomerPassword(updatedPassword).value : undefined
		};

		await this.repository.update(customerValuesToUpdate);
	}
}
