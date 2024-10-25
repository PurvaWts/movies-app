import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Users } from 'src/database/schemas/users.schema';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDTO } from '../dtos/login.dto';

async function validateLoginData(data: any) {
  const loginDTO = plainToInstance(LoginDTO, data);
  const errors = await validate(loginDTO);
  if (errors.length > 0) {
    const errorMessages = errors
      .map((err) => Object.values(err.constraints).join(', '))
      .join('; ');
    throw new BadRequestException(errorMessages);
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    email: string,
    password: string,
  ): Promise<Users> {
    await validateLoginData({ email, password });

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    req['userId'] = user._id;
    return user;
  }
}
