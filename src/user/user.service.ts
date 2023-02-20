import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  private _users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: string, updateUserPasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password != updateUserPasswordDto.oldPassword) {
      throw new ForbiddenException();
    }

    await this.userRepository.update(id, {
      password: updateUserPasswordDto.newPassword,
      version: user.version + 1,
    });

    return this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.delete(id);
  }
}
