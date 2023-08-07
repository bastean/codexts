import { MongoCustomerRepository } from 'codexts-contexts-ecommerce/customer/infrastructure/persistence/mongo/MongoCustomerRepository';
import { EcommerceConfig } from 'codexts-contexts-ecommerce/shared/infrastructure/config/EcommerceConfig';
import { connect, disconnect } from 'mongoose';

import { CustomerHashingMock } from '../../__mocks__/infrastructure/cryptographic/CustomerHashingMock';
import { CustomerMother } from '../../domain/aggregate/CustomerMother';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import type { CustomerRepository } from 'codexts-contexts-ecommerce/customer/domain/repository/CustomerRepository';

const hashing: CustomerHashingMock = new CustomerHashingMock();
const repository: CustomerRepository = new MongoCustomerRepository(hashing);

describe('Mongo Customer Repository', () => {
	beforeAll(async () => {
		await connect(EcommerceConfig.get('db.uri'));
	});

	describe('#save', () => {
		it('should save a customer', async () => {
			const customer = CustomerMother.random();

			await repository.save(customer);
		});
	});

	describe('#update', () => {
		it('should update a customer', async () => {
			const customer = CustomerMother.random();

			await repository.save(customer);

			const customerUpdate = CustomerMother.randomExceptId(customer.id.value);

			await repository.update(customerUpdate.toPrimitives());
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
