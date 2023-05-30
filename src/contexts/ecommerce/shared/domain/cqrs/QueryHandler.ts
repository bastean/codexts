import type { Query } from './Query';
import type { Response } from './Response';

export interface QueryHandler<Q extends Query, R extends Response> {
	handle(query: Q): Promise<R>;
}
