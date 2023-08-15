import httpStatus from 'http-status';

import { CustomerUpdateHandler } from '../../../../../container/Customer';

import type { Controller } from '../../../../controller/Controller';
import type { NextFunction, Response } from 'express';

type PatchRequest = {
	body: {
		email?: string;
		username?: string;
		currentPassword?: string;
		updatedPassword?: string;
	};
};

export const CustomerPatchController: Controller = async (
	req: PatchRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, username, currentPassword, updatedPassword } = req.body;
		await CustomerUpdateHandler.handle({
			id: (req as Request & { id: string }).id,
			email,
			username,
			currentPassword,
			updatedPassword
		});
		res.status(httpStatus.OK).send();
	} catch (error) {
		next(error);
	}
};
