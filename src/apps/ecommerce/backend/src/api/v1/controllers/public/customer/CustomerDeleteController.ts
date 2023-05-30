import httpStatus from 'http-status';

import { CustomerDeleteHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response, Request } from 'express';

export const CustomerDeleteController: Controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		await CustomerDeleteHandler.handle({ id });
		res.status(httpStatus.OK).send();
	} catch (error) {
		next(error);
	}
};
