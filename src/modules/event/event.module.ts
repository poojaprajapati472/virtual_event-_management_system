import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './eventschema';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService, EventModule,ErrorInterceptor],
  exports: [EventService],
})
export class EventModule {}
