import type { Command } from '../../../shared/domain/cqrs/Command';

type Params = {
	id: string;
	email?: string;
	username?: string;
	currentPassword?: string;
	updatedPassword?: string;
};

export class CustomerUpdateCommand implements Command {
	public readonly id: string;

	public readonly email: string | undefined;

	public readonly username: string | undefined;

	public readonly currentPassword: string | undefined;

	public readonly updatedPassword: string | undefined;

	public constructor({ id, email, username, currentPassword, updatedPassword }: Params) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.currentPassword = currentPassword;
		this.updatedPassword = updatedPassword;
	}
}
