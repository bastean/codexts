import { CustomerPassword } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPassword';

import { WordMother } from '../../../shared/domain/valueObjects/WordMother';

export class CustomerPasswordMother {
	public static create(value: string): CustomerPassword {
		return new CustomerPassword(value);
	}

	public static random(): CustomerPassword {
		return this.create(WordMother.random({ minLength: 8, maxLength: 64 }));
	}

	public static withInvalidLength(): CustomerPassword {
		return this.create(Math.floor(Math.random() * 10) > 5 ? 'x' : 'x'.repeat(65));
	}

	public static empty(): CustomerPassword {
		return this.create('');
	}
}
