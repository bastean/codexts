import type { Command } from '../../../shared/domain/cqrs/Command';

type Params = {
	id: string;
};

export class CustomerDeleteCommand implements Command {
	public readonly id: string;

	public constructor({ id }: Params) {
		this.id = id;
	}
}
