import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class User {
  @ApiProperty({ description: 'User identifier', nullable: false })
  @IsUUID('4')
  id: string;
  @ApiProperty({ description: 'User login', nullable: false })
  login: string;
  @ApiProperty({ description: 'User password', nullable: false })
  @Exclude()
  password: string;
  @ApiProperty({ description: 'version number', nullable: false })
  version: number;
  @ApiProperty({ description: 'Dete of user creation', nullable: false })
  createdAt: number;
  @ApiProperty({ description: 'Dete of user last update', nullable: false })
  updatedAt: number;

  constructor(
    id: string,
    login: string,
    password: string,
    version: number,
    createdAt: number,
    updatedAt: number,
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
