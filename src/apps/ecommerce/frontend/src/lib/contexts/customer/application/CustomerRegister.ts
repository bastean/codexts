import { v4 as randomUUID } from 'uuid';

import { HTTPClient } from '../../../utils/HTTPClient';

type Customer = {
	email: string;
	username: string;
	password: string;
};

export const onSubmitHandler = async (customer: unknown): Promise<void> => {
	await HTTPClient.put('/public/customer', { ...(customer as Customer), id: randomUUID() });
};
