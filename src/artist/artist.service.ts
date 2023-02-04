import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private _artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const id = v4();
    const artist = new Artist(id, createArtistDto.name, createArtistDto.grammy);
    this._artists.push(artist);
    return artist;
  }

  findAll() {
    return this._artists;
  }

  findOne(id: string) {
    return this._artists.filter((artist) => artist.id == id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this._artists.find((artist) => artist.id == id);

    if (!artist) {
      return;
    }

    const { name, grammy } = updateArtistDto;

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(id: string) {
    this._artists = this._artists.filter((artist) => artist.id == id);
  }
}
