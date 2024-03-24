import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import * as cron from 'node-cron';
import { Booking } from './bookingschema';
import { InjectModel } from '@nestjs/mongoose';
import { EventService } from 'src/modules/event/event.service';
import * as PDFDocument from 'pdfkit';


@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: mongoose.Model<Booking>,
    private readonly eventservice: EventService,
  ) { }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find();
  }
  async createBooking(userid: string, eventid: string): Promise<object> {
    const booking = new this.bookingModel({
      user: userid,
      event: eventid,
    });

    const savedBooking=await booking.save();
    await this.eventservice.updateEventAttendees(eventid, userid);

    return savedBooking
  }

  async convertBookingDataToPDF(bookingData): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const pdfBuffer: Buffer[] = [];
      const doc = new PDFDocument();
      doc.on('data', (chunk) => pdfBuffer.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(pdfBuffer)));
  
      doc.fontSize(16).text('Booking Details', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Event ID: ${bookingData.event}`);
      doc.fontSize(12).text(`User ID: ${bookingData.user}`);
      doc.fontSize(12).text(`Booking ID: ${bookingData._id}`);
      doc.fontSize(12).text(`Created At: ${bookingData.createdAt}`);
      doc.end();
    });
  }
}
