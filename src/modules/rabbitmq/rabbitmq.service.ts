import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  async connect() {
    try {
      this.connection = await connect('amqp://localhost'); // RabbitMQ server URL
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }

  getChannel() {
    if (!this.channel) {
      throw new Error('RabbitMQ connection is not established');
    }
    return this.channel;
  }
  async sendToQueue(queue: string, message: string) {
    if (!this.channel) {
      throw new Error('RabbitMQ connection is not established');
    }

    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(message));
  }
  async consumeQueue(queue: string, callback: (message: string) => void) {
    if (!this.channel) {
      throw new Error('RabbitMQ connection is not established');
    }

    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (message) => {
      if (message) {
        const content = message.content.toString();
        callback(content);
        this.channel?.ack(message); // Acknowledge the message
      }
    })
  
}
}
