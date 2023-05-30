import { CustomerUsername } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';

import { WordMother } from '../../../shared/domain/valueObjects/WordMother';

export class CustomerUsernameMother {
	public static create(value: string): CustomerUsername {
		return new CustomerUsername(value);
	}

	public static random(): CustomerUsername {
		return this.create(WordMother.random({ maxLength: 20 }));
	}

	public static invalidLength(): string {
		return Math.floor(Math.random() * 10) > 5 ? 'x' : 'x'.repeat(21);
	}

	public static invalidAlphanumeric(): string {
		return '<></>';
	}
}
