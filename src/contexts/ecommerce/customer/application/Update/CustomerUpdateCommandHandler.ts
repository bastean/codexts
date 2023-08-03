import type { CustomerUpdate } from './CustomerUpdate';
import type { CustomerUpdateCommand } from './CustomerUpdateCommand';
import type { CommandHandler } from '../../../shared/domain/cqrs/CommandHandler';

export class CustomerUpdateCommandHandler implements CommandHandler<CustomerUpdateCommand> {
	public constructor(private readonly customerUpdate: CustomerUpdate) {}

	public async handle({ id, email, username, password }: CustomerUpdateCommand): Promise<void> {
		await this.customerUpdate.run(id, email, username, password);
	}
}
