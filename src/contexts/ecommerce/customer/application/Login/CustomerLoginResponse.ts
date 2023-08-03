import type { Response } from '../../../shared/domain/cqrs/Response';

type Params = {
	id: string;
	email: string;
	username: string;
};
export class CustomerLoginResponse implements Response {
	public readonly id: string;

	public readonly email: string;

	public readonly username: string;

	public constructor({ id, email, username }: Params) {
		this.id = id;
		this.email = email;
		this.username = username;
	}
}
