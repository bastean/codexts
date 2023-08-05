import { CustomerUpdate } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdate';
import { CustomerUpdateCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdateCommandHandler';
import { CustomerAlreadyExistError } from 'codexts-contexts-ecommerce/customer/domain/errors/CustomerAlreadyExistError';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';

import { CustomerUpdateCommandMother } from './CustomerUpdateCommandMother';

let repository: CustomerRepositoryMock;
let update: CustomerUpdate;
let handler: CustomerUpdateCommandHandler;

describe('Customer Update Command Handler', () => {
	beforeEach(() => {
		repository = new CustomerRepositoryMock({ search: { canReturnCustomerNotFound: false } });
		update = new CustomerUpdate(repository);
		handler = new CustomerUpdateCommandHandler(update);
	});

	it('should update a valid customer', async () => {
		const command = CustomerUpdateCommandMother.emptyExceptId();

		await handler.handle(command);

		repository.assertUpdateHaveBeenCalled();
	});

	it('should throw error if customer is invalid', async () => {
		expect(() => CustomerUpdateCommandMother.invalid()).toThrow(InvalidValueError);
	});

	it('should throw error if customer is already registered', async () => {
		await expect(async () => {
			repository = new CustomerRepositoryMock({ search: { canReturnCustomerNotFound: false } });
			update = new CustomerUpdate(repository);
			handler = new CustomerUpdateCommandHandler(update);

			const command = CustomerUpdateCommandMother.random();

			await handler.handle(command);
		}).rejects.toThrow(CustomerAlreadyExistError);
	});
});
