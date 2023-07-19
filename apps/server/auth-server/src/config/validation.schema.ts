import Joi from 'joi';
import { JwtKeyLenght, commonValidationSchema } from '@rps/bullion-server-core';

export const defaultValidationSchema = {
  ...commonValidationSchema,
  AUTH_DB_URL: Joi.string().uri().optional(),
  AUTH_REDIS_URL: Joi.string().uri().optional(),
  AUTH_DB_TLS_CA: Joi.string().optional(),
  AUTH_REFRESH_TOKEN_KEY: Joi.string().required().min(JwtKeyLenght),
  AUTH_REDIS_USERNAME: Joi.string().optional(),
  AUTH_REDIS_PASSWORD: Joi.string().optional(),
  AUTH_PORT: Joi.number().port().required(),
};
