import { CustomerFind } from 'coding-conventions-contexts-ecommerce/customer/application/Find/CustomerFind';
import { CustomerFindQueryHandler } from 'coding-conventions-contexts-ecommerce/customer/application/Find/CustomerFindQueryHandler';
import { CustomerFindResponse } from 'coding-conventions-contexts-ecommerce/customer/application/Find/CustomerFindResponse';
import { CustomerNotExistError } from 'coding-conventions-contexts-ecommerce/customer/domain/errors/CustomerNotExistError';
import { InvalidValueError } from 'coding-conventions-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/persistence/CustomerRepositoryMock';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import { CustomerFindQueryMother } from './CustomerFindQueryMother';

let repository: CustomerRepositoryMock;
let customerFind: CustomerFind;
let handler: CustomerFindQueryHandler;

describe('CustomerFindQueryHandler', () => {
	it('should find a valid customer', async () => {
		repository = new CustomerRepositoryMock({ shouldSearchReturnNull: false });
		customerFind = new CustomerFind(repository);
		handler = new CustomerFindQueryHandler(customerFind);

		const query = CustomerFindQueryMother.random();

		const customerEmail = CustomerEmailMother.create(query.email);

		const customerFound = await handler.handle(query);

		repository.assertSearchHaveBeenCalledWith(customerEmail);

		expect(customerFound).toBeInstanceOf(CustomerFindResponse);
	});

	beforeEach(() => {
		repository = new CustomerRepositoryMock();
		customerFind = new CustomerFind(repository);
		handler = new CustomerFindQueryHandler(customerFind);
	});

	it('should throw error if customer not exist', async () => {
		await expect(async () => {
			const query = CustomerFindQueryMother.random();

			const customerEmail = CustomerEmailMother.create(query.email);

			await handler.handle(query);

			repository.assertSearchHaveBeenCalledWith(customerEmail);
		}).rejects.toThrow(CustomerNotExistError);
	});

	it('should throw error if customer email is empty', async () => {
		await expect(async () => {
			const query = CustomerFindQueryMother.emptyEmail();

			await handler.handle(query);
		}).rejects.toThrow(InvalidValueError);
	});

	it('should throw error if customer email is invalid', async () => {
		await expect(async () => {
			const query = CustomerFindQueryMother.invalidEmail();

			await handler.handle(query);
		}).rejects.toThrow(InvalidValueError);
	});
});
