"use client";

import CurrentSongProvider from "@/components/current-song-context";
import { PropsWithChildren } from "react";

const ClientBoot: React.FC<PropsWithChildren> = ({ children }) => {
  return <CurrentSongProvider>{children}</CurrentSongProvider>;
};

export default ClientBoot;
