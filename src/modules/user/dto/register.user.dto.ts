

import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must contain at least one uppercase letter and one number',
  })
  readonly password: string;
}
