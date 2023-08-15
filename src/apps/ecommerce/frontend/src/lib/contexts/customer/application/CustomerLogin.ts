import { HTTPClient } from '../../../utils/HTTPClient';
import { CustomerJWTStore } from '../stores/CustomerJWTStore';
import { CustomerStore } from '../stores/CustomerStore';

type Customer = {
	email: string;
	password: string;
};

type Response = {
	id: string;
	email: string;
	username: string;
};

export const onSubmitHandler = async (inputs: unknown): Promise<void> => {
	const response = await HTTPClient.post<Response>('/public/customer', {
		...(inputs as Customer)
	});

	CustomerJWTStore.set(response.headers.authorization as string);

	CustomerStore.set(response.data);
};
