import { Router } from 'express';

import { CustomerDeleteController } from '../../controllers/public/customer/CustomerDeleteController';
import { CustomerPostController } from '../../controllers/public/customer/CustomerPostController';
import { CustomerPutController } from '../../controllers/public/customer/CustomerPutController';

const customer = Router();

customer.put('/', CustomerPutController);

customer.delete('/:id', CustomerDeleteController);

customer.post('/', CustomerPostController);

export { customer as router };
