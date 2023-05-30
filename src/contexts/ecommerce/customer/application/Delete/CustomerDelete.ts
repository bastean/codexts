import type { CustomerRepository } from '../../domain/repository/CustomerRepository';
import type { CustomerId } from '../../domain/valueObjects/CustomerId';

export class CustomerDelete {
	public constructor(private readonly repository: CustomerRepository) {}

	public async run(id: CustomerId): Promise<void> {
		await this.repository.delete(id);
	}
}
