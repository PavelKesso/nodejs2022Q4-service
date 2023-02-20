import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'artist_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: false,
  })
  grammy: boolean;
}
