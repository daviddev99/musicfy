import useSWR from "swr";
import { getAlbumInfo } from "../services/album";
import { Link, useParams } from "react-router-dom";
import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineEllipsis,
} from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { TrackData } from "../components/TrackData";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export const Album = () => {
  const { albumId } = useParams();

  const { data, error } = useSWR(`album-${albumId}`, () =>
    getAlbumInfo(albumId)
  );

  if(!data) return <Loading/>

  if(error) return <Error/>


  return (
    <>
      <div className="flex justify-center md:justify-normal gap-5 md:gap-10 flex-wrap items-end md:flex-nowrap">
        <img src={data?.images[0].url} className="w-56" alt="" />
        <div className="flex flex-col flex-wrap w-full truncate ">
          <p className="text-slate-400 hidden md:block">{data?.album_type}</p>
          <h3 className="md:text-[4vw] text-[6vw] leading-snug text-ellipsis font-bold">{data?.name}</h3>
          <div className="flex md:flex-col  gap-2 text-slate-400 font-bold">
            <Link
              className=" hover:text-white"
              to={`/artist/${data?.artists[0].id}`}
            >
              {data?.artists[0].name}
            </Link>
            <p>{data?.release_date.slice(0, 4)}</p>
            <p className="hidden lg:block">Total tracks: {data?.total_tracks}</p>
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
            id: item.id,
            name: item.name,
            artists: item.artists,
            duration_ms: item.duration_ms,
          }))}
        />
      </div>
    </>
  );
};
