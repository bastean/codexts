import httpStatus from 'http-status';

import { Authentication } from '../../../../../container/Authentication';
import { CustomerLoginHandler } from '../../../../../container/Customer';

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
		const token = Authentication.generateToken((response as { id: string }).id);
		res.header('Authorization', `Bearer ${token}`);
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		next(error);
	}
};
