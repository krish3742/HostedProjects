import { useEffect, useState } from "react";

import Movie from "./Movie";
import LeftMovie from "./LeftMovie";
import RightMovie from "./RightMovie";

import Style from "./MovieCategory.module.css";

export default function MovieCategory({
  movieCategory,
}: {
  movieCategory: any;
}) {
  const [page, setPage] = useState(0);
  const [enableLeftButton, setEnableLeftButton] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const visibleMovies = Math.floor(screenWidth / 225);
  const moviesArray = [];
  for (let i = 0; i < movieCategory.movies.length; i++) {
    const temp = [];
    for (let j = 1; j <= visibleMovies; j++) {
      temp.push(movieCategory.movies[i]);
      if (j != visibleMovies) {
        i++;
      } else if (i > movieCategory.movies.length) {
        break;
      }
    }
    moviesArray.push(temp);
  }
  const handleLeftClickButton = (e: any) => {
    e.preventDefault();
    setPage((value: number) => {
      if (value === 0) {
        return moviesArray.length - 1;
      }
      return value - 1;
    });
  };
  const handleRightClickButton = (e: any) => {
    e.preventDefault();
    setEnableLeftButton(true);
    setPage((value: number) => {
      if (value === moviesArray.length - 1) {
        return 0;
      }
      return value + 1;
    });
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  return (
    <div className={Style.container}>
      <div className={Style.leftdiv}></div>
      <div className={Style.movieCategoryContainer}>
        <h1 className={Style.title}>{movieCategory.title}</h1>
        <div className={Style.moviesContainer}>
          {moviesArray[page].map((movie: any, index: number) => {
            if (index < visibleMovies) {
              return <Movie movie={movie} key={index} />;
            }
          })}
          {enableLeftButton && (
            <>
              <button
                className={Style.leftbutton}
                onClick={(e) => handleLeftClickButton(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="50"
                  fill="white"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </button>
              <LeftMovie
                movie={
                  page
                    ? moviesArray[page - 1]
                    : moviesArray[moviesArray.length - 1]
                }
              />
            </>
          )}
          <button
            className={Style.rightbutton}
            onClick={(e) => handleRightClickButton(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="50"
              fill="white"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
          <RightMovie
            movie={
              page === moviesArray.length - 1
                ? moviesArray[0]
                : moviesArray[page + 1]
            }
          />
        </div>
      </div>
      <div className={Style.rightdiv}></div>
    </div>
  );
}
