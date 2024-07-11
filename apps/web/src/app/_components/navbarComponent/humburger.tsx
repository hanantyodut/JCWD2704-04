"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/_lib/redux/hooks";
import { userDataAction } from "@/app/_lib/redux/slices/userData.slice";
import { useRouter } from "next/navigation";

export default function Humburger() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const userData = useAppSelector((s) => s.userData);
  const [burger, setBurger] = useState(false);
  function navbarLink(text: string, url: string) {
    return { text, url };
  }

  const hrefList = [
    navbarLink("LOWONGAN KERJA", "/lowonganKerjaya"),
    navbarLink("PERUSAHAAN", "/perusahaan"),
    navbarLink("Skill Assessment", "/skillAssessment"),

  ];
  const optionalHref = !userData?.id
    ? [navbarLink("Login", "/login"), navbarLink("Register", "/register")]
    : [];

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setBurger(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const dispatch = useAppDispatch();

  return (
    <div ref={menuRef} className={`flex flex-col items-end h-full w-max`}>
      <button
        className="md:hidden self-end h-full font-semibold  aspect-square relative flex justify-center items-center *:*:transition-all"
        onClick={() => setBurger(!burger)}
      >
        {!burger ? (
          <>
            {/* <Image src="/menu1.svg" alt="menu" width={30} height={30} /> */}
          </>
        ) : (
          <>Close </>
        )}
      </button>

      <ul
        className={`md:h-full items-center flex-col md:flex-row md:flex md:gap-5 md:static bg-gray-400 md:bg-transparent
        ${!burger ? "hidden" : "flex absolute top-[60px] right-0 rounded-lg "}`}
      >
        {hrefList.map((e, i) => (
          <li className="h-full w-full text-black font-semibold py-2" key={i}>
            <Link
              className={`w-full h-full text-end px-2 ${
                pathname == e.url ? "text-gray-200 bg-black rounded-lg pt" : ""
              } hover:text-gray-200 hover:bg-black flex justify-center items-center rounded-lg`}
              href={e.url}
              onClick={() => setBurger(false)}
            >
              <p className="w-full text-nowrap text-center">{e.text}</p>
            </Link>
          </li>
        ))}
        {optionalHref.map((e, i) => (
          <li className="h-full w-full text-black font-semibold py-2" key={i}>
            <Link
              className={`w-full h-full text-end px-2 ${
                pathname == e.url ? "text-gray-200 bg-black rounded-lg pt" : ""
              } hover:text-gray-200 hover:bg-black flex justify-center items-center rounded-lg`}
              href={e.url}
              onClick={() => setBurger(false)}
            >
              <p className="w-full text-nowrap text-center">{e.text}</p>
            </Link>
          </li>
        ))}
        {userData?.id && (
          <li>
            <button
              onClick={() => {
                if (confirm("sure for logout?")) {
                  dispatch(userDataAction.logout(null));
                  setBurger(false);
                  router.push("/");
                }
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
