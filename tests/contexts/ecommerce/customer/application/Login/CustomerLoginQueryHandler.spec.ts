import { CustomerLogin } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLogin';
import { CustomerLoginQueryHandler } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginQueryHandler';
import { CustomerLoginResponse } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginResponse';
import { CustomerNotExistError } from 'codexts-contexts-ecommerce/customer/domain/errors/CustomerNotExistError';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';
import { CustomerMother } from '../../domain/aggregate/CustomerMother';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';

import { CustomerLoginQueryMother } from './CustomerLoginQueryMother';

let repository: CustomerRepositoryMock;
let login: CustomerLogin;
let handler: CustomerLoginQueryHandler;

describe('Customer Login Query Handler', () => {
	it('should login a valid customer', async () => {
		const plainPassword = CustomerPasswordMother.plainRandom();
		const customerForReturn = CustomerMother.randomExceptPassword(plainPassword);

		repository = new CustomerRepositoryMock({
			search: { canReturnCustomerNotFound: true, customerForReturn }
		});
		login = new CustomerLogin(repository);
		handler = new CustomerLoginQueryHandler(login);

		const query = CustomerLoginQueryMother.create(customerForReturn.email, plainPassword);

		const customerFound = await handler.handle(query);

		repository.assertSearchHaveBeenCalledWith({ email: customerForReturn.email });

		expect(customerFound).toBeInstanceOf(CustomerLoginResponse);
	});

	beforeEach(() => {
		repository = new CustomerRepositoryMock();
		login = new CustomerLogin(repository);
		handler = new CustomerLoginQueryHandler(login);
	});

	it('should throw error if customer is invalid', async () => {
		expect(() => CustomerLoginQueryMother.invalid()).toThrow(InvalidValueError);
	});

	it('should throw error if customer not exist', async () => {
		await expect(async () => {
			const query = CustomerLoginQueryMother.random();

			const customerEmail = CustomerEmailMother.create(query.email);

			await handler.handle(query);

			repository.assertSearchHaveBeenCalledWith({ email: customerEmail });
		}).rejects.toThrow(CustomerNotExistError);
	});
});
