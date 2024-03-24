import { IsNotEmpty } from 'class-validator';
//data transfer objects
export class logoutDtoDto {
  @IsNotEmpty()
  email: string;
}
