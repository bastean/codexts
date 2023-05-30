import { Customer } from 'codexts-contexts-ecommerce/customer/domain/aggregate/Customer';

import { CustomerEmailMother } from '../valueObjects/CustomerEmailMother';
import { CustomerIdMother } from '../valueObjects/CustomerIdMother';
import { CustomerUsernameMother } from '../valueObjects/CustomerUsernameMother';

import type { CustomerRegisterCommand } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommand';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerUsername } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';

export class CustomerMother {
	public static create(id: CustomerId, username: CustomerUsername, email: CustomerEmail): Customer {
		return new Customer(id, username, email);
	}

	public static withIdAndUsername(email: string): Customer {
		return this.create(
			CustomerIdMother.random(),
			CustomerUsernameMother.random(),
			CustomerEmailMother.create(email)
		);
	}

	public static from(command: CustomerRegisterCommand): Customer {
		return this.create(
			CustomerIdMother.create(command.id),
			CustomerUsernameMother.create(command.username),
			CustomerEmailMother.create(command.email)
		);
	}

	public static random(): Customer {
		return this.create(
			CustomerIdMother.random(),
			CustomerUsernameMother.random(),
			CustomerEmailMother.random()
		);
	}
}
