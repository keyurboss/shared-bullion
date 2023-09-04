import Joi from 'joi';

export const JwtKeyLength = 128;

export const defaultValidationSchema = {
  // ...commonValidationSchema,
  ACCESS_TOKEN_KEY: Joi.string().required().min(JwtKeyLength),
  AUTH_DB_URL: Joi.string().uri().optional(),
  AUTH_REDIS_URL: Joi.string().uri().optional(),
  AUTH_DB_TLS_CA: Joi.string().optional(),
  AUTH_REFRESH_TOKEN_KEY: Joi.string().required().min(JwtKeyLength),
  AUTH_REDIS_USERNAME: Joi.string().optional(),
  AUTH_REDIS_PASSWORD: Joi.string().optional(),
  AUTH_PORT: Joi.number().port().required(),
};
