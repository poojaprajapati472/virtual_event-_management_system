import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './bookingschema';
import { EventModule } from 'src/modules/event/event.module';
import { EmailService } from './emailservice';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { EventSchema } from '../event/eventschema';
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
import { BookingProducerService } from '../rabbitmq/producerservice';
import { BookingConsumerService } from '../rabbitmq/consmumerservice';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema },
      { name: Event.name, schema: EventSchema },]),
    EventModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingModule,EmailService,RabbitMQService,ErrorInterceptor,BookingProducerService,BookingConsumerService],
})
export class BookingModule {}
