import { HTTPClient } from '../../../utils/HTTPClient';

type Customer = {
	email?: string;
	username?: string;
	currentPassword?: string;
	updatedPassword?: string;
};

const cleanEmptyEntries = (customer: Customer): Customer =>
	Object.fromEntries(Object.entries(customer).filter((item) => item[1] !== ''));

export const onSubmitHandler = async (inputs: unknown): Promise<void> => {
	const customer = cleanEmptyEntries(inputs as Customer);

	await HTTPClient.patch('/auth/customer', customer);
};
