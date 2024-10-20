import React, { useEffect, useState } from "react";
import { userMenus } from "../constants/userMenu";
import { adminMenus } from "../constants/adminMenu";
import MenuIcon from "./MenuIcon";
import { Link } from "react-router-dom";
import { garbageCollectorMenus } from "../constants/garbageCollecrtorMenu";

const CollapsibleNavbar = ({role}) => {
  const [open, setOpen] = useState(window.innerWidth >= 750);
  const Menus = role === 'admin' ? adminMenus : role === 'user' ? userMenus : role === 'garbage-collector' ? garbageCollectorMenus : [] ;
  
  return (
    <div
      className={`bg-gray-200 p-2 relative duration-300 ${
        open ? "w-52 md:w-72" : "w-0"
      }`}
    >
      <div
        className={`absolute cursor-pointer -right-3 top-24 w-7 border-gray-300 bg-inherit text-gray-400 border-2 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>

      <ul className="pt-0">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 ${
              Menu.gap ? "mt-9" : "mt-2"
            } ${index === 0 && "bg-light-white"}`}
          >
            <MenuIcon menuName={Menu.title}></MenuIcon>
            <Link to={`/${Menu.src}`}>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollapsibleNavbar;
