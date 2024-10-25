import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid Email format' })
  @IsNotEmpty({ message: 'Email required' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
