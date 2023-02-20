import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  @InjectRepository(Artist) private readonly repository: Repository<Artist>;

  create(createArtistDto: CreateArtistDto) {
    const newUser = this.repository.create(createArtistDto);
    return this.repository.save(newUser);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const artist = await this.repository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.repository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException();
    }

    await this.repository.update(id, {
      name: updateArtistDto.name ?? artist.name,
      grammy: updateArtistDto.grammy ?? artist.grammy,
    });

    return this.repository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    const artist = await this.repository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException();
    }

    return this.repository.delete(id);
  }
}
