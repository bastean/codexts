import { Customer } from 'codexts-contexts-ecommerce/customer/domain/aggregate/Customer';

import { CustomerEmailMother } from '../valueObjects/CustomerEmailMother';
import { CustomerIdMother } from '../valueObjects/CustomerIdMother';
import { CustomerPasswordMother } from '../valueObjects/CustomerPasswordMother';
import { CustomerUsernameMother } from '../valueObjects/CustomerUsernameMother';

import type { CustomerRegisterCommand } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommand';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerPassword } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPassword';
import type { CustomerUsername } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';

export class CustomerMother {
	public static create(
		id: CustomerId,
		email: CustomerEmail,
		username: CustomerUsername,
		password: CustomerPassword
	): Customer {
		return new Customer(id, email, username, password);
	}

	public static fromCommand(command: CustomerRegisterCommand): Customer {
		return this.create(
			CustomerIdMother.create(command.id),
			CustomerEmailMother.create(command.email),
			CustomerUsernameMother.create(command.username),
			CustomerPasswordMother.create(command.password)
		);
	}

	public static invalid(): Customer {
		return this.create(
			CustomerIdMother.invalid(),
			CustomerEmailMother.invalid(),
			CustomerUsernameMother.withInvalidLength(),
			CustomerPasswordMother.hashedWithInvalidLength()
		);
	}

	public static random(): Customer {
		return this.create(
			CustomerIdMother.random(),
			CustomerEmailMother.random(),
			CustomerUsernameMother.random(),
			CustomerPasswordMother.hashedRandom()
		);
	}

	public static randomExceptId(id: string): Customer {
		return this.create(
			CustomerIdMother.create(id),
			CustomerEmailMother.random(),
			CustomerUsernameMother.random(),
			CustomerPasswordMother.hashedRandom()
		);
	}

	public static randomExceptEmail(email: string): Customer {
		return this.create(
			CustomerIdMother.random(),
			CustomerEmailMother.create(email),
			CustomerUsernameMother.random(),
			CustomerPasswordMother.hashedRandom()
		);
	}

	public static randomExceptUsername(username: string): Customer {
		return this.create(
			CustomerIdMother.random(),
			CustomerEmailMother.random(),
			CustomerUsernameMother.create(username),
			CustomerPasswordMother.hashedRandom()
		);
	}

	public static randomExceptPassword(password: string): Customer {
		return this.create(
			CustomerIdMother.random(),
			CustomerEmailMother.random(),
			CustomerUsernameMother.random(),
			CustomerPasswordMother.create(password)
		);
	}
}
