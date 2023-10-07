"use client";

import routes from "@/config/routes";
import Vinyl from "@/public/vinyl.png";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CurrentSongContext } from "../current-song-context";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const { title, isPlaying, setIsPlaying } = useContext(CurrentSongContext);

  const onPlayClick = () => {
    if (!title) return;

    setIsPlaying(!isPlaying);
  };

  const [isOpaque, setIsOpaque] = useState(false);

  // set isOpaque to true when the user scrolls down
  // and false when the user scrolls up

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        setIsOpaque(true);
      } else {
        setIsOpaque(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={twMerge(
        "z-10 px-[10%] py-4 flex justify-between items-center",
        "bg-transparent fixed top-0 left-0 right-0 duration-200",
        isOpaque && "bg-slate-950"
      )}
    >
      <Link href={routes.home} className="flex gap-3 items-center">
        <Image src={Vinyl} alt="Vinyl" className="whitewash object-contain" width={32} height={32} />
        <span className="header-link-main">Spinny</span>
      </Link>
      <div className="flex items-center gap-3">
        {title && (
          <div className="flex items-center gap-3">
            <span className="header-link">{title}</span>
            <button
              onClick={onPlayClick}
              className={twMerge("record-small relative hover:scale-[1.1] duration-200", isPlaying && "animate-spin")}
            />
            <span className="header-link">|</span>
          </div>
        )}
        <nav className="flex items-center gap-3">
          <Link href={routes.home} className="header-link">
            Discover
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
