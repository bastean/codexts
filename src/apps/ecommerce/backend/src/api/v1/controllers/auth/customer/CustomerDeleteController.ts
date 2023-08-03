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
		await CustomerDeleteHandler.handle({ id: (req as Request & { id: string }).id });
		res.status(httpStatus.OK).send();
	} catch (error) {
		next(error);
	}
};
