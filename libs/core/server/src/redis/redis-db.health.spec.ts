import { HealthIndicatorResult, TimeoutError } from '@nestjs/terminus';
import { faker } from '@faker-js/faker';

import { RedisDbHealthIndicator } from './redis-db.health';

describe(RedisDbHealthIndicator.name, () => {
  let redisDbHealthIndicator: RedisDbHealthIndicator;
  let redisDbMock: Record<'command', jest.Mock>;
  let key: string;
  let resultPromise: Promise<HealthIndicatorResult>;

  describe('when ping succeeds ', () => {
    beforeEach(() => {
      redisDbMock = { command: jest.fn().mockResolvedValue({ ok: 1 }) };
      const redisDbServiceMock = { db: redisDbMock };

      redisDbHealthIndicator = new RedisDbHealthIndicator(
        redisDbServiceMock as never,
      );

      key = faker.internet.userName();
      resultPromise = redisDbHealthIndicator.isHealthy(key);
    });

    it.todo('calls redisDB service DB command with config');

    it('resolves result', () => {
      return expect(resultPromise).resolves.toStrictEqual(
        expect.objectContaining({
          [key]: expect.objectContaining({ ok: 1, status: 'up' }),
        }),
      );
    });
  });

  describe('when ping fails ', () => {
    beforeEach(() => {
      redisDbMock = {
        command: jest.fn().mockImplementation(() => {
          return new Promise((response) => setTimeout(response, 1500));
        }),
      };
      const redisDbServiceMock = { db: redisDbMock };

      redisDbHealthIndicator = new RedisDbHealthIndicator(
        redisDbServiceMock as never,
      );

      key = faker.internet.userName();
      resultPromise = redisDbHealthIndicator.isHealthy(key);
    });

    it.todo('calls redisDB service DB command with config');

    it('rejects', () => {
      return expect(resultPromise).rejects.toBeInstanceOf(TimeoutError);
    });
  });
});
