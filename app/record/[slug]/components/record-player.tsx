"use client";

import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  imageSrc: string;
  recordTitle: string;
}

const RecordPlayer: React.FC<Props> = ({ imageSrc, recordTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
        setIsPlaying(!isPlaying);
        setButtonDisabled(false);
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
          <Image className="object-cover rounded" fill src={imageSrc} alt={recordTitle} />
        </animated.div>
        <div className="absolute z-[1] top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
          <animated.div className="record" style={recordSpring} />
        </div>
      </button>
    </div>
  );
};

export default RecordPlayer;
