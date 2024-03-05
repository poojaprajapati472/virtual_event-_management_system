import { IsNotEmpty } from 'class-validator';
//data transfer objects
export class updateuserDto {
  @IsNotEmpty()
  username:String;
}
