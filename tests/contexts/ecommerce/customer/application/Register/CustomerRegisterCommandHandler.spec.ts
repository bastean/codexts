import { CustomerRegister } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegister';
import { CustomerRegisterCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommandHandler';
import { CustomerAlreadyExistError } from 'codexts-contexts-ecommerce/customer/domain/errors/CustomerAlreadyExistError';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';

import { CustomerRegisterCommandMother } from './CustomerRegisterCommandMother';

let repository: CustomerRepositoryMock;
let register: CustomerRegister;
let handler: CustomerRegisterCommandHandler;

describe('Customer Register Command Handler', () => {
	beforeEach(() => {
		repository = new CustomerRepositoryMock();
		register = new CustomerRegister(repository);
		handler = new CustomerRegisterCommandHandler(register);
	});

	it('should register a valid customer', async () => {
		const command = CustomerRegisterCommandMother.random();

		await handler.handle(command);

		repository.assertSaveHaveBeenCalled();
	});

	it('should throw error if customer is invalid', async () => {
		expect(() => CustomerRegisterCommandMother.invalid()).toThrow(InvalidValueError);
	});

	it('should throw error if customer is already registered', async () => {
		await expect(async () => {
			repository = new CustomerRepositoryMock({ search: { canReturnCustomerNotFound: false } });
			register = new CustomerRegister(repository);
			handler = new CustomerRegisterCommandHandler(register);

			const command = CustomerRegisterCommandMother.random();

			await handler.handle(command);
		}).rejects.toThrow(CustomerAlreadyExistError);
	});
});
