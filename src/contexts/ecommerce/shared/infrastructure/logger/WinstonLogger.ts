import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { EcommerceConfig } from '../config/EcommerceConfig';

import type { Logger } from '../../domain/models/Logger';
import type { Logger as WinstonLoggerType } from 'winston';

enum Levels {
	ERROR = 'error',
	INFO = 'info',
	DEBUG = 'debug'
}

const { combine, colorize, timestamp, label, printf, json } = winston.format;

const dailyRotateFileConfig = (level: string) => ({
	level,
	filename: `logs/${level}-%DATE%.log`,
	auditFile: `logs/.${level}-audit.json`,
	utc: true,
	maxFiles: '7d',
	zippedArchive: true,
	format: combine(
		label({
			label: `${EcommerceConfig.get('env')}`
		}),
		timestamp(),
		json()
	)
});

export class WinstonLogger implements Logger {
	private readonly logger: WinstonLoggerType;

	public constructor() {
		this.logger = winston.createLogger({
			transports: [
				new DailyRotateFile(dailyRotateFileConfig(Levels.ERROR)),
				new DailyRotateFile(dailyRotateFileConfig(Levels.INFO)),
				new DailyRotateFile(dailyRotateFileConfig(Levels.DEBUG)),
				new winston.transports.Console({
					format: combine(
						colorize({
							colors: {
								error: 'bold white redBG',
								info: 'bold white cyanBG',
								debug: 'bold white greenBG'
							}
						}),
						timestamp({
							format: 'YYYY-MM-DD hh:mm:ss.SSS A'
						}),
						label({
							label: `${EcommerceConfig.get('env')}`
						}),
						printf(
							(info) =>
								`[${info.timestamp as string}] (${info.label as string}) ${info.level}: ${
									info.message as string
								}`
						)
					)
				})
			]
		});
	}

	public error(message: string) {
		this.logger.error(message);
	}

	public info(message: string) {
		this.logger.info(message);
	}

	public debug(message: string) {
		this.logger.debug(message);
	}
}
