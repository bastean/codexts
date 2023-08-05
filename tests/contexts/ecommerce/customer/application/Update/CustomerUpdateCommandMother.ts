import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';
import { CustomerUsernameMother } from '../../domain/valueObjects/CustomerUsernameMother';

import type { CustomerUpdateCommand } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdateCommand';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerUsername } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';

export class CustomerUpdateCommandMother {
	public static create(
		id: CustomerId,
		email?: CustomerEmail | undefined,
		username?: CustomerUsername | undefined,
		password?: string | undefined
	): CustomerUpdateCommand {
		return { id: id.value, email: email?.value, username: username?.value, password };
	}

	public static random(): CustomerUpdateCommand {
		return this.create(
			CustomerIdMother.random(),
			CustomerEmailMother.random(),
			CustomerUsernameMother.random(),
			CustomerPasswordMother.plainRandom()
		);
	}

	public static invalid(): CustomerUpdateCommand {
		return this.create(
			CustomerIdMother.invalid(),
			CustomerEmailMother.invalid(),
			CustomerUsernameMother.withInvalidLength(),
			CustomerPasswordMother.plainWithInvalidLength()
		);
	}

	public static emptyExceptId(): CustomerUpdateCommand {
		return this.create(CustomerIdMother.random());
	}
}
