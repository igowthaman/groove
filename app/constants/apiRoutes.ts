export default {
  token: '/api/token',
  users: {
    me: 'v1/me',
    topArtists: 'v1/me/top/artists',
    topTracks: 'v1/me/top/tracks',
    profile: (id: string) => `v1/users/${id}`,
  }
};
