import { v4 as randomUUID } from 'uuid';

import { HTTPClient } from '../../../utils/HTTPClient';

type Customer = {
	email: string;
	username: string;
	password: string;
};

export const onSubmitHandler = async (inputs: unknown): Promise<void> => {
	await HTTPClient.put('/public/customer', { ...(inputs as Customer), id: randomUUID() });
};
