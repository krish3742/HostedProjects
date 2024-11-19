import axios from "axios";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMoviesData, setMoviesLoading } from "@/store/features/moviesSlice";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import MoviesData from "@/components/MoviesData";
import RandomMovie from "@/components/RandomMovie";

export default function Home() {
  const dispatch = useAppDispatch();
  const moviesData = useAppSelector((state) => state.movies.moviesData);
  const moviesLoading = useAppSelector((state) => state.movies.moviesLoading);
  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://movies-api14.p.rapidapi.com/home",
      headers: {
        "x-rapidapi-key": "4d1bd655e7msh5086aad4d2b3127p190718jsnfe55a3957a04",
        "x-rapidapi-host": "movies-api14.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      dispatch(setMoviesData(response.data));
      dispatch(setMoviesLoading(false));
    } catch (error) {
      dispatch(setMoviesLoading(false));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (moviesLoading) {
    return <Loader />;
  }
  if (!moviesData.length) {
    return <Error />;
  }
  return (
    <>
      <RandomMovie />
      <MoviesData />
    </>
  );
}
