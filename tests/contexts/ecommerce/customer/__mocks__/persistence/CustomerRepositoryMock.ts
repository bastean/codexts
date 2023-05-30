import { jest } from '@jest/globals';

import { CustomerMother } from '../../domain/aggregate/CustomerMother';

import type { Customer } from 'coding-conventions-contexts-ecommerce/customer/domain/aggregate/Customer';
import type { CustomerRepository } from 'coding-conventions-contexts-ecommerce/customer/domain/repository/CustomerRepository';
import type { CustomerEmail } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { Nullable } from 'coding-conventions-contexts-ecommerce/shared/domain/types/Nullable';

export class CustomerRepositoryMock implements CustomerRepository {
	private readonly saveMock: jest.Mock;

	private readonly deleteMock: jest.Mock;

	private readonly searchMock: jest.Mock;

	private readonly customer: Nullable<Customer> = null;

	public constructor(public readonly switches = { shouldSearchReturnNull: true }) {
		this.saveMock = jest.fn().mockName('CustomerRepositorySaveMock');
		this.deleteMock = jest.fn().mockName('CustomerRepositoryDeleteMock');
		this.searchMock = jest.fn().mockName('CustomerRepositorySearchMock');
	}

	public save(customer: Customer): Promise<void> {
		return new Promise((resolve) => {
			this.saveMock(customer);
			resolve();
		});
	}

	public assertSaveHaveBeenCalledWith(expected: Customer): void {
		expect(this.saveMock).toHaveBeenCalledWith(expected);
	}

	public delete(id: CustomerId): Promise<void> {
		return new Promise((resolve) => {
			this.deleteMock(id);
			resolve();
		});
	}

	public assertDeleteHaveBeenCalledWith(expected: CustomerId): void {
		expect(this.deleteMock).toHaveBeenCalledWith(expected);
	}

	public search(email: CustomerEmail): Promise<Nullable<Customer>> {
		return new Promise((resolve) => {
			this.searchMock(email);

			if (this.switches.shouldSearchReturnNull) {
				resolve(this.customer);
			} else {
				resolve(CustomerMother.withIdAndUsername(email.value));
			}
		});
	}

	public assertSearchHaveBeenCalledWith(expected: CustomerEmail): void {
		expect(this.searchMock).toHaveBeenCalledWith(expected);
	}
}
