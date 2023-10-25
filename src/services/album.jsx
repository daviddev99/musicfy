import client from "../shared/spotify-client"

export const getAlbumInfo = async(id) => {
  const album = await client.getAlbum(id)
  return album
}
