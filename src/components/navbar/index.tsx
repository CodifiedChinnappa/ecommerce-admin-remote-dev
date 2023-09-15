import { useState } from "react";
import { BiSolidBookOpen } from "react-icons/bi";

import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "PRODUCTS", link: "/add-product" },
    { name: "ACCOUNT", link: "/account-info" },
    { name: "CONTACT", link: "/" },
  ];
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const signOut = async () => {
    navigate("/login");
  };

  return (
    <div className="shadow-md">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <BiSolidBookOpen className="w-7 h-7 text-blue-600" />
          <span>Inscribe</span>
        </div>
        {/* Menu icon */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            return setOpen(!open);
          }}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(!open);
            }
          }}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <FaRegWindowClose /> : <FaBars />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map(link => {
            return (
              <li
                key={link.name}
                className="md:ml-8 md:my-0 my-7 font-semibold"
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            );
          })}
          <button
            type="button"
            className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
            onClick={signOut}
          >
            Log Out
          </button>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header;
