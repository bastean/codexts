import jwt from 'jsonwebtoken';

import { ConvictConfig } from '../../config/convict/ConvictConfig';

type Token = {
	id: string;
};

export class AuthenticationJWT {
	public static generateToken(id: string): string {
		return jwt.sign({ id }, ConvictConfig.get('jwt.privateKey'), {
			expiresIn: '7d'
		});
	}

	public static verifyToken(token: string): Token | undefined {
		let result: Token | undefined;

		jwt.verify(token, ConvictConfig.get('jwt.privateKey'), (error, decoded) => {
			if (decoded === undefined) return;

			result = decoded as Token;
		});

		return result;
	}
}
