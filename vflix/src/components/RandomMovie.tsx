import { useAppSelector } from "@/store/hooks";

import Style from "./RandomMovie.module.css";

export default function RandomMovie() {
  const moviesData = useAppSelector((state) => state.movies.moviesData);
  const randomMovies: any =
    moviesData[Math.floor(Math.random() * moviesData.length)];
  const randomMovie: any =
    randomMovies?.movies[
      Math.floor(Math.random() * randomMovies.movies.length)
    ];
  return (
    <div className={Style.container}>
      <img src={randomMovie?.backdrop_path} className={Style.image}></img>
      <div className={Style.bottomleft}>
        <h1 className={Style.title}>
          {randomMovie.title.split(":")[0].split("-")[0]}
        </h1>
        <div className={Style.buttonsContainer}>
          <div className={Style.playbuttoncontainer}>
            <div className={Style.playicon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </div>
            <button className={Style.playbutton}>Play</button>
          </div>
          <div className={Style.infobuttoncontainer}>
            <div className={Style.infoicon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </div>
            <button className={Style.infobutton}>More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
}
