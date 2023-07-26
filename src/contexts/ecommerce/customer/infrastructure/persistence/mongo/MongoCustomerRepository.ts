import { Schema, model } from 'mongoose';

import { Customer } from '../../../domain/aggregate/Customer';

import type { Nullable } from '../../../../shared/domain/types/Nullable';
import type { CustomerRepository } from '../../../domain/repository/CustomerRepository';
import type { CustomerEmail } from '../../../domain/valueObjects/CustomerEmail';
import type { CustomerId } from '../../../domain/valueObjects/CustomerId';
import type { Model } from 'mongoose';

type CustomerDocument = {
	id: string;
	username: string;
	email: string;
};

export class MongoCustomerRepository implements CustomerRepository {
	private readonly CustomerModel: Model<CustomerDocument>;

	public constructor(collectionName: string = 'customers') {
		this.CustomerModel = model<CustomerDocument>(
			collectionName,
			new Schema<CustomerDocument>({
				id: { type: String, required: true },
				username: { type: String, required: true },
				email: { type: String, required: true }
			})
		);
	}

	public async save(customer: Customer): Promise<void> {
		await new this.CustomerModel(customer.toPrimitives()).save();
	}

	public async delete(id: CustomerId): Promise<void> {
		await this.CustomerModel.findOneAndDelete({ id: id.value });
	}

	public async search(email: CustomerEmail, id?: CustomerId): Promise<Nullable<Customer>> {
		const primitive: CustomerDocument | null =
			(await this.CustomerModel.findOne({ email: email.value })) ||
			(await this.CustomerModel.findOne({ id: id?.value }));

		if (primitive !== undefined && primitive !== null) {
			const customer = Customer.fromPrimitives({
				id: primitive.id,
				username: primitive.username,
				email: primitive.email
			});
			return customer;
		}

		return null;
	}
}
