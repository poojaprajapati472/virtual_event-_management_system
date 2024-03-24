import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  endTime: Date;

  @IsNotEmpty()
  @IsString()
  venue: string;

  @IsNotEmpty()
  organizer: string;
  @IsNotEmpty()
  topics: [string];
}
