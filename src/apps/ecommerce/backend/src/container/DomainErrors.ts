import { AlreadyExistError } from 'coding-conventions-contexts-ecommerce/shared/domain/errors/AlreadyExistError';
import { NotExistError } from 'coding-conventions-contexts-ecommerce/shared/domain/errors/NotExistError';
import { InvalidValueError } from 'coding-conventions-contexts-ecommerce/shared/domain/valueObjects/InvalidValueError';
import httpStatus from 'http-status';

export const DomainErrors = [
	{
		type: InvalidValueError,
		code: httpStatus.UNPROCESSABLE_ENTITY
	},
	{
		type: NotExistError,
		code: httpStatus.NOT_FOUND
	},
	{
		type: AlreadyExistError,
		code: httpStatus.CONFLICT
	}
];
