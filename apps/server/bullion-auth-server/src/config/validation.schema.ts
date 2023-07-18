import * as Joi from 'joi';

export const defaultValidationSchema = Joi.object({
  AUTH_DB_URL: Joi.string().uri().optional(),
  AUTH_REDIS_URL: Joi.string().uri().optional(),
  AUTH_DB_TLS_CA: Joi.string().optional(),
  AUTH_REDIS_USERNAME: Joi.string().optional(),
  AUTH_REDIS_PASSWORD: Joi.string().optional(),
  AUTH_PORT: Joi.number().port().required(),
});
