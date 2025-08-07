export default {
  token: '/api/token',
  categories: {
    // GET -> get a list of categories
    list: '/browse/categories',
    // GET -> get a category by ID
    category: (id: string) => `/browse/categories/${id}`,
  },
  player: {
    // GET -> get the current user's playback state
    // PUT -> transfer playback to a new device
    Playback: '/me/player',
    // GET -> get available playback devices
    devices: '/me/player/devices',
    // GET -> get the currently playing track
    currentTrack: '/me/player/currently-playing',
    // PUT -> start/resume playback
    startPlayback: '/me/player/play',
    // PUT -> pause playback
    pausePlayback: '/me/player/pause',
    // PUT -> skip to the next track
    nextTrack: '/me/player/next',
    // PUT -> skip to the previous track
    previousTrack: '/me/player/previous',
    // PUT -> seek to a position in the currently playing track
    seekPlayback: '/me/player/seek',
    // PUT -> set repeat mode for the current playback
    setRepeat: '/me/player/repeat',
    // PUT -> set the volume for the current playback
    setVolume: '/me/player/volume',
    // PUT -> toggle shuffle mode for the current playback
    toggleShuffle: '/me/player/shuffle',
    // GET -> get the playback queue
    queue: '/me/player/queue',
    // POST -> add a track to the playback queue
    addToQueue: '/me/player/queue',
    // GET -> get the current user's playback history
    playbackHistory: '/me/player/recently-played',
  },
  playlists: {
    create: '/playlists',
    // GET -> get a playlist by ID
    // PUT -> update a playlist
    playlist: (id: string) => `/playlists/${id}`,
    // GET -> get tracks in a playlist
    // PUT -> reorder tracks in a playlist
    // POST -> add a track to a playlist
    // DELETE -> remove a track from a playlist
    tracks: (id: string) => `/playlists/${id}/tracks`,
    // GET -> get a current user's playlists
    userPlaylists: '/me/playlists',
    // GET -> get a playlist's cover image
    coverImage: (id: string) => `/playlists/${id}/images`,
  },
  albums: {
    // GET -> get an album by ID
    getAlbum: (id: string) => `/albums/${id}`,
    // GET -> get multiple albums by IDs
    getAlbums: '/albums',
    // GET -> get tracks in an album
    tracks: (id: string) => `/albums/${id}/tracks`,
    // GET -> get user saved albums
    // POST -> save an album to user's library
    // DELETE -> remove an album from user's library
    userAlbums: '/me/albums',
    checkUserAlbums: '/me/albums/contains',
    newReleases: '/browse/new-releases',
  },
  // GET -> get a list of categories
  search: '/search',
  tracks: {
    // GET -> get a track by ID
    getTrack: (id: string) => `/tracks/${id}`,
    // GET -> get multiple tracks by IDs
    getTracks: '/tracks',
    // GET -> get user's saved tracks
    // PUT -> save a track to user's library
    // DELETE -> remove a track from user's library
    userTracks: '/me/tracks',
    // GET -> check if a user saved a track
    checkUserTracks: '/me/tracks/contains',
  },
  users: {
    // GET -> get a user's profile
    me: '/me',
    // GET -> get a user's top artists
    topArtists: '/me/top/artists',
    // GET -> get a user's top tracks
    topTracks: '/me/top/tracks',
    // GET -> get a user's profile by ID
    profile: (id: string) => `/users/${id}`,
    // PUT -> follow a playlist
    // DELETE -> unfollow a playlist
    playlists: (id: string) => `/playlists/${id}/followers`,
    // GET -> get a user's followed artists
    // PUT -> follow an artist
    // DELETE -> unfollow an artist
    artists: '/me/following',
    // GET -> check if a user follows an artist
    checkArtistFollow: `/me/following/contains`,
    // GET -> check if a user follows a playlist
    checkPlaylistFollow: (id: string) => `/playlists/${id}/followers/contains`,
  },
};
