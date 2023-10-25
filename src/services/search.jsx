import client from "../shared/spotify-client"

export const getSearchContent = async(q) => {
    const result = await client.search(q, ["track", "artist", "album" , "playlist"], {limit: 6})
    return result
}