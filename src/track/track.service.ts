import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { UpdateFavoriteDto } from 'src/favorites/dto/update-favorite.dto';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private _tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(
      v4(),
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );

    this._tracks.push(track);

    return track;
  }

  findAll() {
    return this._tracks;
  }

  findOne(id: string) {
    const track = this._tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this._tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    if (updateTrackDto.name) track.name = updateTrackDto.name;
    if (updateTrackDto.albumId) track.albumId = updateTrackDto.albumId;
    if (updateTrackDto.artistId) track.artistId = updateTrackDto.artistId;
    if (updateTrackDto.duration) track.duration = updateTrackDto.duration;

    return track;
  }

  remove(id: string) {
    const index = this._tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    //todo delete from favotites

    this._tracks.splice(index, 1);

    return;
  }
}
