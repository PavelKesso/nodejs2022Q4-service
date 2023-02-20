import { Exclude, Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseInt(data);
  }
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  @Generated('uuid')
  @IsUUID('4')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  login: string;

  @Column({
    nullable: false,
    default: '',
  })
  @Exclude()
  password: string;

  @Column({
    nullable: false,
    default: 1,
    type: 'integer',
    transformer: new ColumnNumericTransformer(),
  })
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  updatedAt: Date;
}
