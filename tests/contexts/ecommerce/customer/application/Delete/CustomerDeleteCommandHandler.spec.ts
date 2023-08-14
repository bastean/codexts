import { CustomerDelete } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDelete';
import { CustomerDeleteCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommandHandler';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerHashingMock } from '../../__mocks__/infrastructure/cryptographic/CustomerHashingMock';
import { CustomerRepositoryMock } from '../../__mocks__/infrastructure/persistence/CustomerRepositoryMock';
import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';

import { CustomerDeleteCommandMother } from './CustomerDeleteCommandMother';

let hashing: CustomerHashingMock;
let repository: CustomerRepositoryMock;
let customerDelete: CustomerDelete;
let handler: CustomerDeleteCommandHandler;

describe('Customer Delete Command Handler', () => {
	beforeEach(() => {
		hashing = new CustomerHashingMock();
		repository = new CustomerRepositoryMock({
			search: { canReturnCustomerNotFound: false }
		});
		customerDelete = new CustomerDelete(repository, hashing);
		handler = new CustomerDeleteCommandHandler(customerDelete);
	});

	it('should delete a valid customer', async () => {
		const command = CustomerDeleteCommandMother.random();

		const customerId = CustomerIdMother.create(command.id);

		await handler.handle(command);

		repository.assertDeleteHaveBeenCalledWith(customerId);
	});

	it('should throw error if customer is invalid', async () => {
		expect(() => CustomerDeleteCommandMother.invalid()).toThrow(InvalidValueError);
	});
});
