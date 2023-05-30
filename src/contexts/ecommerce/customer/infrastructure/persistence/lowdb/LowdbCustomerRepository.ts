import fs from 'fs';

import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

import { EcommerceConfig } from '../../../../shared/infrastructure/config/EcommerceConfig';
import { Customer } from '../../../domain/aggregate/Customer';

import type { Nullable } from '../../../../shared/domain/types/Nullable';
import type { CustomerRepository } from '../../../domain/repository/CustomerRepository';
import type { CustomerEmail } from '../../../domain/valueObjects/CustomerEmail';
import type { CustomerId } from '../../../domain/valueObjects/CustomerId';

type Data = {
	customers: { id: string; username: string; email: string }[];
};

export class LowdbCustomerRepository implements CustomerRepository {
	private readonly adapter: JSONFileSync<Data>;

	private readonly defaultData: Data;

	private readonly db: LowSync<Data>;

	public constructor(dbName = EcommerceConfig.get('env') === 'production' ? 'prod_db' : 'dev_db') {
		this.defaultData = { customers: [] };

		const dbPath = `${process.cwd()}/ignore/lowdb`;

		if (!fs.existsSync(dbPath)) {
			fs.mkdirSync(dbPath, { recursive: true });
		}

		this.adapter = new JSONFileSync(`${dbPath}/${dbName}.json`);

		this.db = new LowSync(this.adapter, this.defaultData);
		this.db.read();
	}

	public save(customer: Customer): Promise<void> {
		return new Promise((resolve) => {
			this.db.data.customers.push(customer.toPrimitives());
			this.db.write();
			resolve();
		});
	}

	public delete(id: CustomerId): Promise<void> {
		return new Promise((resolve) => {
			const tempDB: Data = this.db.data;
			this.db.data.customers = tempDB.customers.filter((customer) => customer.id !== id.value);
			this.db.write();
			resolve();
		});
	}

	public async search(email: CustomerEmail, id?: CustomerId): Promise<Nullable<Customer>> {
		return new Promise((resolve) => {
			const primitive = this.db.data.customers.find(
				(customer) => customer.email === email.value || customer.id === id?.value
			);

			if (primitive !== undefined && primitive !== null) {
				const customer = Customer.fromPrimitives({
					id: primitive.id,
					username: primitive.username,
					email: primitive.email
				});
				resolve(customer);
			}

			resolve(null);
		});
	}
}
