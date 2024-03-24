// bookingConsumer.service.ts

import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service'; // Import your RabbitMQ service
import { EmailService } from '../booking/emailservice';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class BookingConsumerService {
  constructor(private readonly rabbitmqService: RabbitMQService
    ,private readonly emailservice:EmailService,
    private readonly bookingservice:BookingService) {}

    async consumeBookingDataFromQueue(queueName: string,email:string) {
        console.log(email)
        const channel = this.rabbitmqService.getChannel();
        await channel.assertQueue(queueName);
        channel.consume(queueName, async (message) => {
          if (message) {
            const bookingData = JSON.parse(message.content.toString());
            //TRY TO WRITE THIS IN TO THE CREATE BOOKING METHOD
            const pdfBuffer = await this.bookingservice.convertBookingDataToPDF(bookingData);
            await this.emailservice.sendBookingPDF(email, pdfBuffer);
            channel.ack(message);
          }
        });
    }
}
