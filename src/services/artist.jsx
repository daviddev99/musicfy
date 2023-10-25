import client from "../shared/spotify-client"

export const getArtistInfo = async(id) => {
    const [artist, topTracks, albums, relatedArtists] = await Promise.all([
        client.getArtist(id),
        client.getArtistTopTracks(id, "AR"),
        client.getArtistAlbums(id, {limit: 6}),
        client.getArtistRelatedArtists(id, {limit: 6})
    ])
    return {artist,topTracks,albums,relatedArtists}
}