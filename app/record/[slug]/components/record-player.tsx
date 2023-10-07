"use-client";

import Image from "next/image";

interface Props {
  imageSrc: string;
  recordTitle: string;
}

const RecordPlayer: React.FC<Props> = ({ imageSrc, recordTitle }) => {
  return (
    <div>
      <div className="relative w-[380px] h-[380px] mx-auto">
        <Image className="object-cover rounded" fill src={imageSrc} alt={recordTitle} />
      </div>
      <div className="record" />
    </div>
  );
};

export default RecordPlayer;
