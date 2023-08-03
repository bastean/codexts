import httpStatus from 'http-status';

import { JWT } from '../utils/JWT';

import type { NextFunction, Request, Response } from 'express';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const isNotAnAuthURL = !req.originalUrl.includes('auth');

	if (isNotAnAuthURL) return next();

	const tokenDecoded: { id: string } | undefined = JWT.verify(req);

	if (tokenDecoded !== undefined) {
		(req as Request & { id: string }).id = tokenDecoded.id;
		return next();
	}

	return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
		message: 'Missing Token'
	});
};
