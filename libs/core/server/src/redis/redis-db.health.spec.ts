import { HealthIndicatorResult, TimeoutError } from '@nestjs/terminus';
import * as faker from 'faker';

import { RedisDbHealthIndicator } from './redis-db.health';

describe(RedisDbHealthIndicator.name, () => {
  let mongoDbHealthIndicator: RedisDbHealthIndicator;
  let mongoDbMock: Record<'command', jest.Mock>;
  let key: string;
  let resultPromise: Promise<HealthIndicatorResult>;

  describe('when ping succeeds ', () => {
    beforeEach(() => {
      mongoDbMock = { command: jest.fn().mockResolvedValue({ ok: 1 }) };
      const mongoDbServiceMock = { db: mongoDbMock };

      mongoDbHealthIndicator = new RedisDbHealthIndicator(
        mongoDbServiceMock as never,
      );

      key = faker.internet.userName();
      resultPromise = mongoDbHealthIndicator.isHealthy(key);
    });

    it.todo('calls MongoDB service DB command with config');

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
      mongoDbMock = {
        command: jest.fn().mockImplementation(() => {
          return new Promise((response) => setTimeout(response, 1500));
        }),
      };
      const mongoDbServiceMock = { db: mongoDbMock };

      mongoDbHealthIndicator = new RedisDbHealthIndicator(
        mongoDbServiceMock as never,
      );

      key = faker.internet.userName();
      resultPromise = mongoDbHealthIndicator.isHealthy(key);
    });

    it.todo('calls MongoDB service DB command with config');

    it('rejects', () => {
      return expect(resultPromise).rejects.toBeInstanceOf(TimeoutError);
    });
  });
});
