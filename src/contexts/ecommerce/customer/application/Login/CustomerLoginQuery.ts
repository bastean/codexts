import type { Query } from '../../../shared/domain/cqrs/Query';

type Params = {
	email: string;
	password: string;
};

export class CustomerLoginQuery implements Query {
	public readonly email: string;

	public readonly password: string;

	public constructor({ email, password }: Params) {
		this.email = email;
		this.password = password;
	}
}
