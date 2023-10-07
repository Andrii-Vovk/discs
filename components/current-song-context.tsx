"use client";

import React, { PropsWithChildren } from "react";

import ReactPlayer from "react-player";

interface CurrentSongContextType {
  title: string;
  isPlaying: boolean;
  setSong: (url: string, title: string) => void;
  setIsPlaying: (val: boolean) => void;
}

export const CurrentSongContext = React.createContext<CurrentSongContextType>({
  title: "",
  setIsPlaying: () => {},
  setSong: () => {},
  isPlaying: false,
});

const CurrentSongProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [isPlaying, setIsVideoPlaying] = React.useState(false);
  const [url, setUrl] = React.useState("");

  return (
    <CurrentSongContext.Provider
      value={{
        title: currentTitle,
        isPlaying,
        setSong: (url, title) => {
          setCurrentTitle(title);
          setUrl(url);
          setIsVideoPlaying(true);
        },
        setIsPlaying: (val: boolean) => {
          setIsVideoPlaying(val);
        },
      }}
    >
      {children}
      {url && (
        <ReactPlayer
          width={0}
          height={0}
          url={url}
          playing={isPlaying}
          onEnded={() => setIsVideoPlaying(false)}
          stopOnUnmount
          pip={false}
        />
      )}
    </CurrentSongContext.Provider>
  );
};

export default CurrentSongProvider;
