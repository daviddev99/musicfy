import { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import useSWR from "swr";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { getTrack } from "../services/track";

export const Player = () => {
  const { playerId, setPlayerIdChanged } = useContext(PlayerContext);

  const [isPaused, setIsPaused] = useState(!setPlayerIdChanged);
  const audioRef = useRef(null);
  const [mute, setMute] = useState(false);

  const { data, error } = useSWR(`track-${playerId}`, () => getTrack(playerId));

  const isLoading = !data;
  const isError = data && (error || !data?.preview_url);

  const handlePlay = () => {
    setIsPaused((prev) => !prev);
  };

  const handleMute = () => {
    const audio = audioRef.current;
    audio.muted = !mute;
    setMute(!mute);
  };

  useEffect(() => {
    if (isPaused) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(() => {
        setIsPaused(true);
      });
    }
  }, [isPaused]);

  useEffect(() => {
    setIsPaused(false);
  }, [playerId]);

  useEffect(() => {
    if (isError) {
      audioRef.current.src = "";
    }
    return () => {
      setIsPaused(false)
    };
  }, [isError]);

  return (
    <footer className="[grid-area:player] flex justify-between items-center  p-6 bg-[#121212] h-20 w-full rounded-lg text-black">
      <audio
        className="hidden"
        ref={audioRef}
        src={data?.preview_url}
        autoPlay={true}
      />
      <div className=" flex gap-4 items-center">
        <img src={data?.album.images[0].url} className="w-14" alt="" />
      </div>
      <div className="flex w-[300px] justify-center">
        <button
          onClick={() => handlePlay()}
          className="text-white text-center"
        >
          {isError ? (
            <span className="text-red-500">!</span>
          ) : isPaused ? (
            <AiFillPlayCircle size={45} />
          ) : (
            <AiFillPauseCircle size={45} />
          )}
        </button>
      </div>
      <button className="text-white " onClick={() => handleMute()}>
        {mute ? (
          <BsFillVolumeMuteFill size={25} />
        ) : (
          <BsFillVolumeUpFill size={25} />
        )}
      </button>
    </footer>
  );
};
