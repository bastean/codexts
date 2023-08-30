import { CustomerUpdate } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdate';
import { CustomerUpdateCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdateCommandHandler';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerHashingMock } from '../../__mocks__/infrastructure/cryptographic/CustomerHashingMock';
import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';

import { CustomerUpdateCommandMother } from './CustomerUpdateCommandMother';

let hashing: CustomerHashingMock;
let repository: CustomerRepositoryMock;
let update: CustomerUpdate;
let handler: CustomerUpdateCommandHandler;

describe('Customer Update Command Handler', () => {
	beforeEach(() => {
		hashing = new CustomerHashingMock();
		repository = new CustomerRepositoryMock({ search: { canReturnCustomerNotFound: false } });
		update = new CustomerUpdate(repository, hashing);
		handler = new CustomerUpdateCommandHandler(update);
	});

	it('should update a valid customer', async () => {
		const command = CustomerUpdateCommandMother.emptyExceptId();

		await handler.handle(command);

		repository.assertUpdateHaveBeenCalledWith(command);
	});

	it('should throw error if customer is invalid', async () => {
		expect(() => CustomerUpdateCommandMother.invalid()).toThrow(InvalidValueError);
	});
});
