import { Link } from "react-router-dom";
import {MdOutlineWatchLater} from 'react-icons/md'
import msToTime from "../utils/constants";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const TrackData = ({ data, handler }) => {
  const { setPlayerId, setPlayerIdChanged } = useContext(PlayerContext);
  
  return (
    <ul className="flex flex-col gap-2 ">
      {data?.map((track, id) => {

        const totalDuration = msToTime(track.duration_ms);

        const children = (
          <>
            <li className="flex justify-between " key={id}>
              <div className="flex items-center gap-10">
                <p className="w-[2ch]">{id + 1}</p>
                <div>
                  <p className="font-bold">{track.name}</p>
                  <p className="text-slate-400">
                    {track.artists?.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
              <p className="text-slate-400">{totalDuration}</p>
            </li>
          </>
        );

        return (
          <Link key={id} onClick={()=>{
            setPlayerId(track.id)
            setPlayerIdChanged(true)
          }}>
            {children}
          </Link>
        );
      })}
    </ul>
  );
};
