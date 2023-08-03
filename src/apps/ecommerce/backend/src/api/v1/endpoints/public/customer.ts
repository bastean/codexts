import { Router } from 'express';

import { CustomerPostController } from '../../controllers/public/customer/CustomerPostController';
import { CustomerPutController } from '../../controllers/public/customer/CustomerPutController';

const customer = Router();

customer.put('/', CustomerPutController);

customer.post('/', CustomerPostController);

export { customer as router };
