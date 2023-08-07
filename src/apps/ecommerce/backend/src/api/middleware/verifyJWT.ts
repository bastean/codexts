import httpStatus from 'http-status';

import { Authentication } from '../../container/Authentication';

import type { NextFunction, Request, Response } from 'express';

const getJWT = (req: Request): string => {
	let token: string = '';

	if (req.headers.authorization !== undefined && req.headers.authorization.startsWith('Bearer')) {
		[, token] = req.headers.authorization.split(' ');
	}

	return token;
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const isNotAnAuthURL = !req.originalUrl.includes('auth');

	if (isNotAnAuthURL) return next();

	const tokenFromRequest = getJWT(req);

	const tokenVerified: { id: string } | undefined = Authentication.verifyToken(tokenFromRequest);

	if (tokenVerified !== undefined) {
		(req as Request & { id: string }).id = tokenVerified.id;
		return next();
	}

	return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
		message: 'Missing Token'
	});
};
