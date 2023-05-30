import { asClass, createContainer } from 'awilix';
import { WinstonLogger } from 'coding-conventions-contexts-ecommerce/shared/infrastructure/logger/WinstonLogger';

import type { Logger } from 'coding-conventions-contexts-ecommerce/shared/domain/models/Logger';

const container = createContainer().register({
	WinstonLogger: asClass(WinstonLogger).singleton()
});

export const Log = container.resolve<Logger>('WinstonLogger');
