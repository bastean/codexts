import httpStatus from 'http-status';

import { CustomerRegisterHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response } from 'express';

type PutRequest = {
	body: {
		id: string;
		username: string;
		email: string;
	};
};

export const CustomerPutController: Controller = async (
	req: PutRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id, username, email } = req.body;
		await CustomerRegisterHandler.handle({ id, username, email });
		res.status(httpStatus.CREATED).send();
	} catch (error) {
		next(error);
	}
};
