import { NextPage } from "next";
import { discApi } from "@/config/api-routes";
import Link from "next/link";
import routes from "@/config/routes";
import DebouncedInput from "@/components/debounced-input";

interface Props {
  searchParams?: {
    search: string;
  };
}

const Home: NextPage<Props> = async ({ searchParams }) => {
  const records = await discApi.listDiscs(searchParams?.search);

  const mappedRecords = records?.results.map((disc) => (
    <Link
      key={disc.id}
      href={routes.record(disc.id)}
      className="text-white border-b border-sky-200 p-2 border-solid hover:bg-sky-950"
    >
      {disc.title}
    </Link>
  ));

  return (
    <main className="flex min-h-screen flex-col pt-[64px] px-[10%]">
      <h1 className="h1 mt-4 mb-4">Look for Records</h1>
      <DebouncedInput />
      <div className="flex flex-col mt-4">{mappedRecords}</div>
    </main>
  );
};

export default Home;
