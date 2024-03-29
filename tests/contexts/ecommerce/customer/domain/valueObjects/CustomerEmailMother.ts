import { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';

import { EmailMother } from '../../../shared/domain/valueObjects/EmailMother';

export class CustomerEmailMother {
	public static create(value: string): CustomerEmail {
		return new CustomerEmail(value);
	}

	public static random(): CustomerEmail {
		return this.create(EmailMother.random());
	}

	public static invalid(): CustomerEmail {
		return this.create('x');
	}

	public static empty(): CustomerEmail {
		return this.create('');
	}
}
