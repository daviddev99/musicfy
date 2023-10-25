import { Link } from "react-router-dom";

// export const AlbumData = ({ data, handler }) => {
//   return (
//     <div>
//       <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
//         {data?.map((item) => {
//           <Link
//             className="w-full gap-6 flex items-center bg-zinc-500/30 hover:bg-zinc-500/50 focus:bg-zinc-500/50 rounded-xl cursor-pointer overflow-hidden"
//             to={handler(item.id)}
//           >
//             <img
//               src={item.image}
//               alt=""
//               className="w-20 object-cover aspect-square"
//             />
//             <p className="font-bold">{item.title}</p>
//           </Link>;
//         })}
//       </ul>
//     </div>
//   );
// };


export const AlbumData = ({ data, handler }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
      {data?.map((item) => {
        const children = (
          <>
            <img
              src={item.image}
              alt=""
              className="w-20 object-cover aspect-square"
            />
            <p className="font-bold truncate">{item.title}</p>
          </>
        );

        return (
            <Link key={item.id}
            className="w-full gap-6 duration-200 flex items-center bg-zinc-500/30 hover:bg-zinc-500/50 focus:bg-zinc-500/50 rounded-xl cursor-pointer overflow-hidden"
            to={handler(item.id)}
          >
            {children}
          </Link>
        );
      })}
    </div>
  );
};

