import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

import type { NextFunction, Request, Response } from 'express';

export const validateSchema = (req: Request, res: Response, next: NextFunction) => {
	const hasNoErrors = validationResult(req).isEmpty();

	if (hasNoErrors) return next();

	return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
		message: 'Values should not be empty'
	});
};
