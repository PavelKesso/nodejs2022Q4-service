import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from './album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'track_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @ManyToOne(() => Artist, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'attist_id' })
  atrist: Artist | null;

  @ManyToOne(() => Album, {
    cascade: false,
    nullable: true,
  })
  @JoinColumn({ name: 'album_id' })
  album: Album | null;

  @Column({
    nullable: false,
    default: -1,
  })
  duration: number;
}
