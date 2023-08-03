import { CustomerEmail } from '../../domain/valueObjects/CustomerEmail';

import { CustomerLoginResponse } from './CustomerLoginResponse';

import type { CustomerLogin } from './CustomerLogin';
import type { CustomerLoginQuery } from './CustomerLoginQuery';
import type { QueryHandler } from '../../../shared/domain/cqrs/QueryHandler';

export class CustomerLoginQueryHandler
	implements QueryHandler<CustomerLoginQuery, CustomerLoginResponse>
{
	public constructor(private readonly customerLogin: CustomerLogin) {}

	public async handle({ email, password }: CustomerLoginQuery): Promise<CustomerLoginResponse> {
		const customerEmail = new CustomerEmail(email);

		const customer = await this.customerLogin.run(customerEmail, password);

		const response = new CustomerLoginResponse(customer.toPrimitives());

		return response;
	}
}
