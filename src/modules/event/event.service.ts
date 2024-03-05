import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EventDto } from './date_transfer_object/eventdto';

@Injectable()
export class EventService {
  find(arg0: { start_time: { $gte: Date; $lt: Date; }; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Event.name)
    private eventModel: mongoose.Model<Event>,
  ) {}

  async createEvent(eventDto: EventDto): Promise<Event> {
    const createdEvent = new this.eventModel(eventDto);
    return createdEvent.save();
  }

  async findall(): Promise<Event[]> {
    const events = await this.eventModel.find();
    return events;
  }
  async updateEventAttendees(eventId: string, userId: string): Promise<void> {
    await this.eventModel.updateOne(
      { _id: eventId },
      { $addToSet: { attendees: userId } },
    );
  }
  
  async findEventsByUserAttendee(userId: string): Promise<Event[]> {
    return this.eventModel.find({ attendees: userId }).exec();
  }
}
