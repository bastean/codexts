import type { Query } from '../../../shared/domain/cqrs/Query';

type Params = {
	email: string;
};

export class CustomerFindQuery implements Query {
	public readonly email: string;

	public constructor({ email }: Params) {
		this.email = email;
	}
}
