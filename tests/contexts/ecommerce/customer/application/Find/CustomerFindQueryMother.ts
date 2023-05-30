import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import type { CustomerFindQuery } from 'coding-conventions-contexts-ecommerce/customer/application/Find/CustomerFindQuery';
import type { CustomerEmail } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';

export class CustomerFindQueryMother {
	public static create(email: CustomerEmail): CustomerFindQuery {
		return { email: email.value };
	}

	public static random(): CustomerFindQuery {
		return this.create(CustomerEmailMother.random());
	}

	public static emptyEmail(): CustomerFindQuery {
		return {
			email: ''
		};
	}

	public static invalidEmail(): CustomerFindQuery {
		return {
			email: CustomerEmailMother.invalid()
		};
	}
}
