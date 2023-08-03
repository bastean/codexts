import { Router } from 'express';

import { CustomerDeleteController } from '../../controllers/auth/customer/CustomerDeleteController';
import { CustomerPatchController } from '../../controllers/auth/customer/CustomerPatchController';

const customer = Router();

customer.patch('/', CustomerPatchController);

customer.delete('/', CustomerDeleteController);

export { customer as router };
