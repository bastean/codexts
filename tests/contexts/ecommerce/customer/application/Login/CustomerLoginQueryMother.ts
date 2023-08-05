import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';

import type { CustomerLoginQuery } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginQuery';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';

export class CustomerLoginQueryMother {
	public static create(email: CustomerEmail, password: string): CustomerLoginQuery {
		return { email: email.value, password };
	}

	public static random(): CustomerLoginQuery {
		return this.create(CustomerEmailMother.random(), CustomerPasswordMother.plainRandom());
	}

	public static invalid(): CustomerLoginQuery {
		return this.create(
			CustomerEmailMother.invalid(),
			CustomerPasswordMother.plainWithInvalidLength()
		);
	}
}
