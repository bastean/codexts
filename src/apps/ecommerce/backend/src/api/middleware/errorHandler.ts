import { DomainErrors } from '../../container/DomainErrors';

import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	let hasResponded = false;

	DomainErrors.forEach((domainError) => {
		if (err instanceof domainError.type) {
			res.status(domainError.code).json({ message: err.message });
			hasResponded = true;
		}
	});

	if (!hasResponded) {
		next(err);
	}
};
