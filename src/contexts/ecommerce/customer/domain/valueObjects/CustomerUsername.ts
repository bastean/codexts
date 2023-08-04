import validator from 'validator';

import { StringValueObject } from '../../../shared/domain/valueObjects/StringValueObject';

import { CustomerUsernameAlphanumericError } from './CustomerUsernameAlphanumericError';
import { CustomerUsernameLengthError } from './CustomerUsernameLengthError';

export class CustomerUsername extends StringValueObject {
	public constructor(value: string) {
		super(value.trim());

		this.ensureLengthIsAllowed(this.value);
		this.ensureAlphanumericValuesAllowed(this.value);
	}

	private ensureLengthIsAllowed(username: string): void {
		const minCharactersLength = 2;
		const maxCharactersLength = 20;

		if (username.length < minCharactersLength || username.length > maxCharactersLength) {
			throw new CustomerUsernameLengthError(
				`Username must be between ${minCharactersLength} and ${maxCharactersLength} characters`
			);
		}
	}

	private ensureAlphanumericValuesAllowed(username: string): void {
		if (!validator.isAlphanumeric(username)) {
			throw new CustomerUsernameAlphanumericError(
				"Username must contain only 'a-z, A-Z, 0-9' characters"
			);
		}
	}
}
