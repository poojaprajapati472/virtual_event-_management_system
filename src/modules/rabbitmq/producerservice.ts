// bookingProducer.service.ts

import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service'; // Import your RabbitMQ service

@Injectable()
export class BookingProducerService {
  constructor(private readonly rabbitmqService: RabbitMQService) {}

  async sendBookingDataToQueue(queueName: string, data: any) {
    const bookingData = JSON.stringify(data);
    await this.rabbitmqService.connect();
    await this.rabbitmqService.sendToQueue(queueName, bookingData);
    console.log('Data is sent to the queue successfully');
  }
}
