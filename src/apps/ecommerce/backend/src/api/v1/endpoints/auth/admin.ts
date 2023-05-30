import { Router } from 'express';
import httpStatus from 'http-status';

import type { Request, Response } from 'express';

const admin = Router();

admin.get('/', (req: Request, res: Response) => {
	res.status(httpStatus.IM_A_TEAPOT).send();
});

export { admin as router };
