import { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "../ui/button";
import { UserDropDown } from "./UserDropDown";

const Navbar = () => {
  const { login, register, user, isAuthenticated } = useKindeAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const loginButton = () => {
    login();
  };

  const registerButton = () => {
    register();
  };

  return (
    <>
      <div>
        <nav className="bg-gradient-to-r from-green-400 to-blue-500 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-lg rounded-b-10">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="https://google.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                MEDICARE
              </span>
            </a>

            {/* Desktop Buttons */}
            <div className="hidden md:flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {isAuthenticated ? (
                <div className="z-50 flex items-center gap-x-3 text-white">
                  <p>Welcome {user?.given_name}!</p>
                  <UserDropDown
                    email={user?.email as string}
                    name={user?.given_name as string}
                    userImage={
                      user?.picture ??
                      `https://avatar.vercel.sh/${user?.given_name}`
                    }
                  />
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={loginButton}
                    className="text-white bg-mainGreen hover:bg-mainGreenHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={registerButton}
                    variant={"outline"}
                    className="text-white border-white hover:bg-white hover:text-blue-600 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            {/* Collapsible Menu */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } w-full md:flex md:w-auto md:order-1`}
              id="navbar-sticky"
            >
              {/* <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent"> */}
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-300 md:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-300 md:p-0"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-300 md:p-0"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-300 md:p-0"
                  >
                    Contact
                  </a>
                </li>

                {/* Mobile Buttons */}
                {!isAuthenticated ? (
                  <li className="mt-2 md:hidden">
                    <Button
                      onClick={loginButton}
                      className="w-full text-white bg-mainGreen hover:bg-mainGreenHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={registerButton}
                      variant={"outline"}
                      className="w-full mt-2 text-white border-white hover:bg-white hover:text-blue-600 font-medium rounded-lg text-sm py-2"
                    >
                      Get Started
                    </Button>
                  </li>
                ) : (
                  <li className="mt-2 md:hidden text-white">
                    <div className="flex items-center gap-x-3">
                      <p>Welcome {user?.given_name}!</p>
                      <UserDropDown
                        email={user?.email as string}
                        name={user?.given_name as string}
                        userImage={
                          user?.picture ??
                          `https://avatar.vercel.sh/${user?.given_name}`
                        }
                      />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
