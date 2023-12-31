import { discApi } from "@/config/api-routes";
import type { NextPage } from "next";
import Image from "next/image";
import RecordPlayer from "./components/record-player";
import MappedVideos from "./components/mapped-videos";
import MappedProps from "./components/mapped-props";
import Masonry from "react-masonry-css";
import Gallery from "./components/gallery";
import MappedTracklist from "./components/mapped-tracklist";

interface Props {
  params: {
    slug: string;
  };
}

const Page: NextPage<Props> = async ({ params }) => {
  const record = await discApi.getRecordById(params.slug);

  const formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

  const formattedArtists = formatter.format(record?.artists?.map((artist) => artist.name) || []);

  const primaryImage = record?.images?.find((image) => image.type === "primary") || record?.images?.[0];

  const video = record?.videos?.[0];

  const vinylProps = { ...record, ...(record?.formats?.[0] && { vinyl_info: record?.formats?.[0].descriptions }) };

  return (
    <main className="h-full min-h-screen bg-slate-900 pb-12 pt-[64px] px-[10%]">
      <section id="hero" className="relative min-h-screen w-full flex justify-between mt-16">
        <div className="flex-[0_1_50%]">
          <h1 className="h1 mb-2">{record?.title}</h1>
          <h2 className="h3 mb-7 pb-7 border-b border-sky-800 border-solid">{formattedArtists || "Author Unknown"}</h2>
          <MappedProps params={vinylProps} />
          <h3 className="h4 my-7 pt-7 border-t border-sky-800 border-solid">Track list:</h3>
          <MappedTracklist tracklist={record?.tracklist} />
          <h3 className="h4 my-7 pt-7 border-t border-sky-800 border-solid">Gallery:</h3>
          <Gallery images={record?.images} />
        </div>
        <div className="flex flex-col gap-6 self-baseline sticky top-20">
          <RecordPlayer
            imageSrc={primaryImage?.uri || ""}
            recordTitle={video?.title || ""}
            id={record?.id?.toString() || ""}
            video={video?.uri || ""}
          />
          <MappedVideos videos={record?.videos || []} id={record?.id?.toString() || ""} />
        </div>
      </section>
    </main>
  );
};

export default Page;
