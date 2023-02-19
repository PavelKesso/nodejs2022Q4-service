import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: string) {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }

  async update(id: string, updateUserPasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneOrFail({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password != updateUserPasswordDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updateUserPasswordDto.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();

    this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneOrFail({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.delete(id);
  }
}
