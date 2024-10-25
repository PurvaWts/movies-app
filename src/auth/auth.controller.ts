import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/database/schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { Public } from './decorators/public.decorator';

interface LoginResponse {
  user: Users;
  access_token: string;
}

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() loginDTO: LoginDTO,
    @Request() req,
  ): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerBody: RegisterDTO): Promise<LoginResponse> {
    return await this.authService.register(registerBody);
  }
}
