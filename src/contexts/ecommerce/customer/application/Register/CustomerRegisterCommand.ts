import type { Command } from '../../../shared/domain/cqrs/Command';

type Params = {
	id: string;
	username: string;
	email: string;
};

export class CustomerRegisterCommand implements Command {
	public readonly id: string;

	public readonly username: string;

	public readonly email: string;

	public constructor({ id, username, email }: Params) {
		this.id = id;
		this.username = username;
		this.email = email;
	}
}
