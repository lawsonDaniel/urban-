"use client";
import { routes } from "@/common/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useMemo } from "react";
import SidebarLinkGroup from "./sidebar-group";
import { useCurrentBreakpoint } from "@/common/hooks/breakpoint";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { BiChevronDown } from "react-icons/bi";
import { activeLink } from "@/common/utils";

// import SidebarLinkGroup from './SidebarLinkGroup'

function Sidebar() {
  // const location = useLocation()
  // const { pathname } = location
  const pathname = usePathname();

  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [activeRoutes, setActiveRoutes] = useState<[{}]>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    console.log(showMenu);

    setShowMenu(!showMenu);
  };

  // const activeRoutes: any =
  const cookies = parseCookies();
  const storedUser = cookies.user ? JSON.parse(cookies.user) : null;
  console.log("user::::",storedUser)
  const userType = storedUser?.userType;

  useEffect(() => {
    userType && setActiveRoutes(routes?.DASHBOARD[userType]);
  }, [storedUser, userType]);

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = null;
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const memoizedSidebarExpanded = useMemo(
    () => sidebarExpanded,
    [sidebarExpanded]
  );

  const currentBreakpoint = useCurrentBreakpoint();
  const isLessThanLg = currentBreakpoint
    ? currentBreakpoint === "sm" || currentBreakpoint === "md"
    : false;

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // useEffect(() => {
  // 	// localStorage.setItem('sidebar-expanded', sidebarExpanded)
  // 	if (sidebarExpanded) {
  // 		document.getElementById('sidebar')?.classList.add('sidebar-expanded')
  // 	} else {
  // 		document.getElementById('sidebar')?.classList.remove('sidebar-expanded')
  // 	}
  // }, [])

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-primary z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        toggle
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar  shrink-0 bg-primary p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }
				${memoizedSidebarExpanded ? "w-[300px]" : "w-20"}
				
				`}
      >
        {/* Sidebar header */}
        {/* <div className='flex justify-between pr-3 sm:px-2'> */}
        {/* Close button */}
        {/* <button
						ref={trigger}
						className='lg:hidden text-slate-500 hover:text-slate-400'
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls='sidebar'
						aria-expanded={sidebarOpen}>
						<span className='sr-only'>Close sidebar</span>
						<svg
							className='w-6 h-6 fill-current'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
						</svg>
					</button> */}
        {/* Logo */}
        <div className="mt-16 mb-10 flex justify-center sm:px-2">
          <Link href="/" className="block">
            <Image
              src="/img/urban_logo.svg"
              alt="urban logo"
              width={140}
              height={60}
              priority
            />
          </Link>
        </div>
        {/* </div> */}

        {/* Links */}
        <div className="space-y-8">
          {/* <div>
						<h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
							<span
								className='hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6'
								aria-hidden='true'>
								•••
							</span>
							<span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
								Pages
							</span>
						</h3>
						<ul className='mt-3'></ul>
					</div> */}

          <ul className="p-4 flex flex-col items-center ">
            {activeRoutes?.map((route: any, index: any) => (
              // <Link href={route.path} key={index}>
              <li
                key={index}
                className={`${
                  activeLink(route.path, pathname)
                    ? "bg-white text-primary"
                    : "bg-primary_light text-white hover:bg-white hover:text-primary"
                }  mb-[22px] rounded-lg flex flex-col 
										 ${!route.children ? "justify-center " : "pt-5"}
										cursor-pointer 
									${memoizedSidebarExpanded ? " w-[222px] px-4 " : "w-10 items-center"}
									${show && route.children ? "h-36" : "h-16"}
									`}
                onClick={() => !route.children && router.push(route.path)}
              >
                {/* <div className={`flex items-center `}> */}
                <div
                  className={`flex w-full ${
                    memoizedSidebarExpanded
                      ? "justify-between"
                      : "justify-center"
                  } `}
                >
                  <div className="flex items-center">
                    <div className="stroke-primary hover:stroke-primary">
                      {route.icon(
                        activeLink(route.path, pathname)
                          ? "stroke-primary"
                          : "stroke-white "
                      )}
                    </div>
                    <div className="pl-2">
                      <p
                        className={`block 
												${memoizedSidebarExpanded ? "block " : "hidden"}
												`}
                      >
                        {route.title}
                      </p>
                      {show && (
                        <ul className={`text-[13px] mt-2}`}>
                          {route.children &&
                            // ts-ignore
                            route.children.map((item: any, index: any) => (
                              <li
                                key={index}
                                onClick={() => router.push(item.path)}
                                className="mt-2"
                              >
                                {item.title}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {route.children && (
                    <BiChevronDown
                      size={24}
                      onClick={() => setShow((prev) => !prev)}
                    />
                  )}
                </div>
                {/* </div> */}
              </li>
              // </Link>
            ))}
          </ul>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button
              onClick={() => setSidebarExpanded(!memoizedSidebarExpanded)}
            >
              {memoizedSidebarExpanded ? (
                <BsArrowBarLeft size="24" color="white" />
              ) : (
                <BsArrowBarRight size="24" color="white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
