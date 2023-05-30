import { InvalidValueError } from './InvalidValueError';

export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
	public readonly value: T;

	public constructor(value: T) {
		this.value = value;
		this.ensureValueIsDefined(value);
	}

	public isEqualTo(other: ValueObject<T>): boolean {
		return other.constructor.name === this.constructor.name && other.value === this.value;
	}

	public toString(): string {
		return this.value.toString();
	}

	private ensureValueIsDefined(value: T): void {
		if (value === null || value === undefined) {
			throw new InvalidValueError('Value must be defined');
		}
	}
}
