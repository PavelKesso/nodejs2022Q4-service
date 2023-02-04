import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Favorites } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  public favs: Favorites = new Favorites();
  @Inject(forwardRef(() => TrackService))
  public trackService: TrackService;
  @Inject(forwardRef(() => AlbumService))
  public albumService: AlbumService;
  @Inject(forwardRef(() => ArtistService))
  public artistService: ArtistService;

  async getAll() {
    return {
      artists: this.artistService
        .findAll()
        .filter((artist) => this.favs.artists.includes(artist.id)),
      albums: this.albumService
        .findAll()
        .filter((album) => this.favs.albums.includes(album.id)),
      tracks: this.trackService
        .findAll()
        .filter((track) => this.favs.tracks.includes(track.id)),
    };
  }

  async addTrack(id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    this.favs.tracks.push(id);
    return;
  }

  async removeTrack(id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    this.favs.tracks.splice(this.favs.tracks.indexOf(id), 1);
    return;
  }

  async addAlbum(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    this.favs.albums.push(id);
    return;
  }

  async removeAlbum(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    this.favs.albums.splice(this.favs.albums.indexOf(id), 1);
    return;
  }

  async addArtist(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.favs.artists.push(id);
    return;
  }

  async removeArtist(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.favs.artists.splice(this.favs.artists.indexOf(id), 1);
    return;
  }
}
