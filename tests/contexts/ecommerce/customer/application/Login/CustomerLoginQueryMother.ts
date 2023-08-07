import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';

import type { CustomerLoginQuery } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginQuery';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerPassword } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPassword';

export class CustomerLoginQueryMother {
	public static create(email: CustomerEmail, password: CustomerPassword): CustomerLoginQuery {
		return { email: email.value, password: password.value };
	}

	public static random(): CustomerLoginQuery {
		return this.create(CustomerEmailMother.random(), CustomerPasswordMother.random());
	}

	public static invalid(): CustomerLoginQuery {
		return this.create(CustomerEmailMother.invalid(), CustomerPasswordMother.withInvalidLength());
	}
}
