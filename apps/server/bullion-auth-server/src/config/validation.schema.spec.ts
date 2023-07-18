import { faker } from '@faker-js/faker';
import { describe, it } from '@jest/globals';

import { defaultValidationSchema } from './validation.schema';
// import * as Joi from 'joi';

describe('Env Validation Schema', () => {
  const validEnvs = {
    AUTH_PORT: faker.number.int({
      max: 65535,
      min: 1,
    }),
    AUTH_DB_URL: faker.internet.url(),
    AUTH_REDIS_URL: faker.internet.url(),
    AUTH_DB_TLS_CA: faker.internet.userName(),
    AUTH_REDIS_USERNAME: faker.internet.userName(),
    AUTH_REDIS_PASSWORD: faker.internet.userName(),
  };
  it('Validation fails if we have passed invalid port or port is not passed', () => {
    const mockEnvs = {
      ...validEnvs,
      AUTH_PORT: faker.number.int({
        min: 70000,
      }),
    };
    const result = defaultValidationSchema.validate(mockEnvs);
    expect(result.error).toBeDefined();
    expect(result.error).toStrictEqual(
      expect.objectContaining({
        _original: mockEnvs,
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"AUTH_PORT" must be a valid port',
            type: 'number.port',
          }),
        ]),
      })
    );
  });
  it('Validation is passed even when optional parameter is not passed', () => {
    const mockEnvs = {
      ...validEnvs,
      AUTH_DB_TLS_CA: undefined,
      AUTH_REDIS_USERNAME: undefined,
      AUTH_REDIS_PASSWORD: undefined,
    };
    const result = defaultValidationSchema.validate(mockEnvs);
    expect(result.error).toBeUndefined();
    expect(result.value).toStrictEqual({
      ...validEnvs,
      AUTH_DB_TLS_CA: undefined,
      AUTH_REDIS_USERNAME: undefined,
      AUTH_REDIS_PASSWORD: undefined,
    });
  });
  it('Validation is passed when Env variables are passed correctly', () => {
    const result = defaultValidationSchema.validate(validEnvs);
    expect(result.error).toBeUndefined();
    expect(result.value).toStrictEqual(validEnvs);
  });
  it('Validation fails if we have passed empty string or other then string for AUTH_REDIS_USERNAME,AUTH_REDIS_PASSWORD', () => {
    const mockEnvs = {
      ...validEnvs,
      AUTH_REDIS_USERNAME: '',
      AUTH_REDIS_PASSWORD: faker.number.int(),
    };
    const result = defaultValidationSchema.validate(mockEnvs, {
      abortEarly: false,
    });
    expect(result.error).toBeDefined();
    expect(result.error?.details).toHaveLength(2);
    expect(result.error).toStrictEqual(
      expect.objectContaining({
        _original: mockEnvs,
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"AUTH_REDIS_PASSWORD" must be a string',
            type: 'string.base',
          }),
          expect.objectContaining({
            message: '"AUTH_REDIS_USERNAME" is not allowed to be empty',
            type: 'string.empty',
          }),
        ]),
      })
    );
  });
  it('Validation fails if we have passed empty url or invalid url for AUTH_DB_URL', () => {
    const mockEnvs = {
      ...validEnvs,
      AUTH_DB_URL: faker.string.hexadecimal(),
    };
    const mockEnvs1 = {
      ...validEnvs,
      AUTH_REDIS_URL: '',
    };
    const result1 = defaultValidationSchema.validate(mockEnvs, {
      abortEarly: false,
    });
    const result2 = defaultValidationSchema.validate(mockEnvs1, {
      abortEarly: false,
    });
    expect(result1.error).toBeDefined();
    expect(result1.error?.details).toHaveLength(1);
    expect(result1.error).toStrictEqual(
      expect.objectContaining({
        _original: mockEnvs,
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"AUTH_DB_URL" must be a valid uri',
            type: 'string.uri',
          }),
        ]),
      })
    );
    expect(result2.error).toBeDefined();
    expect(result2.error?.details).toHaveLength(1);
    expect(result2.error).toStrictEqual(
      expect.objectContaining({
        _original: mockEnvs1,
        details: expect.arrayContaining([
          expect.objectContaining({
            message: '"AUTH_REDIS_URL" is not allowed to be empty',
            type: 'string.empty',
          }),
        ]),
      })
    );
  });
});
