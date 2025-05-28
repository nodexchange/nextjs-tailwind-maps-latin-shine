import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const config = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Latest News",
    path: "/latest-news",
  },
  {
    title: "Classes",
    path: "/classes",
  },
  {
    title: "Events",
    path: "/events",
  },
  {
    title: "Locations",
    path: "/location",
  },
  {
    title: "About Bachata",
    path: "/about-bachata",
  },
  {
    title: "About Salsa",
    path: "/about-salsa",
  },
  {
    title: "FAQ",
    path: "/faq",
  },
  {
    title: "Why Dance",
    path: "/why-dance",
  },
  {
    title: "Instructors",
    path: "/instructors",
  },
  {
    title: "Reserve",
    path: "/reserve",
  },
  {
    title: "Payments",
    path: "/payments",
  },
];

const NavLink = ({ title, path, isActive }) => (
  <div>
    {isActive ? (
      <h3 className="text-4xl font-semibold text-black">{title}</h3>
    ) : (
      <Link
        href={path}
        className="text-4xl font-semibold text-white cursor-pointer transition-colors hover:text-shineDark"
      >
        {title}
      </Link>
    )}
  </div>
);

const SideNav = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(true);
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowSidebar(false);
    }, 1000);
    // if (window.innerWidth < 768) {
    // }
    window.addEventListener("scroll", handleScroll);
    return function cleanupListener() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-[30px] top-[-5px] z-110 md:right-[45px] md:top-[-5px]"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <button
          className="fixed z-110 flex items-center cursor-pointer right-0 top-[6px] md:right-[15px] md:top-[5px]"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg
            fill={isScrolled ? "#ffffff" : "#bb0546"}
            viewBox="0 0 100 80"
            width="50"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0" width="50" height="5"></rect>
            <rect y="15" width="50" height="5"></rect>
            <rect y="30" width="50" height="5"></rect>
          </svg>
        </button>
      )}

      <div
        className={`top-0 right-0 w-full bg-shine-low-alpha p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        } sm:w-full md:w-[55vw] lg:w-[35vw]`}
      >
        <div className="mt-20">
          {config.map((item, id) => {
            return (
              <NavLink
                key={item.title}
                {...item}
                isActive={isActive(item.path)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideNav;
