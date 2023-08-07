import { asClass, createContainer } from 'awilix';
import { WinstonLogger } from 'codexts-contexts-ecommerce/shared/infrastructure/logger/winston/WinstonLogger';

import type { Logger } from 'codexts-contexts-ecommerce/shared/domain/models/Logger';

const container = createContainer().register({
	WinstonLogger: asClass(WinstonLogger).singleton()
});

export const Log = container.resolve<Logger>('WinstonLogger');
