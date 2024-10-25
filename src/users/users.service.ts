import { Injectable } from '@nestjs/common';
import { Users } from '../database/schemas/users.schema';
import { UUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly users: Users) {}

  async findOneByEmail(email: string) {
    return await this.users.findOneBy({ email });
  }

  async findOneById(id: UUID) {
    return await this.users.findOneBy({ id });
  }

  async create(users: Users) {
    return await this.users.save(users);
  }

  async update(userId: UUID, userInformation: Partial<Users>) {
    return await this.users.update(userId, userInformation);
  }
}
