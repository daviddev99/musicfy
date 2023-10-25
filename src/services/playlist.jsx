import client from "../shared/spotify-client"

export const getPlaylistContent = async(id) => {
    const playlist = await client.getPlaylist(id)
    return playlist
}