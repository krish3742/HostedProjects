import axios from "axios";
import { useContext, useEffect } from "react";

import Context from "../store/Context";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import SearchedCity from "../components/SearchedCity";

function Home() {
  const context = useContext(Context);
  const input = context.input;
  const data = context.data;
  const loading = context.loading;
  const fetch = async () => {
    if (input.trim() && input !== "NpeUV00HVI") {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: input },
        headers: {
          "x-rapidapi-key":
            "4d1bd655e7msh5086aad4d2b3127p190718jsnfe55a3957a04",
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        context.setData(response.data);
        context.setLoading(false);
      } catch (error) {
        context.setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetch();
  }, [input, loading]);
  if (loading) {
    return <Loading />;
  }
  if (!Object.keys(data).length) {
    return <Error />;
  }
  return (
    <>
      <Navbar />
      <SearchedCity />
    </>
  );
}

export default Home;
