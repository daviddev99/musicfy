import { getSearchContent } from "../services/search"
import useSWR from "swr"
import { useParams } from "react-router-dom"
import { ArtistData } from "../components/ArtistData"
import { PlaylistData } from "../components/PlaylistData"
import { AlbumData } from "../components/AlbumData"
import { TrackData } from "../components/TrackData"
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"


export const Search = () => {
    const {query} = useParams()

    const {data, error} = useSWR(`search-${query}`, () => getSearchContent(query))

    if(!data) return <Loading/>

    if(error) return <Error/>

  return (
    <div className="[grid-area:main] flex flex-col px-6 py-4 gap-6 bg-[#121212] rounded-lg flex-1 overflow-y-auto text-white">
        <h2 className="text-3xl">Search results for: {query}</h2>
        <h4 className="text-2xl">Tracks</h4>
        <TrackData
          data={data?.tracks.items.map((item) => ({
            id: item.id,
            name: item.name,
            artists: item.artists,
            duration_ms: item.duration_ms,
          }))}
        />
        <h4 className="text-2xl">Artists</h4>
        <ArtistData data={data?.artists.items.map((item) => ({
            id: item.id,
            image: item.images[0]?.url,
            name: item.name
        }))} handler={(id)=> `/artist/${id}`}/>
        <h4 className="text-2xl">Playlists</h4>
        <PlaylistData data={data?.playlists.items.map((item) => ({
            id: item.id,
            image: item.images[0].url,
            title: item.name,
            owner: item.owner.display_name
        }))} handler={(id) => `/playlist/${id}`}/>
        <h4 className="text-2xl">Albums</h4>
        <AlbumData data={data?.albums.items.map((item) => ({
            id: item.id,
            title: item.name,
            image: item.images[0].url
        }))} handler={(id) => `/album/${id}`}/>
    </div>
  )
}


