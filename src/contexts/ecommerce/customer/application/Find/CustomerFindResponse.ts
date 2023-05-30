import type { Response } from '../../../shared/domain/cqrs/Response';

type Params = {
	id: string;
	username: string;
	email: string;
};
export class CustomerFindResponse implements Response {
	public readonly id: string;

	public readonly username: string;

	public readonly email: string;

	public constructor({ id, username, email }: Params) {
		this.id = id;
		this.username = username;
		this.email = email;
	}
}
