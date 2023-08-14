import type { Command } from '../../../shared/domain/cqrs/Command';

type Params = {
	id: string;
	password: string;
};

export class CustomerDeleteCommand implements Command {
	public readonly id: string;

	public readonly password: string;

	public constructor({ id, password }: Params) {
		this.id = id;
		this.password = password;
	}
}
