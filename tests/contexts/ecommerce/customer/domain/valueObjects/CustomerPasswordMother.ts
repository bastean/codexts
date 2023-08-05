import { CustomerPassword } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPassword';

import { WordMother } from '../../../shared/domain/valueObjects/WordMother';

export class CustomerPasswordMother {
	private static readonly random = WordMother.random({ minLength: 8, maxLength: 64 });

	private static readonly withInvalidLength =
		Math.floor(Math.random() * 10) > 5 ? 'x' : 'x'.repeat(65);

	private static readonly empty = '';

	public static create(value: string): CustomerPassword {
		return CustomerPassword.fromPlainToHashed(value);
	}

	public static hashedRandom(): CustomerPassword {
		return this.create(this.random);
	}

	public static hashedWithInvalidLength(): CustomerPassword {
		return this.create(this.withInvalidLength);
	}

	public static hashedEmpty(): CustomerPassword {
		return this.create(this.empty);
	}

	public static plainRandom(): string {
		return this.random;
	}

	public static plainWithInvalidLength(): string {
		return this.withInvalidLength;
	}

	public static plainEmpty(): string {
		return this.empty;
	}
}
