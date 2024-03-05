import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { user } from 'src/modules/user/user.schema';
import { Event } from 'src/modules/event/eventschema';
export type BookingDocument = Booking & Document;
@Schema()
export class Booking {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  user: user; // User who made the booking

  @Prop({ type: 'ObjectId', ref: 'Event', required: true })
  event: Event; // Event that was booked
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
