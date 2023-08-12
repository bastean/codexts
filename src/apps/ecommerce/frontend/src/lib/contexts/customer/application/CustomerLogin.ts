import { HTTPClient } from '../../../utils/HTTPClient';
import { CustomerJWTStore } from '../stores/CustomerJWTStore';

type Customer = {
	email: string;
	password: string;
};

type Response = {
	id: string;
	email: string;
	username: string;
};

export const onSubmitHandler = async (customer: unknown): Promise<void> => {
	const response = await HTTPClient.post<Response>('/public/customer', {
		...(customer as Customer)
	});

	CustomerJWTStore.set(response.headers.authorization as string);
};
