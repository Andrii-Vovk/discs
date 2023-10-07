"use client";

import { DiscogsTrack } from "@/types/discogs";

interface Props {
  tracklist?: DiscogsTrack[];
}

const MappedTracklist: React.FC<Props> = ({ tracklist }) => {
  const tracksByPosition = tracklist?.reduce((acc, track) => {
    const position = track.position;

    if (!acc[position]) {
      acc[position] = [];
    }

    acc[position].push(track);

    return acc;
  }, {} as Record<string, DiscogsTrack[]>);

  return (
    <div className="flex flex-col gap-5">
      {Object.entries(tracksByPosition || {}).map(([position, tracks]) => (
        <div key={position} className="flex flex-col gap-5">
          <h3 className="h4">{position}</h3>
          {tracks.map((track) => (
            <div key={track.title}>
              <h4 className="subtitle">{track.title}</h4>
              <p className="p text-stone-200">{track.duration}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MappedTracklist;
