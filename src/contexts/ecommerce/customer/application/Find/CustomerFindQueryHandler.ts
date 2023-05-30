import { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';

import { CustomerFindResponse } from './CustomerFindResponse';

import type { CustomerFind } from './CustomerFind';
import type { CustomerFindQuery } from './CustomerFindQuery';
import type { QueryHandler } from '../../../shared/domain/cqrs/QueryHandler';

export class CustomerFindQueryHandler
	implements QueryHandler<CustomerFindQuery, CustomerFindResponse>
{
	public constructor(private readonly customerFind: CustomerFind) {}

	public async handle({ email }: CustomerFindQuery): Promise<CustomerFindResponse> {
		const customerEmail = new CustomerEmail(email);

		const customer = await this.customerFind.run(customerEmail);

		const response = new CustomerFindResponse({ ...customer.toPrimitives() });

		return response;
	}
}
