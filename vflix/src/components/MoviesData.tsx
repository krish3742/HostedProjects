import { useAppSelector } from "@/store/hooks";

import MovieCategory from "./MovieCategory";

import Style from "./MoviesData.module.css";

export default function MoviesData() {
  const moviesData: any = useAppSelector((state) => state.movies.moviesData);
  return (
    <div className={Style.container}>
      <div className={Style.absolute}>
        {moviesData &&
          moviesData.map((movieCategory: any, index: number) => {
            return <MovieCategory movieCategory={movieCategory} key={index} />;
          })}
      </div>
    </div>
  );
}
