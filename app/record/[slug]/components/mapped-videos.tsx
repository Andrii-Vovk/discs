"use client";

import { animated, useSpring } from "@react-spring/web";
import { useContext, useState } from "react";
import { CurrentSongContext } from "@/components/current-song-context";
import { DiscogsVideo } from "@/types/discogs";
import { twMerge } from "tailwind-merge";

interface Props {
  videos: DiscogsVideo[];
  id: string;
}

const MappedVideos: React.FC<Props> = ({ videos, id }) => {
  const { setSong, setIsPlaying, isPlaying, title } = useContext(CurrentSongContext);

  const mappedVideos = videos.map((video) => (
    <button
      className={twMerge(
        "w-[380px] font-poppins text-white hover:text-sky-500",
        "text-start flex justify-between items-center",
        isPlaying && title === video.title && "text-sky-500"
      )}
      key={video.uri}
      onClick={() => {
        if (isPlaying && title === video.title) {
          setIsPlaying(false);

          return;
        }
        setSong(video.uri, video.title, id);
        setIsPlaying(true);
      }}
    >
      {video.title}
      {isPlaying && title === video.title && <div className="record-small relative animate-spin" />}
    </button>
  ));

  return (
    <div className="relative flex flex-col">
      <div className="h4">Samples:</div>
      {mappedVideos}
    </div>
  );
};

export default MappedVideos;
