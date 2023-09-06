import { Inject, Injectable } from '@nestjs/common';
import { IEvent } from '../utilities/event';
import { MongoDbService } from '../../mongo';
import { RedisDbService } from '../../redis';
import { LoggerFactory } from '../../logger';

export const EventBusCollection = 'Events';

@Injectable()
export class EventBus {
  private readonly collection;
  private readonly logger;
  constructor(
    @Inject(MongoDbService) { db }: MongoDbService,
    @Inject(RedisDbService) private redis: RedisDbService,
    @Inject(LoggerFactory) loggerFactory: LoggerFactory,
  ) {
    this.collection = db.collection<IEvent>(EventBusCollection);
    this.logger = loggerFactory.create(this.constructor.name);
  }

  async publish(event: IEvent) {
    const data = event.toJson() as IEvent;
    await this.collection.insertOne(data);
    // TODO: Publish here to bus

    this.logger.debug(
      `Persisted Event (${event._id}): ${JSON.stringify(data)}`,
    );
  }
}
