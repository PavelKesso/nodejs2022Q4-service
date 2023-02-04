import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [forwardRef(() => FavoritesModule)],
  exports: [TrackService],
})
export class TrackModule {}
