import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;
  @ApiProperty({ description: 'Is artist has grammy', nullable: false })
  grammy: boolean;
}
