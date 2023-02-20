import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  @InjectRepository(Album) private readonly repository: Repository<Album>;

  create(createAlbumDto: CreateAlbumDto) {
    const newalbum = this.repository.create(createAlbumDto);
    return this.repository.save(newalbum);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const album = await this.repository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.repository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException();
    }

    await this.repository.update(id, {
      name: updateAlbumDto.name ?? album.name,
      year: updateAlbumDto.year ?? album.year,
    });

    return this.repository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    const album = await this.repository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException();
    }

    return this.repository.delete(id);
  }
}
