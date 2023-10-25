import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Aside = () => {
  const [query, setQuery] = useState("");

  return (
    <aside className="[grid-area:aside] flex flex-col text-zinc-500 flex-1 gap-2 bg-transparent overflow-hidden">
      <div className="relative overflow-hidden p-4 rounded-lg font-bold flex flex-col w-full bg-[#121212] h-fit">
        <Link to={"/"} className="">
          <h1 className="text-[#1ED760] text-4xl">
            Music<span className="text-white">Fy</span>
          </h1>
        </Link>
      </div>
      <div className="relative overflow-hidden p-4 rounded-lg font-bold flex flex-col w-full bg-[#121212] h-fit  gap-6">
        <div className="flex items-center w-full p-2 rounded-full border-2 border-zinc-500">
          <input
            maxLength={30}
            className="flex ml-2 gap-4 bg-transparent outline-none duration-150 w-full"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Drake, Bad Bunny..."
          />
          <Link to={`/search/${query}`}>
            <FaMagnifyingGlass size={20} />
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden p-4 rounded-lg font-bold flex flex-col w-full bg-[#121212] flex-1  gap-4">
        <div className="flex gap-4 hover:text-white duration-150">
          <BiLibrary size={25} />
          <p className="text-lg">Listened recently</p>
        </div>
        <ul className="flex flex-col text-white">
          <Link to={"/album/3lsdB3dY4odywNI42KV6D9"} className="flex gap-4 p-2 rounded-md hover:bg-zinc-800 cursor-pointer">
            <picture className="w-[48px]">
              <img
                src="https://i.scdn.co/image/ab67616d0000b273dce7a3fb14f5e841c0befbbf"
                className="aspect-square object-cover"
                alt=""
              />
            </picture>
            <div>
              <p>SEN2 KBRN VOL. 2</p>
              <p className="font-normal text-zinc-400">Eladio Carrion</p>
            </div>
          </Link>
          <Link to={"/album/0SoJvPHbKVhvmVJOp3kzp3"} className="flex gap-4 p-2 rounded-md hover:bg-zinc-800 cursor-pointer">
            <picture className="w-[48px]">
              <img
                src="https://i.scdn.co/image/ab67616d0000b2734cc96ed1e38fa517608c2fb0"
                className="aspect-square object-cover"
                alt=""
              />
            </picture>
            <div>
              <p>ESTRELLA</p>
              <p className="font-normal text-zinc-400">Mora</p>
            </div>
          </Link>
        </ul>
        <p className="flex items-center text-white gap-2">
          by David Abed{" "}
          <Link target="_blank" to="https://github.com/daviddev99">
            <AiFillGithub size={30} className="hover:text-zinc-500 duration-300" />
          </Link>{" "}
          <Link target="_blank" to={"https://linkedin.com/in/davidabeddev"}>
            <AiFillLinkedin className="hover:text-zinc-500 duration-300" size={30} />
          </Link>
        </p>
      </div>
    </aside>
  );
};
