import type { Customer } from '../../domain/aggregate/Customer';
import type { CustomerRepository } from '../../domain/repository/CustomerRepository';

export class CustomerRegister {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(customer: Customer): Promise<void> {
		await this.repository.save(customer);
	}
}
