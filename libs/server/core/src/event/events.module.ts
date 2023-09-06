import { Module } from '@nestjs/common';
import { EventBus } from './services/event-bus.service';

@Module({
  providers: [EventBus],
  exports: [EventBus],
})
export class ServerEventsModule {}
