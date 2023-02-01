import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', nullable: false })
  name: string;
  @ApiProperty({ description: 'Is artist has grammy', nullable: false })
  grammy: boolean;
}
