"use client";

import { DiscogsImage } from "@/types/discogs";
import Image from "next/image";
import Masonry from "react-masonry-css";

interface Props {
  images?: DiscogsImage[];
}

const Gallery: React.FC<Props> = ({ images }) => {
  if (!images) return null;

  return (
    <div className="flex flex-col gap-5">
      {images?.map((image) => (
        <div key={image.uri} className="relative">
          <Image className="w-full h-auto" src={image.uri} alt={image.type} width={0} height={0} sizes="100vw" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
