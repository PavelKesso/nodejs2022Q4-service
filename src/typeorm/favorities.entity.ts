import {
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'favorites_id',
  })
  id: number;

  @ManyToMany(() => Artist, {
    cascade: false,
  })
  @JoinColumn({ name: 'id' })
  atrists: Artist[];

  @ManyToMany(() => Album, {
    cascade: false,
  })
  @JoinColumn({ name: 'id' })
  albums: Album[];

  @ManyToMany(() => Track, {
    cascade: false,
  })
  @JoinColumn({ name: 'id' })
  tracks: Track[];
}
