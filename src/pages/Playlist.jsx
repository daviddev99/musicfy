import useSWR from "swr";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineEllipsis,
} from "react-icons/ai";
import { getPlaylistContent } from "../services/playlist";
import { TrackData } from "../components/TrackData";

export const Playlist = () => {
  const { playlistId } = useParams();

  const { data, error } = useSWR(`playlist-${playlistId}`, () =>
    getPlaylistContent(playlistId)
  );
  // console.log(data);

  if(!data) return <Loading/>

  if(error) return <Error/>
  return (
    <>
      <div className="flex gap-10 items-end justify-center md:justify-normal flex-wrap md:flex-nowrap">
        <img src={data?.images[0].url} className="w-56" alt="" />
        <div className="flex flex-col flex-wrap w-full">
          <p className="text-slate-400">{data?.description}</p>
          <h3 className="lg:text-[4vw] text-[6vw]  font-bold">{data?.name}</h3>
          <div className="flex gap-2 text-slate-400 font-bold">
            <Link className=" border-b-2 border-transparent hover:border-white">
              {data?.owner.display_name}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex gap-4 text-4xl items-center">
          <AiFillPlayCircle className="text-[#1ED760]" size={50} />
          <AiOutlineHeart className="text-slate-400 cursor-pointer hover:text-white hover:scale-105" />
          <AiOutlineEllipsis className="text-slate-400 cursor-pointer hover:text-white hover:scale-105" />
        </div>
        <TrackData
          data={data?.tracks.items.map((item) => ({
            id: item.track?.id,
            name: item.track?.name,
            artists: item.track?.artists,
            duration_ms: item.track?.duration_ms,
          }))}
          handler={"#"}
        />
      </div>
    </>
  );
};
