"use client";

import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import { toast } from "sonner";

interface Props {
  imageSrc: string;
  recordTitle: string;
}

const RecordPlayer: React.FC<Props> = ({ imageSrc, recordTitle }) => {
  // move record right, and the image left on hover
  const [spring, api] = useSpring(() => ({
    x: 0,
    config: {
      mass: 1,
      tension: 100,
      friction: 20,
    },
  }));

  const [recordSpring, recordApi] = useSpring(() => ({
    x: 0,
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

  return (
    <div className="relative">
      <div className="relative w-[380px] h-[380px] mx-auto">
        <animated.div
          className="relative w-[380px] h-[380px] mx-auto z-20"
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
          style={spring}
        >
          <Image className="object-cover rounded" fill src={imageSrc} alt={recordTitle} />
        </animated.div>
        <div className="absolute z-10 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
          <animated.div
            className="record"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            style={recordSpring}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordPlayer;
