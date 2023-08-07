import { StringValueObject } from '../../../shared/domain/valueObjects/StringValueObject';

import { CustomerPasswordLengthError } from './CustomerPasswordLengthError';

export class CustomerPassword extends StringValueObject {
	public constructor(value: string) {
		super(value);

		this.ensureLengthIsAllowed(this.value);
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
