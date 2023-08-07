import { CustomerEmail } from '../valueObjects/CustomerEmail';
import { CustomerId } from '../valueObjects/CustomerId';
import { CustomerPassword } from '../valueObjects/CustomerPassword';
import { CustomerUsername } from '../valueObjects/CustomerUsername';

import type { AggregateRoot } from '../../../shared/domain/aggregate/AggregateRoot';

export class Customer implements AggregateRoot {
	public constructor(
		public readonly id: CustomerId,
		public readonly email: CustomerEmail,
		public readonly username: CustomerUsername,
		public readonly password: CustomerPassword
	) {}

	public static create(id: string, email: string, username: string, password: string): Customer {
		return new Customer(
			new CustomerId(id),
			new CustomerEmail(email),
			new CustomerUsername(username),
			new CustomerPassword(password)
		);
	}

	public static fromPrimitives(plainData: {
		id: string;
		email: string;
		username: string;
		password: string;
	}): Customer {
		return new Customer(
			new CustomerId(plainData.id),
			new CustomerEmail(plainData.email),
			new CustomerUsername(plainData.username),
			new CustomerPassword(plainData.password)
		);
	}

	public toPrimitives(): {
		id: string;
		email: string;
		username: string;
		password: string;
	} {
		return {
			id: this.id.value,
			email: this.email.value,
			username: this.username.value,
			password: this.password.value
		};
	}
}
