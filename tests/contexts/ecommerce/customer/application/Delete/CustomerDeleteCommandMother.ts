import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';

import type { CustomerDeleteCommand } from 'coding-conventions-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommand';
import type { CustomerId } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerId';

export class CustomerDeleteCommandMother {
	public static create(id: CustomerId): CustomerDeleteCommand {
		return { id: id.value };
	}

	public static random(): CustomerDeleteCommand {
		return this.create(CustomerIdMother.random());
	}

	public static EmptyId(): CustomerDeleteCommand {
		return {
			id: ''
		};
	}

	public static invalidId(): CustomerDeleteCommand {
		return {
			id: CustomerIdMother.invalid()
		};
	}
}
