import type { Nullable } from '../../../shared/domain/types/Nullable';
import type { Customer } from '../aggregate/Customer';
import type { CustomerEmail } from '../valueObjects/CustomerEmail';
import type { CustomerId } from '../valueObjects/CustomerId';
import type { CustomerUsername } from '../valueObjects/CustomerUsername';

export interface CustomerRepository {
	save(customer: Customer): Promise<void>;
	update(customer: {
		id: string;
		email?: string;
		username?: string;
		password?: string;
	}): Promise<void>;
	delete(id: CustomerId): Promise<void>;
	search({
		id,
		email,
		username
	}: {
		id?: CustomerId;
		email?: CustomerEmail;
		username?: CustomerUsername;
	}): Promise<Nullable<Customer>>;
}
