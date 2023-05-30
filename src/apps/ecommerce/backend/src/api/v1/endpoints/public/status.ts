import { Router } from 'express';
import httpStatus from 'http-status';

import type { Request, Response } from 'express';

const status = Router();

status.get('/', (req: Request, res: Response) => {
	res.status(httpStatus.OK).send();
});

export { status as router };
