import { useState } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    {
      title: "Dashboard",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/dashboard",
    },
    {
      title: "Inbox",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/dashboard",
    },
    {
      title: "Brand",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "catalog/brands",
      gap: true,
    },
    {
      title: "Category",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/catalog/category",
    },
    {
      title: "Products",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/catalog/products",
    },
    {
      title: "Add Product",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/catalog/products/add-new",
    },
    {
      title: "Files ",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/dashboard",
      gap: true,
    },
    {
      title: "Setting",
      icon: <BiSolidDashboard className="text-xl text-blue-700" />,
      path: "/dashboard",
    },
  ];

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <button
        type="button"
        className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white border-dark-purple
    border-2 rounded-full text-center ${!open && "rotate-180"}`}
        onClick={() => {
          return setOpen(!open);
        }}
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        <BsArrowLeftRight className="p-1" />
      </button>
      <div className="flex gap-x-4 items-center">
        {/* <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt="seller"
        /> */}
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Designer
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => {
          return (
            <li
              key={menu.title}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link
                to={menu.path}
                className={`flex items-center justify-start flex-1 gap-3 ${
                  isActive(menu.path) ? "active" : ""
                }`}
                key={menu.title}
              >
                {menu.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
