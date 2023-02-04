import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavoritesModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
