import { IsNotEmpty, IsEmail, MinLength, IsString, IsEnum, IsOptional } from 'class-validator';
//data transfer objects

// enum TwoFaType{
//   email='email',
// }
export class CreateUserDto {
  // @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  // refreshToken?: string;
  refreshTokenExpiresAt: Date;
  


  // @IsEnum(TwoFaType)    
  // hasTwoFactorAuth: TwoFaType;
  // @IsNotEmpty()
  // hasTwoFactorAuth: boolean;

  interest: [string];
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  otp: string;
}
export class ResetPasswordDto {
  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  newPassword: string;
}
export class VerifyDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}