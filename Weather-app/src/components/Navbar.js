import { useContext, useState, useEffect } from "react";

import { faCloud, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Context from "../store/Context";

import Style from "./Navbar.module.css";

function Navbar() {
  const context = useContext(Context);
  const [input, setInput] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleSearchClick = (e) => {
    e.preventDefault();
    context.setInput(input);
    context.setData({});
    context.setLoading(true);
  };
  useEffect(() => {
    if (navigator.geolocation && context.input === "Lucknow") {
      navigator.geolocation.getCurrentPosition((position) => {
        context.setInput(
          position.coords.latitude + "," + position.coords.longitude
        );
      });
    }
  }, []);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center sm:hidden">
              <div className={Style.brand}>
                <FontAwesomeIcon icon={faCloud} />
                <p>MeghDoot</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className={Style.navbar}>
                <div className={Style.navContainer}>
                  <div className={Style.brand}>
                    <FontAwesomeIcon icon={faCloud} />
                    <p>MeghDoot</p>
                  </div>
                  <form onSubmit={(e) => handleSearchClick(e)}>
                    <div className={Style.inputContainer}>
                      <div className={Style.iconContainer}>
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className={Style.icon}
                        />
                      </div>
                      <input
                        id="cityName"
                        placeholder="Search your city"
                        type="text"
                        className={Style.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      ></input>
                      <button className={Style.button} type="submit">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div className="sm:hidden" id="mobile-menu">
          <form onSubmit={(e) => handleSearchClick(e)}>
            <div className={Style.padding}>
              <div className={Style.inputContainer}>
                <div className={Style.iconContainer}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={Style.icon}
                  />
                </div>
                <input
                  id="cityName"
                  placeholder="Search your city"
                  type="text"
                  className={Style.input}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></input>
                <button className={Style.button} type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
