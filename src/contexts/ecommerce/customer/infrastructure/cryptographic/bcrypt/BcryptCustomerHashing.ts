import bcrypt from 'bcrypt';

import type { CustomerHashing } from '../../../domain/utils/CustomerHashing';

export class BcryptCustomerHashing implements CustomerHashing {
	public hash(plain: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(plain, salt);
	}

	public isNotEqual(plain: string, hashed: string): boolean {
		return !bcrypt.compareSync(plain, hashed);
	}
}
