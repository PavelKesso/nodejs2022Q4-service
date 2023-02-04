import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private _albums: Album[] = [];

  @Inject(TrackService)
  public trackService: TrackService;

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(
      v4(),
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

    this._albums.push(album);

    return album;
  }

  findAll() {
    return this._albums;
  }

  findOne(id: string) {
    const album = this._albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this._albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    if (updateAlbumDto.name) album.name = updateAlbumDto.name;
    if (updateAlbumDto.year) album.year = updateAlbumDto.year;
    if (updateAlbumDto.artistId) album.artistId = updateAlbumDto.artistId;

    return album;
  }

  remove(id: string) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.trackService.clearAlbumId(id);
    //todo delete from favotites

    this._albums.splice(index, 1);

    return;
  }

  clearArtistId(id: string) {
    const albums = this._albums.filter((album) => album.artistId === id);

    albums.forEach((album) => {
      album.artistId = null;
    });
  }
}
