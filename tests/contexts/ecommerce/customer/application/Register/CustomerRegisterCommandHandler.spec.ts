import { CustomerRegister } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegister';
import { CustomerRegisterCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommandHandler';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';
import { CustomerMother } from '../../domain/aggregate/CustomerMother';

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

		const customer = CustomerMother.fromCommand(command);

		await handler.handle(command);

		repository.assertSaveHaveBeenCalledWith(customer);
	});

	it('should throw error if customer is invalid', async () => {
		expect(() => CustomerRegisterCommandMother.invalid()).toThrow(InvalidValueError);
	});
});
