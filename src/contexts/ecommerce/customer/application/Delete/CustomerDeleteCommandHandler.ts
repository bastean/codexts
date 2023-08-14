import { CustomerId } from '../../domain/valueObjects/CustomerId';
import { CustomerPassword } from '../../domain/valueObjects/CustomerPassword';

import type { CustomerDelete } from './CustomerDelete';
import type { CustomerDeleteCommand } from './CustomerDeleteCommand';
import type { CommandHandler } from '../../../shared/domain/cqrs/CommandHandler';

export class CustomerDeleteCommandHandler implements CommandHandler<CustomerDeleteCommand> {
	public constructor(private readonly customerDelete: CustomerDelete) {}

	public async handle({ id, password }: CustomerDeleteCommand): Promise<void> {
		const customerId = new CustomerId(id);
		const customerPassword = new CustomerPassword(password);
		await this.customerDelete.run(customerId, customerPassword);
	}
}
