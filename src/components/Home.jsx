import { IoIosArrowDropleftCircle } from "react-icons/io";
import useSWR from "swr";
import { getHomeContent } from "../services/home";
import { AlbumData } from "./AlbumData";
import { PlaylistData } from "./PlaylistData";
import { ArtistData } from "./ArtistData";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const Home = () => {
  const { data, error } = useSWR("home", () => getHomeContent(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if(!data) return <Loading/>

  if(error) return <Error/>

  console.log(data);
  return (
    <>
      <IoIosArrowDropleftCircle size={20} className="text-white" />
      <h4 className="text-2xl font-bold">Hello again...</h4>
      <AlbumData
        data={data?.albums?.albums?.map((item) => ({
          id: item.id,
          image: item.images[0].url,
          title: item.name,
        }))}
        handler={(id) => `album/${id}`}
      />
      <h4 className="text-2xl font-bold mt-8">Made for you</h4>
      <PlaylistData
        handler={(id) => `playlist/${id}`}
        data={data.featuredPlaylists.playlists.items.map((item) => ({
          id: item.id,
          title: item.name,
          owner: item.owner.display_name,
          image: item.images[0].url,
        }))}
      />
      <h4 className="text-2xl font-bold mt-8">Artists to discover </h4>
      <ArtistData
        handler={(id) => `artist/${id}`}
        data={data.artists.artists.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.images[0].url,
        }))}
      />
    </>
  );
};
