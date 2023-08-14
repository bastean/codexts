import { CustomerNotExistError } from '../../domain/errors/CustomerNotExistError';

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
		const registeredCustomer = await this.repository.search({ id });

		if (!registeredCustomer) throw new CustomerNotExistError('Id not found');

		if (this.hashing.isNotEqual(password.value, registeredCustomer.password.value)) {
			throw new CustomerNotExistError('Incorrect Password');
		}

		await this.repository.delete(id);
	}
}
