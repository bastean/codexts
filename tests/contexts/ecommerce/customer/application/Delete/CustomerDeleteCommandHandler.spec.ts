import { CustomerDelete } from 'coding-conventions-contexts-ecommerce/customer/application/Delete/CustomerDelete';
import { CustomerDeleteCommandHandler } from 'coding-conventions-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommandHandler';
import { InvalidValueError } from 'coding-conventions-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerRepositoryMock } from '../../__mocks__/persistence/CustomerRepositoryMock';
import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';

import { CustomerDeleteCommandMother } from './CustomerDeleteCommandMother';

let repository: CustomerRepositoryMock;
let customerDelete: CustomerDelete;
let handler: CustomerDeleteCommandHandler;

describe('CustomerDeleteCommandHandler', () => {
	beforeEach(() => {
		repository = new CustomerRepositoryMock();
		customerDelete = new CustomerDelete(repository);
		handler = new CustomerDeleteCommandHandler(customerDelete);
	});

	it('should delete a valid customer', async () => {
		const command = CustomerDeleteCommandMother.random();

		const customerId = CustomerIdMother.create(command.id);

		await handler.handle(command);

		repository.assertDeleteHaveBeenCalledWith(customerId);
	});

	it('should throw error if customer id is empty', async () => {
		await expect(async () => {
			const command = CustomerDeleteCommandMother.EmptyId();

			await handler.handle(command);
		}).rejects.toThrow(InvalidValueError);
	});

	it('should throw error if customer id is invalid', async () => {
		await expect(async () => {
			const command = CustomerDeleteCommandMother.invalidId();

			await handler.handle(command);
		}).rejects.toThrow(InvalidValueError);
	});
});
