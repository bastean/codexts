import bcrypt from 'bcrypt';

import type { CustomerPassword } from '../valueObjects/CustomerPassword';

export class Password {
	public static isNotEqual(plain: string, hashed: CustomerPassword): boolean {
		return !bcrypt.compareSync(plain, hashed.value);
	}

	public static hash(value: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(value, salt);
	}
}
