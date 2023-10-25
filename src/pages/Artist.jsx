import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getArtistInfo } from "../services/artist";
import { PlaylistData } from "../components/PlaylistData";
import { ArtistData } from "../components/ArtistData";
import { TrackData } from "../components/TrackData";
import { Loading } from "../components/Loading";
import {Error} from '../components/Error'

export const Artist = () => {
  const { artistId } = useParams();

  const { data, error } = useSWR(`artist-${artistId}`, () =>
    getArtistInfo(artistId)
  );

  const formatFollowers = (followers) => {
    if (followers > 0 && followers < 1000) {
      return followers + "followers";
    } else if (followers >= 1000 && followers < 1000000) {
      return (followers / 1000).toFixed(0) + "K Followers";
    } else if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + "M Followers";
    }
  };

  const formatedFollowers = formatFollowers(data?.artist.followers.total);

  if(!data) return <Loading/>

  if(error) return <Error/>

  return (
    <>
      <div className="flex mb-5 gap-10 md:justify-normal justify-center items-center md:flex-nowrap flex-wrap">
        <img
          src={data?.artist.images[0].url}
          className="w-52 aspect-square object-cover rounded-full"
          alt=""
        />
        <div className="flex flex-col w-full ">
          <h4 className="font-bold text-4xl">{data?.artist.name}</h4>
          <p className="text-slate-400 mt-4">{formatedFollowers}</p>
          <p className="text-slate-400 ">Popularity: {data?.artist.popularity}/100</p>
        </div>
      </div>
      <h5 className="text-2xl font-bold">Top Tracks</h5>
      <TrackData
          data={data?.topTracks.tracks.map((item) => ({
            id: item.id,
            name: item.name,
            artists: item.artists,
            duration_ms: item.duration_ms,
          })).slice(0, 5)}
        />
      <h5 className="text-2xl font-bold">Albums</h5>
      <PlaylistData
        handler={(id) => `/album/${id}`}
        data={data?.albums.items.map((item) => ({
          id: item.id,
          image: item.images[0].url,
          title: item.name,
          owner: item.artists.map((artist) => artist.name).join(", "),
        }))}
      />
      <h5 className="text-2xl font-bold">Related Artists</h5>
      <ArtistData
        handler={(id) => `/artist/${id}`}
        data={data?.relatedArtists.artists.slice(0, 6).map((item) => ({
          id: item.id,
          image: item.images[0].url,
          name: item.name,
        }))}
      />
    </>
  );
};
