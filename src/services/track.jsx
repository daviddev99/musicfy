import client from "../shared/spotify-client"

export const getTrack = async(id) => {
    const track = client.getTrack(id)
    return track
}