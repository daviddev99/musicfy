import { useEffect } from "react";
import client from "./shared/spotify-client";
import { Home } from "./components/Home";
import {  Routes, Route } from "react-router-dom";
import { Aside } from "./components/Aside";
import { Artist } from "./pages/Artist";
import { Album } from "./pages/Album";
import { Playlist } from "./pages/Playlist";

import { Search } from "./pages/Search";
import { Player } from "./components/Player";
import { PlayerContextProvider } from "./context/PlayerContext";

export const App = () => {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL , {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          `${import.meta.env.VITE_API_KEY}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          client.setAccessToken(data.access_token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PlayerContextProvider>
      <div id="app" className=" bg-black h-[100dvh] p-2 gap-2  text-white">
        <Aside />
        <main id="main" className="[grid-area:main] flex flex-col px-6 py-4 gap-2 bg-[#121212] rounded-lg flex-1 overflow-y-auto">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/album/:albumId" element={<Album />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
              <Route path="/artist/:artistId" element={<Artist />} />
              <Route path="/search/:query" element={<Search />} />
            </Routes>
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
};
