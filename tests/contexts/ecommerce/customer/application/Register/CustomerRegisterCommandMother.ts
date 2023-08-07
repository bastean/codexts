import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';
import { CustomerUsernameMother } from '../../domain/valueObjects/CustomerUsernameMother';

import type { CustomerRegisterCommand } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommand';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerPassword } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPassword';
import type { CustomerUsername } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';

export class CustomerRegisterCommandMother {
	public static create(
		id: CustomerId,
		email: CustomerEmail,
		username: CustomerUsername,
		password: CustomerPassword
	): CustomerRegisterCommand {
		return { id: id.value, email: email.value, username: username.value, password: password.value };
	}

	public static random(): CustomerRegisterCommand {
		return this.create(
			CustomerIdMother.random(),
			CustomerEmailMother.random(),
			CustomerUsernameMother.random(),
			CustomerPasswordMother.random()
		);
	}

	public static invalid(): CustomerRegisterCommand {
		return this.create(
			CustomerIdMother.invalid(),
			CustomerEmailMother.invalid(),
			CustomerUsernameMother.withInvalidLength(),
			CustomerPasswordMother.withInvalidLength()
		);
	}
}
