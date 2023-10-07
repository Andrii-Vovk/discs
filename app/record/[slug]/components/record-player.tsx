"use client";

import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { CurrentSongContext } from "@/components/current-song-context";
import { twMerge } from "tailwind-merge";
import { title } from "process";

interface Props {
  imageSrc: string;
  recordTitle: string;
  video: string;
}

const RecordPlayer: React.FC<Props> = ({ imageSrc, recordTitle, video }) => {
  const { setSong, setIsPlaying, isPlaying: isVideoPlaying, title: videoTitle } = useContext(CurrentSongContext);

  const [isPlaying, setIsCurrPlaying] = useState(isVideoPlaying && videoTitle === recordTitle);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [spring, api] = useSpring(() => ({
    x: 0,
    zIndex: 2,
    config: {
      mass: 1,
      tension: 100,
      friction: 20,
    },
  }));

  const [recordSpring, recordApi] = useSpring(() => ({
    x: 0,
    rotate: 0,
    zIndex: 1,
    config: {
      mass: 1,
      tension: 100,
      friction: 20,
    },
  }));

  const handleHover = () => {
    api.start({
      x: -90,
    });
    recordApi.start({
      x: 90,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      x: 0,
    });
    recordApi.start({
      x: 0,
    });
  };

  const handleButtonClick = () => {
    if (!video) {
      toast.error("No video found for this record");

      return;
    }

    setButtonDisabled(true);
    api.start({
      to: [
        {
          x: -200,
          zIndex: isPlaying ? 2 : 1,
        },
        {
          x: 0,
        },
      ],
    });

    recordApi.start({
      to: [
        {
          x: 200,
          zIndex: isPlaying ? 1 : 2,
        },
        {
          x: 0,
        },
      ],
      onRest: () => {
        const isNowPlaying = isPlaying;

        setIsCurrPlaying(!isNowPlaying);
        setButtonDisabled(false);

        if (!isNowPlaying) {
          setSong(video, recordTitle);
        }

        setIsPlaying(!isNowPlaying);
      },
    });
  };

  return (
    <div className="relative">
      <button
        className="relative block w-[380px] h-[380px] mx-auto"
        onClick={handleButtonClick}
        disabled={buttonDisabled}
        onMouseEnter={!isPlaying ? handleHover : undefined}
        onMouseLeave={!isPlaying ? handleMouseLeave : undefined}
      >
        <animated.div className="relative w-[380px] h-[380px] mx-auto z-[2]" style={spring}>
          {imageSrc ? (
            <Image className="object-cover rounded" fill src={imageSrc} alt={recordTitle} />
          ) : (
            <div
              className={twMerge(
                "w-full h-full rounded bg-slate-600 flex items-center",
                "justify-center flex-col text-white font-poppins text-lg"
              )}
            >
              No <br /> Cover <br /> Available
            </div>
          )}
        </animated.div>
        <div className="absolute z-[1] top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
          <animated.div className={twMerge("record z-[1]", isPlaying && "spin-45-rpm z-[2]")} style={recordSpring} />
        </div>
      </button>
    </div>
  );
};

export default RecordPlayer;
