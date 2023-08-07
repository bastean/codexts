import { jest } from '@jest/globals';

import type { CustomerHashing } from 'codexts-contexts-ecommerce/customer/domain/utils/CustomerHashing';

export class CustomerHashingMock implements CustomerHashing {
	private readonly hashMock: jest.Mock;

	private readonly isNotEqualMock: jest.Mock;

	public constructor() {
		this.hashMock = jest.fn().mockName('CustomerHashingHashMock');
		this.isNotEqualMock = jest.fn().mockName('IsNotEqualMock');
	}

	public hash(plain: string): string {
		this.hashMock(plain);
		return plain;
	}

	public assertHashHaveBeenCalledWith(expected: string): void {
		expect(this.hashMock).toHaveBeenCalledWith(expected);
	}

	public isNotEqual(plain: string, hashed: string): boolean {
		this.isNotEqualMock(plain, hashed);
		return false;
	}

	public assertIsNotEqualHaveBeenCalledWith(expectedPlain: string, expectedHashed: string): void {
		expect(this.isNotEqualMock).toHaveBeenCalledWith(expectedPlain, expectedHashed);
	}
}
