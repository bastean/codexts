import { CustomerId } from 'codexts-contexts-ecommerce/customer/domain/valueObjects/CustomerId';

import { UuidMother } from '../../../shared/domain/valueObjects/UuidMother';

export class CustomerIdMother {
	public static create(value: string): CustomerId {
		return new CustomerId(value);
	}

	public static random(): CustomerId {
		return this.create(UuidMother.random());
	}

	public static invalid(): CustomerId {
		return this.create('x');
	}

	public static empty(): CustomerId {
		return this.create('');
	}
}
