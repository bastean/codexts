import { CustomerEmail } from '../valueObjects/CustomerEmail';
import { CustomerId } from '../valueObjects/CustomerId';
import { CustomerUsername } from '../valueObjects/CustomerUsername';

import type { AggregateRoot } from '../../../shared/domain/aggregate/AggregateRoot';

export class Customer implements AggregateRoot {
	public constructor(
		public readonly id: CustomerId,
		public readonly username: CustomerUsername,
		public readonly email: CustomerEmail
	) {}

	public static create(id: string, username: string, email: string): Customer {
		return new Customer(
			new CustomerId(id),
			new CustomerUsername(username),
			new CustomerEmail(email)
		);
	}

	public static fromPrimitives(plainData: {
		id: string;
		username: string;
		email: string;
	}): Customer {
		return new Customer(
			new CustomerId(plainData.id),
			new CustomerUsername(plainData.username),
			new CustomerEmail(plainData.email)
		);
	}

	public toPrimitives(): {
		id: string;
		username: string;
		email: string;
	} {
		return {
			id: this.id.value,
			username: this.username.value,
			email: this.email.value
		};
	}
}
