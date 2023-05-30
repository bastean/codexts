import { CustomerId } from '../../domain/valueObjects/CustomerId';

import type { CustomerDelete } from './CustomerDelete';
import type { CustomerDeleteCommand } from './CustomerDeleteCommand';
import type { CommandHandler } from '../../../shared/domain/cqrs/CommandHandler';

export class CustomerDeleteCommandHandler implements CommandHandler<CustomerDeleteCommand> {
	public constructor(private readonly customerDelete: CustomerDelete) {}

	public async handle({ id }: CustomerDeleteCommand): Promise<void> {
		const customerId = new CustomerId(id);
		await this.customerDelete.run(customerId);
	}
}
