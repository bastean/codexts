import httpStatus from 'http-status';

import { CustomerFindHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response } from 'express';

type PostRequest = {
	body: {
		email: string;
	};
};

export const CustomerPostController: Controller = async (
	req: PostRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email } = req.body;
		const response = (await CustomerFindHandler.handle({ email })) as object;
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		next(error);
	}
};
