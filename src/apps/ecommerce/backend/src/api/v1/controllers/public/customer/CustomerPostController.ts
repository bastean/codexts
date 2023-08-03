import httpStatus from 'http-status';

import { CustomerLoginHandler } from '../../../../../container/Customer';
import { JWT } from '../../../../utils/JWT';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response } from 'express';

type PostRequest = {
	body: {
		email: string;
		password: string;
	};
};

export const CustomerPostController: Controller = async (
	req: PostRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const response = (await CustomerLoginHandler.handle({ email, password })) as object;
		const id = JWT.generate((response as { id: string }).id);
		res.status(httpStatus.OK).json({ ...response, id });
	} catch (error) {
		next(error);
	}
};
