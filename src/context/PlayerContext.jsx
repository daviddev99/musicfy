import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState("");
  const [playerIdChanged, setPlayerIdChanged] = useState(false);
  return (
    <PlayerContext.Provider
      value={{ playerId, setPlayerId, playerIdChanged, setPlayerIdChanged }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
