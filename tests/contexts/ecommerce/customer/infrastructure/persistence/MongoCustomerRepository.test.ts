import { MongoCustomerRepository } from 'codexts-contexts-ecommerce/customer/infrastructure/persistence/mongo/MongoCustomerRepository';
import { EcommerceConfig } from 'codexts-contexts-ecommerce/shared/infrastructure/config/EcommerceConfig';
import { connect, disconnect } from 'mongoose';

import { CustomerMother } from '../../domain/aggregate/CustomerMother';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import type { CustomerRepository } from 'codexts-contexts-ecommerce/customer/domain/repository/CustomerRepository';

const repository: CustomerRepository = new MongoCustomerRepository();

describe('MongoCustomerRepository', () => {
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

			await repository.update(customerUpdate);
		});
	});

	describe('#search', () => {
		it('should find a customer', async () => {
			const customerEmail = CustomerEmailMother.random();

			const customer = CustomerMother.randomExceptEmail(customerEmail.value);

			await repository.save(customer);

			const customerFound = await repository.search({ email: customerEmail });

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
