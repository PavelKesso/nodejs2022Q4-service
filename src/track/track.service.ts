import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  @InjectRepository(Track) private readonly repository: Repository<Track>;

  create(createTrackDto: CreateTrackDto) {
    const instance = this.repository.create(createTrackDto);
    return this.repository.save(instance);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const track = await this.repository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.repository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException();
    }

    await this.repository.update(id, {
      name: updateTrackDto.name ?? track.name,
      albumId: updateTrackDto.albumId ?? track.albumId,
      artistId: updateTrackDto.artistId ?? track.artistId,
      duration: updateTrackDto.duration ?? track.duration,
    });

    return this.repository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    const track = await this.repository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException();
    }

    return this.repository.delete(id);
  }
}
