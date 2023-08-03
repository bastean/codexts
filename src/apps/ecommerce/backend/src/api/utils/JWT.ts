import jwt from 'jsonwebtoken';

import { Config } from '../../container/Config';

import type { Request } from 'express';

type Token = {
	id: string;
};

export class JWT {
	public static generate(id: string): string {
		return jwt.sign({ id }, Config.get('backend.jwtPrivateKey'), {
			expiresIn: '7d'
		});
	}

	public static verify(req: Request): Token | undefined {
		let result: Token | undefined;

		if (req.headers.authorization !== undefined && req.headers.authorization.startsWith('Bearer')) {
			const jwtoken = req.headers.authorization.split(' ')[1];

			jwt.verify(jwtoken, Config.get('backend.jwtPrivateKey'), (error, decoded) => {
				if (decoded === undefined) return;

				result = decoded as Token;
			});
		}

		return result;
	}
}
