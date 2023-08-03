import { Schema, model } from 'mongoose';

import { Customer } from '../../../domain/aggregate/Customer';

import type { Nullable } from '../../../../shared/domain/types/Nullable';
import type { CustomerRepository } from '../../../domain/repository/CustomerRepository';
import type { CustomerEmail } from '../../../domain/valueObjects/CustomerEmail';
import type { CustomerId } from '../../../domain/valueObjects/CustomerId';
import type { CustomerUsername } from '../../../domain/valueObjects/CustomerUsername';
import type { Model } from 'mongoose';

type CustomerDocument = {
	id: string;
	username: string;
	email: string;
	password: string;
};

export class MongoCustomerRepository implements CustomerRepository {
	private readonly CustomerModel: Model<CustomerDocument>;

	public constructor(collectionName: string = 'customers') {
		this.CustomerModel = model<CustomerDocument>(
			collectionName,
			new Schema<CustomerDocument>({
				id: { type: String, required: true },
				username: { type: String, required: true },
				email: { type: String, required: true },
				password: { type: String, required: true }
			})
		);
	}

	public async save(customer: Customer): Promise<void> {
		await new this.CustomerModel(customer.toPrimitives()).save();
	}

	public async update(customer: Customer): Promise<void> {
		await this.CustomerModel.findOneAndUpdate({ id: customer.id.value }, customer.toPrimitives());
	}

	public async delete(id: CustomerId): Promise<void> {
		await this.CustomerModel.findOneAndDelete({ id: id.value });
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
		const primitive: CustomerDocument | null = await this.CustomerModel.findOne({
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
