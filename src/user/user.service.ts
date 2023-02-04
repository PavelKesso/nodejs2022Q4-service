import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private _users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const now = new Date().getTime();

    const user = new User(
      v4(),
      createUserDto.login,
      createUserDto.password,
      1,
      now,
      now,
    );

    this._users.push(user);

    return user;
  }

  findAll() {
    return this._users;
  }

  findOne(id: string) {
    const user = this._users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  update(id: string, updateUserPasswordDto: UpdatePasswordDto) {
    const user = this._users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password != updateUserPasswordDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updateUserPasswordDto.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();

    return user;
  }

  remove(id: string) {
    const index = this._users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this._users.splice(index, 1);

    return;
  }
}
