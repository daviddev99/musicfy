import { Link } from "react-router-dom";

export const ArtistData = ({ data, handler }) => {
  return (
    <ul className="w-full flex flex-wrap mt-4 gap-4">
      {data?.map((item) => {
        const children = (
          <>
            <img
              src={item.image}
              alt=""
              className=" object-cover rounded-full aspect-square"
            />
            <div className="text-center">
              <p className="font-bold">{item.name}</p>
            </div>
          </>
        );

        return (
          <Link
            key={item.id}
            className="w-48 gap-4 flex flex-col p-4  bg-zinc-500/5 duration-200 hover:bg-zinc-500/20 focus:bg-zinc-500/20 rounded-xl cursor-pointer overflow-hidden"
            to={handler(item.id)}
          >
            {children}
          </Link>
        );
      })}
    </ul>
  );
};
