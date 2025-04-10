"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "News",
    href: "/news",
  },
];

const Navbar = ({ children }) => {
  const [session, setSession] = useState(null);
  console.log(session);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session="));

    if (cookies) {
      try {
        const cookieValue = decodeURIComponent(cookies.split("=")[1]);
        const parsedSession = JSON.parse(cookieValue);
        setSession(parsedSession);
      } catch (err) {
        console.error("Failed to parse session cookie", err);
      }
    }
  }, []);

  const pathName = usePathname();

  const blackList = ["/login", "/admin"];

  const isBlackList = blackList.includes(pathName);

  if (isBlackList) return <div>{children}</div>;

  return (
    <header>
      <nav className='sticky top-0 left-0 py-6 w-full z-[999] flex justify-between items-center px-5 lg:px-[10%] shadow-sm'>
        <h1 className='text-2xl font-[400] text-green-500'>
          <span className='text-red-700 font-bold italic text-3xl lg:text-4xl'>
            T
          </span>
          ech
          <span className='text-violet-700 font-bold italic text-3xl lg:text-4xl'>
            B
          </span>
          logs
        </h1>
        <div className='flex items-center justify-center gap-8'>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              className={`${
                pathName === link.href
                  ? "border-b-2 border-violet-800 font-medium"
                  : ""
              } `}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href='/login'
            className='bg-violet-700 text-white font-medium py-3 px-8 rounded'
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
