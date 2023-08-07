import { BcryptCustomerHashing } from 'codexts-contexts-ecommerce/customer/infrastructure/cryptographic/bcrypt/BcryptCustomerHashing';

import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';

import type { CustomerHashing } from 'codexts-contexts-ecommerce/customer/domain/utils/CustomerHashing';

const hashing: CustomerHashing = new BcryptCustomerHashing();

describe('Bcrypt Customer Hashing', () => {
	describe('#hash', () => {
		it('should hashed a plain password', async () => {
			const plain = CustomerPasswordMother.random().value;

			const hashed = hashing.hash(plain);

			expect(hashed).not.toStrictEqual(plain);
		});
	});

	describe('#isNotEqual', () => {
		it('should compare a plain and hashed password', async () => {
			const plain = CustomerPasswordMother.random().value;

			const hashed = hashing.hash(plain);

			const isNotEqual = hashing.isNotEqual(plain, hashed);

			expect(isNotEqual).toBeFalsy();
		});
	});
});
