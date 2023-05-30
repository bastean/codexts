import { Customer } from '../../domain/aggregate/Customer';

import type { CustomerRegister } from './CustomerRegister';
import type { CustomerRegisterCommand } from './CustomerRegisterCommand';
import type { CommandHandler } from '../../../shared/domain/cqrs/CommandHandler';

export class CustomerRegisterCommandHandler implements CommandHandler<CustomerRegisterCommand> {
	public constructor(private readonly customerRegister: CustomerRegister) {}

	public async handle({ id, username, email }: CustomerRegisterCommand): Promise<void> {
		const customer = Customer.create(id, username, email);
		await this.customerRegister.run(customer);
	}
}
