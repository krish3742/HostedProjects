import axios from "axios";
import { useEffect } from "react";

import Style from "./Home.module.css";

export default function Home() {
  const fetch = async () => {
    const options = {
      method: "GET",
      url: "https://ott-details.p.rapidapi.com/advancedsearch",
      params: {
        genre: "Comedy",
        language: "hindi",
        type: "movie",
        sort: "latest",
      },
      headers: {
        "x-rapidapi-key": "4d1bd655e7msh5086aad4d2b3127p190718jsnfe55a3957a04",
        "x-rapidapi-host": "ott-details.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div className={Style.container}></div>
    </>
  );
}
