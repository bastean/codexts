import type { Command } from '../../../shared/domain/cqrs/Command';

type Params = {
	id: string;
	email?: string;
	username?: string;
	password?: string;
};

export class CustomerUpdateCommand implements Command {
	public readonly id: string;

	public readonly email: string | undefined;

	public readonly username: string | undefined;

	public readonly password: string | undefined;

	public constructor({ id, email, username, password }: Params) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
	}
}
