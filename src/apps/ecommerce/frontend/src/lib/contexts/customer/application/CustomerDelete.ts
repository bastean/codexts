import { HTTPClient } from '../../../utils/HTTPClient';

type Customer = {
	password: string;
};

export const onSubmitHandler = async (inputs: unknown): Promise<void> => {
	const { password } = inputs as Customer;

	await HTTPClient.delete('/auth/customer', {
		data: {
			password
		}
	});
};
