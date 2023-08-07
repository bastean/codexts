import { jest } from '@jest/globals';

import { CustomerMother } from '../../../domain/aggregate/CustomerMother';

import type { Customer } from 'codexts-contexts-ecommerce/customer/domain/aggregate/Customer';
import type { CustomerRepository } from 'codexts-contexts-ecommerce/customer/domain/repository/CustomerRepository';
import type { CustomerEmail } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerEmail';
import type { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';
import type { CustomerUsername } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsername';
import type { Nullable } from 'codexts-contexts-ecommerce/shared/domain/types/Nullable';

export class CustomerRepositoryMock implements CustomerRepository {
	private readonly saveMock: jest.Mock;

	private readonly updateMock: jest.Mock;

	private readonly deleteMock: jest.Mock;

	private readonly searchMock: jest.Mock;

	public constructor(
		private readonly switches: {
			search: {
				canReturnCustomerNotFound?: boolean;
				customerForReturn?: Nullable<Customer>;
			};
		} = {
			search: {
				canReturnCustomerNotFound: true,
				customerForReturn: null
			}
		}
	) {
		this.saveMock = jest.fn().mockName('CustomerRepositorySaveMock');
		this.updateMock = jest.fn().mockName('CustomerRepositoryUpdateMock');
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

	public update(customer: {
		id: string;
		email?: string;
		username?: string;
		password?: string;
	}): Promise<void> {
		return new Promise((resolve) => {
			this.updateMock(customer);
			resolve();
		});
	}

	public assertUpdateHaveBeenCalledWith(expected: {
		id: string;
		email?: string;
		username?: string;
		password?: string;
	}): void {
		expect(this.updateMock).toHaveBeenCalledWith(expected);
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

	public search({
		id,
		email,
		username
	}: {
		id?: CustomerId;
		email?: CustomerEmail;
		username?: CustomerUsername;
	}): Promise<Nullable<Customer>> {
		return new Promise((resolve) => {
			this.searchMock(email);

			if (this.switches.search.canReturnCustomerNotFound === true) {
				resolve(this.switches.search.customerForReturn);
			}

			if (id !== undefined) resolve(CustomerMother.randomExceptId(id.value));

			if (email !== undefined) resolve(CustomerMother.randomExceptEmail(email.value));

			if (username !== undefined) resolve(CustomerMother.randomExceptUsername(username.value));
		});
	}

	public assertSearchHaveBeenCalledWith({
		id,
		email,
		username
	}: {
		id?: CustomerId;
		email?: CustomerEmail;
		username?: CustomerUsername;
	}): void {
		if (id !== undefined) expect(this.searchMock).toHaveBeenCalledWith(id);

		if (email !== undefined) expect(this.searchMock).toHaveBeenCalledWith(email);

		if (username !== undefined) expect(this.searchMock).toHaveBeenCalledWith(username);
	}
}
