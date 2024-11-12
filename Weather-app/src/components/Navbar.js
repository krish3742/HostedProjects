import { useContext, useState, useEffect } from "react";
import axios from "axios";

import { faCloud, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Context from "../store/Context";

import Style from "./Navbar.module.css";
import CitiesList from "./CitiesList";

function Navbar() {
  const context = useContext(Context);
  const list = context.citiesList;
  const [input, setInput] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (input.trim()) {
      context.setInput(input.trim());
      context.setData({});
      context.setLoading(true);
    }
  };
  const citiesList = async () => {
    const options = {
      method: "GET",
      url: "https://city-and-state-search-api.p.rapidapi.com/cities/search",
      params: { q: input.trim() },
      headers: {
        "x-rapidapi-key": "4d1bd655e7msh5086aad4d2b3127p190718jsnfe55a3957a04",
        "x-rapidapi-host": "city-and-state-search-api.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const result = response.data;
      const valid = result.filter((city) => {
        return city.name.toLowerCase().startsWith(input.trim().toLowerCase());
      });
      context.setCitiesList(valid);
      context.setCityLoading(false);
    } catch (error) {
      context.setCitiesList([]);
      context.setCityLoading(false);
    }
  };
  useEffect(() => {
    if (navigator.geolocation && context.input === "NpeUV00HVI") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          context.setInput(
            position.coords.latitude + "," + position.coords.longitude
          );
        },
        (error) => {
          context.setInput("Lucknow");
        }
      );
    } else if (!navigator.geolocation) {
      context.setInput("Lucknow");
    } else if (input.trim()) {
      context.setCityLoading(true);
      citiesList();
    } else if (!input) {
      context.setCitiesList([]);
    }
  }, [input]);
  return (
    <>
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
                        <div
                          className={
                            list.length !== 0 || context.cityLoading
                              ? Style.iconContainer
                              : Style.borderIconContainer
                          }
                        >
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={Style.icon}
                          />
                        </div>
                        <div className={Style.relative}>
                          <input
                            id="cityName"
                            placeholder="Search your city"
                            type="text"
                            className={
                              list.length !== 0 || context.cityLoading
                                ? Style.input
                                : Style.borderInput
                            }
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          ></input>
                          <CitiesList />
                        </div>
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
                  <div
                    className={
                      list.length !== 0 || context.cityLoading
                        ? Style.iconContainer
                        : Style.borderIconContainer
                    }
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className={Style.icon}
                    />
                  </div>
                  <div className={Style.relative}>
                    <input
                      id="cityName"
                      placeholder="Search your city"
                      type="text"
                      className={
                        list.length !== 0 || context.cityLoading
                          ? Style.input
                          : Style.borderInput
                      }
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <CitiesList />
                  </div>
                  <button className={Style.button} type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
