import { CustomerLogin } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLogin';
import { CustomerLoginQueryHandler } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginQueryHandler';
import { CustomerLoginResponse } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginResponse';
import { CustomerNotExistError } from 'codexts-contexts-ecommerce/customer/domain/errors/CustomerNotExistError';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerHashingMock } from '../../__mocks__/infrastructure/cryptographic/CustomerHashingMock';
import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';
import { CustomerMother } from '../../domain/aggregate/CustomerMother';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import { CustomerLoginQueryMother } from './CustomerLoginQueryMother';

let hashing: CustomerHashingMock;
let repository: CustomerRepositoryMock;
let login: CustomerLogin;
let handler: CustomerLoginQueryHandler;

describe('Customer Login Query Handler', () => {
	it('should login a valid customer', async () => {
		const customerForReturn = CustomerMother.random();

		hashing = new CustomerHashingMock();
		repository = new CustomerRepositoryMock({
			search: { canReturnCustomerNotFound: true, customerForReturn }
		});
		login = new CustomerLogin(repository, hashing);
		handler = new CustomerLoginQueryHandler(login);

		const query = CustomerLoginQueryMother.create(
			customerForReturn.email,
			customerForReturn.password
		);

		const customerFound = await handler.handle(query);

		repository.assertSearchHaveBeenCalledWith({ email: customerForReturn.email });

		hashing.assertIsNotEqualHaveBeenCalledWith(
			customerForReturn.password.value,
			customerForReturn.password.value
		);

		expect(customerFound).toBeInstanceOf(CustomerLoginResponse);
	});

	beforeEach(() => {
		hashing = new CustomerHashingMock();
		repository = new CustomerRepositoryMock();
		login = new CustomerLogin(repository, hashing);
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
