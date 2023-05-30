import type { Nullable } from '../../../shared/domain/types/Nullable';
import type { Customer } from '../aggregate/Customer';
import type { CustomerEmail } from '../valueObjects/CustomerEmail';
import type { CustomerId } from '../valueObjects/CustomerId';

export interface CustomerRepository {
	save(customer: Customer): Promise<void>;
	delete(id: CustomerId): Promise<void>;
	search(email: CustomerEmail, id?: CustomerId): Promise<Nullable<Customer>>;
}
