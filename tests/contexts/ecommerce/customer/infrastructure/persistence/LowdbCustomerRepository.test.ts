import { unlinkSync } from 'fs';

import { LowdbCustomerRepository } from 'coding-conventions-contexts-ecommerce/customer/infrastructure/persistence/lowdb/LowdbCustomerRepository';

import { CustomerMother } from '../../domain/aggregate/CustomerMother';
import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';

import type { CustomerRepository } from 'coding-conventions-contexts-ecommerce/customer/domain/repository/CustomerRepository';

const dbPath = `${process.cwd()}/ignore/lowdb`;
const dbName = 'test_db';

const repository: CustomerRepository = new LowdbCustomerRepository(dbName);

describe('LowdbCustomerRepository', () => {
	describe('#save', () => {
		it('should save a customer', async () => {
			const customer = CustomerMother.random();

			await repository.save(customer);
		});
	});

	describe('#search', () => {
		it('should find a customer', async () => {
			const customerEmail = CustomerEmailMother.random();

			const customer = CustomerMother.withIdAndUsername(customerEmail.value);

			await repository.save(customer);

			const customerFound = await repository.search(customerEmail);

			expect(customerFound).toStrictEqual(customer);
		});
	});

	describe('#delete', () => {
		it('should delete a customer', async () => {
			const customerEmail = CustomerEmailMother.random();

			const customer = CustomerMother.withIdAndUsername(customerEmail.value);

			await repository.save(customer);

			await repository.delete(customer.id);
		});
	});

	afterAll(() => {
		unlinkSync(`${dbPath}/${dbName}.json`);
	});
});
