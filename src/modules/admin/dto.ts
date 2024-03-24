import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';
//data transfer objects
export class CreateadminDto {
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
