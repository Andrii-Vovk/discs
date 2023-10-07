import { discApi } from "@/config/api-routes";
import type { NextPage } from "next";
import Image from "next/image";
import RecordPlayer from "./components/record-player";

interface Props {
  params: {
    slug: string;
  };
}

const Page: NextPage<Props> = async ({ params }) => {
  const record = await discApi.getRecordById(params.slug);

  const primaryImage = record?.images.find((image) => image.type === "primary") || record?.images[0];

  return (
    <main className="h-full min-h-screen bg-slate-900">
      <section id="hero" className="min-h-screen w-full">
        <RecordPlayer imageSrc={primaryImage?.uri || ""} recordTitle={record?.title || ""} />
      </section>
    </main>
  );
};

export default Page;
