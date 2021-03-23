import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //SELECT ALL
  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['pets'],
    });
  }

  //SELECT BY ID
  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  //CREATE USER
  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({ name });
    return this.usersRepository.save(newUser);
  }

  //UPDATE USER
  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name;
    return this.usersRepository.save(user);
  }

  //DELETE USER
  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return this.usersRepository.remove(user);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
