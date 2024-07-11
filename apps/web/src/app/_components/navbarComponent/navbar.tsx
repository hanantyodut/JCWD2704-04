import Image from "next/image";
import Humburger from "./humburger";
import Link from "next/link";

export function NavbarToggler() {
  return (
    <nav className="w-full sticky top-0 z-50 ">
      <div className="w-full h-[80px]  rounded-md border border-transparent bg-white shadow-input px-4 py-2  md:px-6">
        <Navbar />
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <div className="w-full flex justify-between px-2 text-black h-full">
      <div className="h-full flex items-center justify-center gap-3">
        <div className="h-full relative aspect-[261/73]">
          <Link href="/">
            <Image src="/logoCA.png" alt="logo" fill />
          </Link>
        </div>
      </div>

      <Humburger />
    </div>
  );
}
