import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto_booking/booking_dto';
import { EventService } from 'src/modules/event/event.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from './bookingschema';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from './emailservice';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import * as cron from 'node-cron'; 
import { ErrorInterceptor } from 'src/interceptor/error.interceptor';
import { BookingProducerService } from '../rabbitmq/producerservice';
import { BookingConsumerService } from '../rabbitmq/consmumerservice';
// import { Cron } from 'node-cron';

@ApiTags('bookings')
@Controller('booking')
@UseInterceptors(ErrorInterceptor)
export class BookingController {
 
  constructor(
    private readonly bookingservice: BookingService,
    private readonly eventservice: EventService,
    private readonly emailservice :EmailService,
    private readonly rabbitmqservice :RabbitMQService,
    private readonly producerservice:BookingProducerService,
    private readonly consumerservice:BookingConsumerService
  ) {}
  @UseGuards(AuthGuard('basic'))
  @Get('/getall')
  @ApiResponse({
    status: 200,
    description: 'List of all bookings',
    type: Booking,
    isArray: true,
  })
  async getAllBookings() {
    const bookings = await this.bookingservice.getAllBookings();
    return { bookings };
  }

  //creating booking for user for an event using the event_id and user_id
  @Post('/userbooking')
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 200,
    description: 'booking done succesfuly',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createBooking(@Body() createBookingDto: CreateBookingDto,@I18n() i18n: I18nContext) {
    const { user_id, event_id,email, event_name,start_time} = createBookingDto;
    const data=await this.bookingservice.createBooking(user_id, event_id);
    await this.emailservice.sendBookingConfirmation(email, event_name);
    //node cron
    const eventStartTime = new Date(start_time);
    const reminderTime = new Date(eventStartTime.getTime() - 2 * 60 * 1000);
    console.log(reminderTime)

    // Schedule the task using cron expression to run every 2 minutes
    const cronExpression = `*/1 * * * *`; // Every one minute
    cron.schedule(cronExpression, async () => {
      console.log("=========")
      const currentTime = new Date();
      if (currentTime >= reminderTime) {
        console.log("BBBBB")
        await this.emailservice.sendEventReminder(email, event_name);
      }
    });

    //rabbit mqt
    const queueName = 'booking_queue';
    await this.producerservice.sendBookingDataToQueue(queueName, data);
    //producer
    // const bookingData = JSON.stringify(data);
    // await this.rabbitmqservice.connect();
    // await this.rabbitmqservice.sendToQueue(queueName, bookingData);
    // console.log('Data is sent to queue successfully');

    //extraction of data from the queue
    await this.consumerservice.consumeBookingDataFromQueue(queueName,email);
    //consumer
    // const channel = this.rabbitmqservice.getChannel();
    // await channel.assertQueue(queueName);
    // channel.consume(queueName, async (message) => {
    //   if (message) {
    //     const bookingData = JSON.parse(message.content.toString());

        //convert bookingData to PDF(buffer data)
        // const pdfBuffer = await this.bookingservice.convertBookingDataToPDF(bookingData);
        // await this.emailservice.sendBookingPDF(email, pdfBuffer);
        // channel.ack(message);
      // }
    // });
    return {message: i18n.t('test.Bookingcreatedsuccessfully')};
  }
}