import { connect } from 'mongoose';

import { Config } from './Config';

export const Database = {
	connect: () => connect(Config.get('db.uri'))
};
