import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';

export type EventDocument = Event & Document;
@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true ,default: Date.now})
  start_time:Date;

  @Prop({ required: true ,default: Date.now})
  end_time: Date;

  @Prop({ required: true })
  venue: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'User' }] })
  attendees: string[]; // Array of user IDs
  // @Prop({ type: [{ type: 'ObjectId', ref: 'User' }] }) // Assuming you have a User schema
  // attendees: string[]; // Array of user IDs

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  organizer: string; // User ID of the organizer
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  // organizer: mongoose.Types.ObjectId;
  // @Prop({ type: 'ObjectId', ref: 'admin', required: true })
  // admin: string;
  @Prop([String])
  topics: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
