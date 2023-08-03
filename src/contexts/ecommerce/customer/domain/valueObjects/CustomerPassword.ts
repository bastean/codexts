import { StringValueObject } from '../../../shared/domain/valueObjects/StringValueObject';
import { Password } from '../services/Password';

import { CustomerPasswordLengthError } from './CustomerPasswordLengthError';

export class CustomerPassword extends StringValueObject {
	private static isNotHashed: boolean = true;

	private constructor(value: string) {
		super(value);

		if (CustomerPassword.isNotHashed) this.ensureLengthIsAllowed(value);
	}

	public static fromPlainToHashed(plain: string): CustomerPassword {
		return new CustomerPassword(Password.hash(plain));
	}

	public static fromHashed(hash: string): CustomerPassword {
		CustomerPassword.isNotHashed = false;
		return new CustomerPassword(hash);
	}

	private ensureLengthIsAllowed(password: string): void {
		const minCharactersLength = 8;
		const maxCharactersLength = 64;

		if (password.length < minCharactersLength || password.length > maxCharactersLength) {
			throw new CustomerPasswordLengthError(
				`Password must be between ${minCharactersLength} and ${maxCharactersLength} characters`
			);
		}
	}
}
