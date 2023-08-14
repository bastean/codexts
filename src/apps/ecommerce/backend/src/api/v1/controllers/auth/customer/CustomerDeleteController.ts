import httpStatus from 'http-status';

import { CustomerDeleteHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response, Request } from 'express';

type DeleteRequest = {
	body: {
		password: string;
	};
};

export const CustomerDeleteController: Controller = async (
	req: DeleteRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { password } = req.body;
		await CustomerDeleteHandler.handle({ id: (req as Request & { id: string }).id, password });
		res.status(httpStatus.OK).send();
	} catch (error) {
		next(error);
	}
};
