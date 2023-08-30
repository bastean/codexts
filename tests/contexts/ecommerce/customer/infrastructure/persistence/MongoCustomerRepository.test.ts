import { CustomerAlreadyExistError } from 'codexts-contexts-ecommerce/customer/domain/errors/CustomerAlreadyExistError';
import { MongoCustomerRepository } from 'codexts-contexts-ecommerce/customer/infrastructure/persistence/mongo/MongoCustomerRepository';
import { ConvictConfig } from 'codexts-contexts-ecommerce/shared/infrastructure/config/convict/ConvictConfig';
import { connect, disconnect } from 'mongoose';

import { CustomerHashingMock } from '../../__mocks__/infrastructure/cryptographic/CustomerHashingMock';
import { CustomerMother } from '../../domain/aggregate/CustomerMother';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import type { CustomerRepository } from 'codexts-contexts-ecommerce/customer/domain/repository/CustomerRepository';

const hashing: CustomerHashingMock = new CustomerHashingMock();
const repository: CustomerRepository = new MongoCustomerRepository(hashing);

describe('Mongo Customer Repository', () => {
	beforeAll(async () => {
		await connect(ConvictConfig.get('db.uri'));
	});

	describe('#save', () => {
		it('should save a customer', async () => {
			const customer = CustomerMother.random();

			await repository.save(customer);
		});

		it('should throw error if customer is already registered', async () => {
			await expect(async () => {
				const customer = CustomerMother.random();

				await repository.save(customer);

				await repository.save(customer);
			}).rejects.toThrow(CustomerAlreadyExistError);
		});
	});

	describe('#update', () => {
		it('should update a customer', async () => {
			const customer = CustomerMother.random();

			await repository.save(customer);

			const customerUpdate = CustomerMother.randomExceptId(customer.id.value);

			await repository.update(customerUpdate.toPrimitives());
		});

		it('should throw error if customer updates are already registered', async () => {
			await expect(async () => {
				const customerAlreadyRegistered = CustomerMother.random();
				await repository.save(customerAlreadyRegistered);

				const customer = CustomerMother.random();
				await repository.save(customer);

				const customerUpdate = CustomerMother.fromCommand({
					id: customer.id.value,
					email: customerAlreadyRegistered.email.value,
					username: customerAlreadyRegistered.username.value,
					password: customer.password.value
				});

				await repository.update(customerUpdate.toPrimitives());
			}).rejects.toThrow(CustomerAlreadyExistError);
		});
	});

	describe('#search', () => {
		it('should search a customer', async () => {
			const customerEmail = CustomerEmailMother.random();

			const customer = CustomerMother.randomExceptEmail(customerEmail.value);

			await repository.save(customer);

			const customerFound = await repository.search({ email: customerEmail });

			hashing.assertHashHaveBeenCalledWith(customer.password.value);

			expect(customerFound).toStrictEqual(customer);
		});
	});

	describe('#delete', () => {
		it('should delete a customer', async () => {
			const customer = CustomerMother.random();

			await repository.save(customer);

			await repository.delete(customer.id);
		});
	});

	afterAll(async () => {
		await disconnect();
	});
});
