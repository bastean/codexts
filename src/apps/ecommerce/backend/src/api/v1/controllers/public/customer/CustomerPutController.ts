import httpStatus from 'http-status';

import { CustomerRegisterHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response } from 'express';

type PutRequest = {
	body: {
		id: string;
		email: string;
		username: string;
		password: string;
	};
};

export const CustomerPutController: Controller = async (
	req: PutRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id, email, username, password } = req.body;
		await CustomerRegisterHandler.handle({ id, email, username, password });
		res.status(httpStatus.CREATED).send();
	} catch (error) {
		next(error);
	}
};
