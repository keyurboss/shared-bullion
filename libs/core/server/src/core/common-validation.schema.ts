import * as Joi from 'joi';

export const JwtKeyLenght = 128;

export const commonValidationSchema = {
  ACCESS_TOKEN_KEY: Joi.string().required().min(JwtKeyLenght),
};
