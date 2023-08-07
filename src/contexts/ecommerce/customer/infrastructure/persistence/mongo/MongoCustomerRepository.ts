import { Schema, model } from 'mongoose';

import { Customer } from '../../../domain/aggregate/Customer';

import type { Nullable } from '../../../../shared/domain/types/Nullable';
import type { CustomerRepository } from '../../../domain/repository/CustomerRepository';
import type { CustomerHashing } from '../../../domain/utils/CustomerHashing';
import type { CustomerEmail } from '../../../domain/valueObjects/CustomerEmail';
import type { CustomerId } from '../../../domain/valueObjects/CustomerId';
import type { CustomerUsername } from '../../../domain/valueObjects/CustomerUsername';
import type { Model } from 'mongoose';

type CustomerDocument = {
	id: string;
	email: string;
	username: string;
	password: string;
};

export class MongoCustomerRepository implements CustomerRepository {
	private readonly CustomerCollection: Model<CustomerDocument>;

	private readonly CustomerSchema: Schema<CustomerDocument>;

	public constructor(
		private readonly hashing: CustomerHashing,
		private readonly collectionName: string = 'customers'
	) {
		this.CustomerSchema = new Schema<CustomerDocument>({
			id: { type: String, required: true, unique: true },
			email: { type: String, required: true, unique: true },
			username: { type: String, required: true, unique: true },
			password: { type: String, required: true }
		});

		this.CustomerCollection = model<CustomerDocument>(this.collectionName, this.CustomerSchema);
	}

	public async save(customer: Customer): Promise<void> {
		const primitiveCustomer = customer.toPrimitives();
		const passwordHashed = this.hashing.hash(primitiveCustomer.password);

		await new this.CustomerCollection({ ...primitiveCustomer, password: passwordHashed }).save();
	}

	public async update(customer: {
		id: string;
		email?: string;
		username?: string;
		password?: string;
	}): Promise<void> {
		const primitiveCustomer = { ...customer };

		if (primitiveCustomer.password !== undefined) {
			primitiveCustomer.password = this.hashing.hash(primitiveCustomer.password);
		}

		await this.CustomerCollection.findOneAndUpdate({ id: customer.id }, primitiveCustomer);
	}

	public async delete(id: CustomerId): Promise<void> {
		await this.CustomerCollection.findOneAndDelete({ id: id.value });
	}

	public async search({
		id,
		email,
		username
	}: {
		id?: CustomerId;
		email?: CustomerEmail;
		username?: CustomerUsername;
	}): Promise<Nullable<Customer>> {
		const primitive: CustomerDocument | null = await this.CustomerCollection.findOne({
			$or: [{ id: id?.value }, { email: email?.value }, { username: username?.value }]
		});

		let customer: Nullable<Customer>;

		if (primitive !== undefined && primitive !== null) {
			customer = Customer.fromPrimitives({
				id: primitive.id,
				username: primitive.username,
				email: primitive.email,
				password: primitive.password
			});
		}

		return customer;
	}
}
