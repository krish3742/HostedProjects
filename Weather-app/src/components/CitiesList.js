import { useContext } from "react";

import Context from "../store/Context";

import Style from "./CitiesList.module.css";

function CitiesList() {
  const context = useContext(Context);
  const list = context.citiesList;
  const handleCityClick = (city, e) => {
    e.preventDefault();
    context.setInput(city);
    context.setCitiesList([]);
    context.setData({});
    context.setLoading(true);
  };
  if (context.cityLoading) {
    return (
      <div className={Style.visibleContainer}>
        <div className={Style.loadingContainer}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={
        list.length !== 0 ? Style.visibleContainer : Style.hiddenContainer
      }
    >
      {!!list &&
        list.map((city) => {
          return (
            <div
              key={city.id}
              className={Style.dataContainer}
              onClick={(e) => handleCityClick(city.name, e)}
            >
              <h1 className={Style.city}>{city.name}</h1>
              <h3 className={Style.details}>
                {city.state_name}, {city.country_name}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default CitiesList;
