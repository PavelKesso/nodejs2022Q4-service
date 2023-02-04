import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private _artists: Artist[] = [];

  @Inject(TrackService)
  public trackService: TrackService;

  @Inject(AlbumService)
  public albumService: AlbumService;

  @Inject(forwardRef(() => FavoritesService))
  public favoritesService: FavoritesService;

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(
      v4(),
      createArtistDto.name,
      createArtistDto.grammy,
    );

    this._artists.push(artist);

    return artist;
  }

  findAll() {
    return this._artists;
  }

  findOne(id: string) {
    const artist = this._artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this._artists.find((artist) => artist.id == id);

    if (!artist) {
      throw new NotFoundException();
    }

    if (updateArtistDto.name) artist.name = updateArtistDto.name;
    if (updateArtistDto.grammy != undefined) {
      artist.grammy = updateArtistDto.grammy;
    }

    return artist;
  }

  remove(id: string) {
    const index = this._artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.albumService.clearArtistId(id);
    this.trackService.clearArtistId(id);
    this.favoritesService.removeArtist(id);

    this._artists.splice(index, 1);

    return;
  }
}
