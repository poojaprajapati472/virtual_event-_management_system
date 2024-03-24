import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  event_id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  event_name: string;
  @IsNotEmpty()
  @IsDate()
  start_time: Date;
  
  
}
