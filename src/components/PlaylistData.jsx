import { Link } from "react-router-dom";

export const PlaylistData = ({ data, handler }) => {
  return (
    <ul className="w-full flex flex-wrap mt-4 gap-4">
      {data?.map((item) => {
        const children = (
          <>
            <img
              src={item.image}
              alt=""
              className=" object-cover rounded-lg aspect-square"
            />
            <div className="">
              <p className="font-bold truncate">{item.title}</p>
              <p className="text-slate-400">{item.owner}</p>
            </div>
          </>
        );

        return (
          <Link
            key={item.id}
            className="w-48 gap-4 flex flex-col p-4 duration-200 bg-zinc-500/5 hover:bg-zinc-500/20 focus:bg-zinc-500/20 rounded-xl cursor-pointer overflow-hidden"
            to={handler(item.id)}
          >
            {children}
          </Link>
        );
      })}
    </ul>
  );
};
