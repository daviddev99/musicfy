import client from "../shared/spotify-client"

export const getHomeContent = async () => {
    const [
      albums,
      featuredPlaylists,
      artists,
    ] = await Promise.all([
      client.getAlbums(['4PWBTB6NYSKQwfo79I3prg','5tPDpnIZLtftbejuG6BllH','0QLDQG7Jx78rEUDW03IhHC','5lJqux7orBlA1QzyiBGti1', '7pijRxgRaBirPz6wDaJIp9', '2JwUsV3QP7FMWx1Fzt6dHQ']),
      client.getFeaturedPlaylists({ country: "AR", limit: 6 }),
      client.getArtists(['0Q8NcsJwoCbZOHHW63su5S', '5XJDexmWFLWOkjOEjOVX3e', '14pVkFUHDL207LzLHtSA18', '1Yox196W7bzVNZI7RBaPnf', '3jOstUTkEu2JkjvRdBA5Gu', '1bAftSH8umNcGZ0uyV7LMg']),
    ]);
  
    return {
      albums,
      featuredPlaylists,
      artists,
    };
  };