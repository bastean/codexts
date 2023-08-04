import validator from 'validator';

import { InvalidValueError } from './InvalidValueError';
import { ValueObject } from './ValueObject';

export abstract class Uuid extends ValueObject<string> {
	public constructor(value: string) {
		super(value.trim());
		this.ensureIsValidUuid(this.value);
	}

	private ensureIsValidUuid(uuid: string): void {
		if (!validator.isUUID(uuid)) {
			throw new InvalidValueError('UUID value is invalid');
		}
	}
}
