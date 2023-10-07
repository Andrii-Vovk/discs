import routes from "@/config/routes";
import Vinyl from "@/public/vinyl.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-[10%] py-4 flex justify-between items-center bg-transparent fixed top-0 left-0 right-0">
      <Link href={routes.home} className="flex gap-3 items-center">
        <Image src={Vinyl} alt="Vinyl" className="whitewash object-contain" width={32} height={32} />
        <span className="header-link-main">Spinny</span>
      </Link>
      <div className="flex items-center gap-3">
        <div className="record-small relative" />
        <nav className='flex items-center gap-3'>
          <span className="header-link">|</span>
          <Link href={routes.home} className="header-link">
            Discover
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
