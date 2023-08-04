import validator from 'validator';

import { InvalidValueError } from './InvalidValueError';
import { ValueObject } from './ValueObject';

export abstract class Email extends ValueObject<string> {
	public constructor(value: string) {
		super(value.trim());
		this.ensureIsValidEmail(this.value);
	}

	private ensureIsValidEmail(email: string): void {
		if (!validator.isEmail(email)) {
			throw new InvalidValueError('Email value is invalid');
		}
	}
}
