import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Track {
  @ApiProperty({ description: 'Track identifier', nullable: false })
  @IsUUID('4')
  id: string;
  @ApiProperty({ description: 'Track name', nullable: false })
  name: string;
  @ApiProperty({ description: 'Artist', nullable: true })
  @IsUUID('4')
  artistId: string | null;
  @ApiProperty({ description: 'Album', nullable: true })
  @IsUUID('4')
  albumId: string | null;
  @ApiProperty({ description: 'Track duration', nullable: false })
  duration: number;

  constructor(
    id: string,
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
