import type { Command } from '../../../shared/domain/cqrs/Command';

type Params = {
	id: string;
	email: string;
	username: string;
	password: string;
};

export class CustomerRegisterCommand implements Command {
	public readonly id: string;

	public readonly email: string;

	public readonly username: string;

	public readonly password: string;

	public constructor({ id, email, username, password }: Params) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
	}
}
