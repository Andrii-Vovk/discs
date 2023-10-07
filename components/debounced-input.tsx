"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";
import { twMerge } from "tailwind-merge";

const DebouncedInput = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      router.push(`${pathname}?search=${searchTerm}`);
    }, 500),
    [pathname, router]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      className={twMerge(
        "rounded font-oswald bg-transparent outline-none border-sky-800 !active:border-sky-500",
        "border-solid border-2 duration-200",
        "px-3 py-4 text-white"
      )}
      onChange={handleChange}
    />
  );
};

export default DebouncedInput;
