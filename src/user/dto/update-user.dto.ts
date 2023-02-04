import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export type UpdateUserDto = Partial<CreateUserDto>;

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
