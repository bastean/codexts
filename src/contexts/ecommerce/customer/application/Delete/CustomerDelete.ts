import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';
import { isCustomerPasswordInvalid } from '../../domain/services/isCustomerPasswordInvalid';

import type { CustomerHashing } from '../../domain/models/CustomerHashing';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';
import type { CustomerId } from '../../domain/valueObjects/CustomerId';
import type { CustomerPassword } from '../../domain/valueObjects/CustomerPassword';

export class CustomerDelete {
	public constructor(
		private readonly repository: CustomerRepository,
		private readonly hashing: CustomerHashing
	) {}

	public async run(id: CustomerId, password: CustomerPassword): Promise<void> {
		const isCustomerRegistered = await this.repository.search({ id });

		if (!isCustomerRegistered) throw new CustomerNotExistError('Id not found');

		isCustomerPasswordInvalid(this.hashing, password.value, isCustomerRegistered.password.value);

		await this.repository.delete(id);
	}
}
