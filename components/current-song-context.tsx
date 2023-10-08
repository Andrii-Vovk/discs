"use client";

import React, { PropsWithChildren } from "react";

import ReactPlayer from "react-player";

interface CurrentSongContextType {
  recordId: string;
  title: string;
  isPlaying: boolean;
  setSong: (url: string, title: string, recordId: string) => void;
  setIsPlaying: (val: boolean) => void;
}

export const CurrentSongContext = React.createContext<CurrentSongContextType>({
  recordId: "",
  title: "",
  setIsPlaying: () => {},
  setSong: () => {},
  isPlaying: false,
});

const CurrentSongProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [recordId, setRecordId] = React.useState("");
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [isPlaying, setIsVideoPlaying] = React.useState(false);
  const [url, setUrl] = React.useState("");

  return (
    <CurrentSongContext.Provider
      value={{
        recordId,
        title: currentTitle,
        isPlaying,
        setSong: (url, title, recordId) => {
          setCurrentTitle(title);
          setUrl(url);
          setIsVideoPlaying(true);
          setRecordId(recordId);
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
