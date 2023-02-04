import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Album {
  @ApiProperty({ description: 'Album identifier', nullable: false })
  @IsUUID('4')
  id: string;
  @ApiProperty({ description: 'Album name', nullable: false })
  name: string;
  @ApiProperty({ description: 'Album relase year', nullable: false })
  year: number;
  @ApiProperty({ description: 'Album author', nullable: false })
  @IsUUID('4')
  artistId: string | null;

  constructor(id: string, name: string, year: number, artistId: string | null) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
