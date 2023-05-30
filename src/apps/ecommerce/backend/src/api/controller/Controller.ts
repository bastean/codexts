import type { NextFunction, Request, Response } from 'express';

export interface Controller {
	(req: Request, res: Response, next: NextFunction): Promise<void>;
}
