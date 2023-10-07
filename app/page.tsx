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
      className="border-b border-gray-200 p-2 border-solid hover:bg-gray-100"
    >
      {disc.title}
    </Link>
  ));

  return (
    <main className="flex min-h-screen flex-col">
      <h1>Discs</h1>
      <DebouncedInput />
      <div className="flex flex-col">{mappedRecords}</div>
    </main>
  );
};

export default Home;
