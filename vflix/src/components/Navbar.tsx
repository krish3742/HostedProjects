import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { setInput } from "@/store/features/searchSlice";

import Style from "./Navbar.module.css";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [scroll, setScroll] = useState(true);
  const [search, setSearch] = useState(false);
  const [firstBg, setFirstBg] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [browseMenu, setBrowseMenu] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [profileMenu, setProfileMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        setScroll(false);
        setFirstBg(false);
      } else {
        setScroll(true);
      }
    });
  }, []);
  return (
    <>
      <nav
        className={
          scroll
            ? firstBg
              ? Style.navTransparent
              : Style.navTransparentAnimation
            : Style.navBlack
        }
        onMouseLeave={() => setSearch(false)}
      >
        <div className={Style.menu} onClick={() => setMobileMenu(!mobileMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="white"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
        <div className={Style.watchflix}>
          <a href="/">WatchFlix</a>
        </div>
        <div className={Style.browseContainer}>
          <div className={Style.browse} onMouseOver={() => setBrowseMenu(true)}>
            <h1>Browse</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
          {browseMenu && (
            <div className={Style.browseMenuContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              <div className={Style.browseMenu}>
                <a className={Style.link} href="/">
                  Home
                </a>
                <a className={Style.link} href="/">
                  TV Shows
                </a>
                <a className={Style.link} href="/">
                  Movies
                </a>
                <a className={Style.link} href="/">
                  New & Popular
                </a>
                <a className={Style.link} href="/">
                  My List
                </a>
                <a className={Style.link} href="/">
                  Genre
                </a>
              </div>
            </div>
          )}
        </div>
        <div className={Style.options}>
          <a className={Style.link} href="/">
            Home
          </a>
          <a className={Style.link} href="/">
            TV Shows
          </a>
          <a className={Style.link} href="/">
            Movies
          </a>
          <a className={Style.link} href="/">
            New & Popular
          </a>
          <a className={Style.link} href="/">
            My List
          </a>
          <a className={Style.link} href="/">
            Genre
          </a>
        </div>
        <div className={Style.features}>
          {search ? (
            <div className={Style.inputContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <input
                  className={Style.input}
                  type="text"
                  placeholder="Movies, TV shows"
                  onChange={(e) => dispatch(setInput(e.target.value))}
                />
              </form>
            </div>
          ) : (
            <button onClick={() => setSearch(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="white"
                className="bi bi-search cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          )}
          <div className={Style.notificationcontainer}>
            <div
              className={Style.notification}
              onMouseOver={() => setNotification(true)}
              onMouseOut={() => setNotification(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="white"
                className="bi bi-bell cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
            </div>
            {notification && (
              <div
                className={Style.notificationpopup}
                onMouseOver={() => setNotification(true)}
                onMouseOut={() => setNotification(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                <div className={Style.notificationMenu}>
                  <h2>No recent notifications</h2>
                </div>
              </div>
            )}
          </div>
          <div className={Style.profileMenuContainer}>
            <div
              className={Style.profilecontainer}
              onMouseOver={() => setProfileMenu(true)}
              onMouseOut={() => setProfileMenu(false)}
              onMouseLeave={() => setFirstRender(false)}
            >
              <div className={Style.profile}>
                <svg
                  version="1.1"
                  viewBox="0 0 900 900"
                  width="36"
                  height="36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    transform="translate(0)"
                    d="m0 0h900v900h-900z"
                    fill="#268CE9"
                  />
                  <path
                    transform="translate(770,585)"
                    d="m0 0 9 2 6 4 5 6 2 5v11l-6 8-11 7-23 12-17 8-24 9-24 8-28 7-28 5-35 4-14 1h-36l-28-3-24-4-26-6-36-12-15-6-21-10-12-8-6-8-1-9 4-10 7-7 7-3 8 1 20 8 21 10 27 10 26 7 27 5 19 2h48l20-2 29-5 25-6 32-10 27-11 18-8 16-8z"
                    fill="#FFFFFE"
                  />
                  <path
                    transform="translate(189,312)"
                    d="m0 0h19l15 5 11 8 8 9 6 12 2 8v17l-3 10-5 10-5 7-10 8-11 5-12 3h-9l-14-3-12-6-9-8-7-11-4-13-1-6v-11l3-11 6-12 8-9 10-7z"
                    fill="#FFFFFE"
                  />
                  <path
                    transform="translate(731,312)"
                    d="m0 0h19l13 4 10 6 7 6 6 9 5 12 1 4v18l-4 13-7 11-8 8-10 6-7 3-5 1h-20l-12-4-10-6-5-5-7-9-4-9-2-8v-20l5-14 9-12h2v-2l11-7 9-4z"
                    fill="#FFFFFE"
                  />
                </svg>
              </div>
              {profileMenu ? (
                <div className={Style.profileupicon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </div>
              ) : (
                <div className={firstRender ? "" : Style.profiledownicon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              )}
            </div>
            {profileMenu && (
              <div
                className={Style.profilepopup}
                onMouseOver={() => setProfileMenu(true)}
                onMouseOut={() => setProfileMenu(false)}
              >
                <div className={Style.profilepopupicon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </div>
                <div className={Style.profileMenu}>
                  <div className={Style.profilefeatures}>
                    <div className={Style.flex}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                      <h2 className={Style.profileOptions}>Manage Profiles</h2>
                    </div>
                    <div className={Style.flex}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-people"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                      </svg>
                      <h2 className={Style.profileOptions}>Transfer Profile</h2>
                    </div>
                    <div className={Style.flex}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                      </svg>
                      <h2 className={Style.profileOptions}>Account</h2>
                    </div>
                    <div className={Style.flex}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-question-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
                      </svg>
                      <h2 className={Style.profileOptions}>Help Centre</h2>
                    </div>
                  </div>
                  <div className={Style.line}></div>
                  <div>
                    <h2 className={Style.profileOptions}>
                      Sign out of Netflix
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {mobileMenu && (
          <div className={Style.mobilemenu}>
            <a className={Style.link} href="/">
              Home
            </a>
            <a className={Style.link} href="/">
              TV Shows
            </a>
            <a className={Style.link} href="/">
              Movies
            </a>
            <a className={Style.link} href="/">
              New & Popular
            </a>
            <a className={Style.link} href="/">
              My List
            </a>
            <a className={Style.link} href="/">
              Thrillers
            </a>
            <a className={Style.link} href="/">
              Action
            </a>
            <a className={Style.link} href="/">
              Anime
            </a>
            <a className={Style.link} href="/">
              Comedies
            </a>
            <a className={Style.link} href="/">
              Fantasy
            </a>
            <a className={Style.link} href="/">
              Sci-Fi
            </a>
            <a className={Style.link} href="/">
              Horror
            </a>
            <a className={Style.link} href="/">
              Romance
            </a>
            <a className={Style.link} href="/">
              English Films
            </a>
            <a className={Style.link} href="/">
              Dramas
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
