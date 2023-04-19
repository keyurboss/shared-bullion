import * as Joi from 'joi';
import { appEnvNameKey, validAppEnvNames } from '@rps/bullion-interfaces/core';

export const defaultValidationSchema = Joi.object({
  DATA_SERVER_PORT: Joi.number().port().required(),
  [appEnvNameKey]: Joi.string()
    .valid(...validAppEnvNames)
    .default('local'),
});
