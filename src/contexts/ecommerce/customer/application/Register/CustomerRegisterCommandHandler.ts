import { Customer } from '../../domain/aggregate/Customer';

import type { CustomerRegister } from './CustomerRegister';
import type { CustomerRegisterCommand } from './CustomerRegisterCommand';
import type { CommandHandler } from '../../../shared/domain/cqrs/CommandHandler';

export class CustomerRegisterCommandHandler implements CommandHandler<CustomerRegisterCommand> {
	public constructor(private readonly customerRegister: CustomerRegister) {}

	public async handle({ id, email, username, password }: CustomerRegisterCommand): Promise<void> {
		const customer = Customer.create(id, email, username, password);
		await this.customerRegister.run(customer);
	}
}
