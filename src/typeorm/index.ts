import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Favorites } from './favorities.entity';
import { Track } from './track.entity';
import { User } from './user.entity';

const entities = [User, Artist, Album, Track, Favorites];

export { User, Artist, Album, Track, Favorites };
export default entities;
