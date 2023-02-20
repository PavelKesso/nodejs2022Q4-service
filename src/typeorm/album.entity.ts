import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'album_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: -1,
  })
  year: number;

  @ManyToOne(() => Artist, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'artist_id' })
  atrist: Artist | null;
}
