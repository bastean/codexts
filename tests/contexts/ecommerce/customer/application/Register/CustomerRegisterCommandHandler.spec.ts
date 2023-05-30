import { CustomerRegister } from 'coding-conventions-contexts-ecommerce/customer/application/Register/CustomerRegister';
import { CustomerRegisterCommandHandler } from 'coding-conventions-contexts-ecommerce/customer/application/Register/CustomerRegisterCommandHandler';
import { CustomerAlreadyExistError } from 'coding-conventions-contexts-ecommerce/customer/domain/errors/CustomerAlreadyExistError';
import { CustomerUsernameAlphanumericError } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerUsernameAlphanumericError';
import { CustomerUsernameLengthError } from 'coding-conventions-contexts-ecommerce/customer/domain/valueObjects/CustomerUsernameLengthError';
import { InvalidValueError } from 'coding-conventions-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/persistence/CustomerRepositoryMock';
import { CustomerMother } from '../../domain/aggregate/CustomerMother';

import { CustomerRegisterCommandMother } from './CustomerRegisterCommandMother';

let repository: CustomerRepositoryMock;
let register: CustomerRegister;
let handler: CustomerRegisterCommandHandler;

describe('CustomerRegisterCommandHandler', () => {
	beforeEach(() => {
		repository = new CustomerRepositoryMock();
		register = new CustomerRegister(repository);
		handler = new CustomerRegisterCommandHandler(register);
	});

	it('should create a valid customer', async () => {
		const command = CustomerRegisterCommandMother.random();

		const customer = CustomerMother.from(command);

		await handler.handle(command);

		repository.assertSearchHaveBeenCalledWith(customer.email);

		repository.assertSaveHaveBeenCalledWith(customer);
	});

	it('should throw error if customer is already registered', async () => {
		await expect(async () => {
			repository = new CustomerRepositoryMock({ shouldSearchReturnNull: false });
			register = new CustomerRegister(repository);
			handler = new CustomerRegisterCommandHandler(register);

			const command = CustomerRegisterCommandMother.random();

			await handler.handle(command);

			await handler.handle(command);
		}).rejects.toThrow(CustomerAlreadyExistError);
	});

	it('should throw error if customer id is empty', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.emptyId();

			await handler.handle(command);
		}).rejects.toThrow(InvalidValueError);
	});

	it('should throw error if customer id is invalid', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.invalidId();

			await handler.handle(command);
		}).rejects.toThrow(InvalidValueError);
	});

	it('should throw error if customer username is empty', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.emptyUsername();

			await handler.handle(command);
		}).rejects.toThrow(CustomerUsernameLengthError);
	});

	it('should throw error if customer username length is invalid', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.invalidUsernameLength();

			await handler.handle(command);
		}).rejects.toThrow(CustomerUsernameLengthError);
	});

	it('should throw error if customer username alphanumeric is invalid', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.invalidUsernameAlphanumeric();

			await handler.handle(command);
		}).rejects.toThrow(CustomerUsernameAlphanumericError);
	});

	it('should throw error if customer email is empty', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.emptyEmail();

			await handler.handle(command);
		}).rejects.toThrow(InvalidValueError);
	});

	it('should throw error if customer email is invalid', async () => {
		await expect(async () => {
			const command = CustomerRegisterCommandMother.invalidEmail();

			await handler.handle(command);
		}).rejects.toThrow(InvalidValueError);
	});
});
