import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];
  create(): string {
    return 'This action adds a new user';
  }

  findAll(): string {
    return 'This action returns all users';
  }

  findOne(id: number): string {
    return `This action returns a #${id} user`;
  }
}
