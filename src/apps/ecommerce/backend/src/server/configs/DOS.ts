import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

export const DOS = () => {
	const windowMs = 15 * 60 * 1000;

	return [
		rateLimit({
			windowMs,
			max: 50,
			legacyHeaders: false
		}),
		slowDown({
			windowMs,
			delayAfter: 30,
			delayMs: 500
		})
	];
};
