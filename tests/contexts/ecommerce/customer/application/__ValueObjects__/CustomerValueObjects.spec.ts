import { CustomerPasswordLengthError } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerPasswordLengthError';
import { CustomerUsernameAlphanumericError } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsernameAlphanumericError';
import { CustomerUsernameLengthError } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerUsernameLengthError';
import { InvalidValueError } from 'codexts-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';

import { CustomerEmailMother } from '../../domain/valueObjects/CustomerEmailMother';
import { CustomerIdMother } from '../../domain/valueObjects/CustomerIdMother';
import { CustomerPasswordMother } from '../../domain/valueObjects/CustomerPasswordMother';
import { CustomerUsernameMother } from '../../domain/valueObjects/CustomerUsernameMother';

describe('Customer Value Objects', () => {
	describe('Customer Id', () => {
		it('should throw error if customer id is empty', async () => {
			expect(() => CustomerIdMother.empty()).toThrow(InvalidValueError);
		});

		it('should throw error if customer id is invalid', async () => {
			expect(() => CustomerIdMother.invalid()).toThrow(InvalidValueError);
		});
	});

	describe('Customer Email', () => {
		it('should throw error if customer email is empty', async () => {
			expect(() => CustomerEmailMother.empty()).toThrow(InvalidValueError);
		});

		it('should throw error if customer email is invalid', async () => {
			expect(() => CustomerEmailMother.invalid()).toThrow(InvalidValueError);
		});
	});

	describe('Customer Username', () => {
		it('should throw error if customer username is empty', async () => {
			expect(() => CustomerUsernameMother.empty()).toThrow(CustomerUsernameLengthError);
		});

		it('should throw error if customer username length is invalid', async () => {
			expect(() => CustomerUsernameMother.withInvalidLength()).toThrow(CustomerUsernameLengthError);
		});

		it('should throw error if customer username alphanumeric is invalid', async () => {
			expect(() => CustomerUsernameMother.withInvalidAlphanumeric()).toThrow(
				CustomerUsernameAlphanumericError
			);
		});
	});

	describe('Customer Password', () => {
		it('should throw error if customer password is empty', async () => {
			expect(() => CustomerPasswordMother.empty()).toThrow(CustomerPasswordLengthError);
		});

		it('should throw error if customer password length is invalid', async () => {
			expect(() => CustomerPasswordMother.withInvalidLength()).toThrow(CustomerPasswordLengthError);
		});
	});
});
