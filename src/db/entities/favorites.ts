export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavoritesEntity implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(artists: string[], albums: string[], tracks: string[]) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
