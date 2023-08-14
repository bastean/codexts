import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';

import type { CustomerDeleteCommand } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommand';
import type { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerPassword } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPassword';

export class CustomerDeleteCommandMother {
	public static create(id: CustomerId, password: CustomerPassword): CustomerDeleteCommand {
		return { id: id.value, password: password.value };
	}

	public static random(): CustomerDeleteCommand {
		return this.create(CustomerIdMother.random(), CustomerPasswordMother.random());
	}

	public static invalid(): CustomerDeleteCommand {
		return this.create(CustomerIdMother.invalid(), CustomerPasswordMother.withInvalidLength());
	}
}
