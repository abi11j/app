import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../hooks/useAuthContext";

function NavBar() {
  const { user } = useAuthContext();
  const nav_links = [
    { href: "/", label: "Home" },
    { href: "/tasks", label: "Tasks" },
    { href: "/tasks/new", label: "New Task" },
  ];
  const location = useLocation();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="border-b">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-[65px]">
        <div className="flex gap-10">
          <h1 className="font-medium text-[25px]">
            <Link to="/">TaskFroge</Link>
          </h1>
          {user && (
            <ul className="flex gap-5 items-center">
              {nav_links.map((link) => (
                <li
                  key={link.label}
                  className={`hover:text-zinc-800 transition-colors ${
                    location.pathname === link.href
                      ? "text-black"
                      : "text-zinc-500"
                  }`}
                >
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <p>{user.username}</p>{" "}
              <button
                onClick={handleClick}
                className="py-2 px-4 border border-zinc-300 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> <Link to="/singup">Sing up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
