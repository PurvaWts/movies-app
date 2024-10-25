import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/database/schemas/users.schema';
import { Tokens } from 'src/database/schemas/tokens.schema';
import { RegisterDTO } from './dtos/register.dto';
import { ROLES, TOKENS } from 'src/constants/app.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface LoginResponse {
  user: Users;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly users: Model<Users>,
    @InjectModel(Tokens.name) private readonly tokens: Model<Tokens>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    return user;
  }

  async login(users: Users): Promise<LoginResponse> {
    const payload = { email: users.email, id: users.id, role: users.role };

    const user = await this.users.findOne({ _id: users.id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.email !== users.email || user.role !== users.role) {
      throw new BadRequestException('Invalid email or password');
    }

    const access_token = this.jwtService.sign(payload);

    const tokenExist = await this.tokens.findOne({
      user_id: users.id,
      type: TOKENS.AUTH,
    });

    if (tokenExist) {
      await this.tokens.updateOne(
        {
          user_id: users.id,
          type: TOKENS.AUTH,
        },
        { token: access_token },
      );
    } else {
      await this.tokens.create({
        user_id: users.id,
        token: access_token,
        type: TOKENS.AUTH,
      });
    }

    return { user: users, access_token };
  }

  async register(user: RegisterDTO) {
    const existingUser = await this.users.findOne({ email: user.email });
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const newUser = {
      ...user,
      password: user.password,
      role: Object.values(ROLES).find((r) => r === user.role),
    };
    const userData = await this.users.create(newUser);
    return this.login(userData);
  }
}
