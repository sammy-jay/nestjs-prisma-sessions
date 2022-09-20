import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';
import { Match } from '../decorator/match.decorator';

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/gm, {
    message:
      'Password must be at least 7 characters long with special character(s), letter(s), and number(s)',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  @Match('password', { message: 'Passwords do not match' })
  passwordConfirm: string;
}
