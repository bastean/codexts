import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';
import { CustomerUsernameMother } from '../../domain/valueObjects/CustomerUsernameMother';

import type { CustomerRegisterCommand } from 'coding-conventions-contexts-ecommerce/customer/application/Register/CustomerRegisterCommand';
import type { CustomerEmail } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerUsername } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';

export class CustomerRegisterCommandMother {
	public static create(
		id: CustomerId,
		username: CustomerUsername,
		email: CustomerEmail
	): CustomerRegisterCommand {
		return { id: id.value, username: username.value, email: email.value };
	}

	public static random(): CustomerRegisterCommand {
		return this.create(
			CustomerIdMother.random(),
			CustomerUsernameMother.random(),
			CustomerEmailMother.random()
		);
	}

	public static emptyId(): CustomerRegisterCommand {
		return {
			id: '',
			username: CustomerUsernameMother.random().value,
			email: CustomerEmailMother.random().value
		};
	}

	public static invalidId(): CustomerRegisterCommand {
		return {
			id: CustomerIdMother.invalid(),
			username: CustomerUsernameMother.random().value,
			email: CustomerEmailMother.random().value
		};
	}

	public static emptyUsername(): CustomerRegisterCommand {
		return {
			id: CustomerIdMother.random().value,
			username: '',
			email: CustomerEmailMother.random().value
		};
	}

	public static invalidUsernameLength(): CustomerRegisterCommand {
		return {
			id: CustomerIdMother.random().value,
			username: CustomerUsernameMother.invalidLength(),
			email: CustomerEmailMother.random().value
		};
	}

	public static invalidUsernameAlphanumeric(): CustomerRegisterCommand {
		return {
			id: CustomerIdMother.random().value,
			username: CustomerUsernameMother.invalidAlphanumeric(),
			email: CustomerEmailMother.random().value
		};
	}

	public static emptyEmail(): CustomerRegisterCommand {
		return {
			id: CustomerIdMother.random().value,
			username: CustomerUsernameMother.random().value,
			email: ''
		};
	}

	public static invalidEmail(): CustomerRegisterCommand {
		return {
			id: CustomerIdMother.random().value,
			username: CustomerUsernameMother.random().value,
			email: CustomerEmailMother.invalid()
		};
	}
}
