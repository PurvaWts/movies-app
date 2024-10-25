import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ROLES } from 'src/constants/app.constant';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid Email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Object.values(ROLES), {
    message: 'Role must be one of the following: admin, user',
  })
  role: string;
}
