import httpStatus from 'http-status';

import { CustomerUpdateHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response } from 'express';

type PatchRequest = {
	body: {
		email?: string;
		username?: string;
		password?: string;
	};
};

export const CustomerPatchController: Controller = async (
	req: PatchRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, username, password } = req.body;
		await CustomerUpdateHandler.handle({
			id: (req as Request & { id: string }).id,
			email,
			username,
			password
		});
		res.status(httpStatus.OK).json();
	} catch (error) {
		next(error);
	}
};
