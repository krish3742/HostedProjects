import { useContext } from "react";

import Context from "../store/Context";

import Style from "./SearchedCity.module.css";

function SearchedCity() {
  const context = useContext(Context);
  const data = context.data;
  const timeStamp = new Date();
  const hour =
    timeStamp.getHours() > 12
      ? timeStamp.getHours() - 12
      : timeStamp.getHours();
  const hours = hour < 10 ? "0" + hour : hour;
  const minutes =
    timeStamp.getMinutes() < 10
      ? "0" + timeStamp.getMinutes()
      : timeStamp.getMinutes();
  const zone = timeStamp.getHours() > 12 ? " PM" : " AM";
  const time = hours + ":" + minutes + zone;
  return (
    <div className={Style.container}>
      <div className={Style.bgImage} />
      <div className={Style.top}>
        <div className={Style.dataContainer}>
          <div className={Style.headingContainer}>
            <h4 className={Style.heading}>
              {data?.location?.name ? data?.location?.name + ", " : ""}
              {data?.location?.region ? data?.location?.region + ", " : ""}
              {data?.location?.country}
            </h4>
            <h2>{time}</h2>
          </div>
          <div className={Style.line}></div>
          <div className={Style.detailedData}>
            <div className={Style.iconData}>
              <img
                src={data?.current?.condition?.icon}
                alt="icon"
                className={Style.icon}
              ></img>
              <div className={Style.tempDataContainer}>
                <div className={Style.tempContainer}>
                  <h1 className={Style.temp}>
                    {Math.round(data?.current?.temp_c)}°
                  </h1>
                  <h2 className={Style.celsius}>C</h2>
                </div>
                <h1>RealFeel {Math.round(data?.current?.feelslike_c)}°</h1>
              </div>
            </div>
            <div className={Style.moreData}>
              <div className={Style.flex}>
                <h5>Wind</h5>
                <h5>
                  {data?.current?.wind_dir}{" "}
                  {Math.round(data?.current?.wind_kph)}
                  km/h
                </h5>
              </div>
              <div className={Style.line}></div>
              <div className={Style.flex}>
                <h5>Wind Gusts</h5>
                <h5>
                  {Math.round(data?.current?.gust_kph)}
                  km/h
                </h5>
              </div>
              <div className={Style.line}></div>
              <div className={Style.flex}>
                <h5>Humidity</h5>
                <h5>{data?.current?.humidity}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.dataContainer}>
          <div className={Style.padding}>
            <div className={Style.detailedData}>
              <div className={Style.moredata}>
                <div className={Style.flex}>
                  <h5>Cloud</h5>
                  <h5>{data?.current?.condition?.text}</h5>
                </div>
                <div className={Style.line}></div>
                <div className={Style.flex}>
                  <h5>Dew Point</h5>
                  <h5>{Math.round(data?.current?.dewpoint_c)}° C</h5>
                </div>
                <div className={Style.line}></div>
                <div className={Style.flex}>
                  <h5>Heat Index</h5>
                  <h5>{data?.current?.heatindex_c}° C</h5>
                </div>
              </div>
              <div className={Style.moredata}>
                <div className={Style.hiddenLine}></div>
                <div className={Style.flex}>
                  <h5>Pressure</h5>
                  <h5>{data?.current?.pressure_mb} mb</h5>
                </div>
                <div className={Style.line}></div>
                <div className={Style.flex}>
                  <h5>Visibility</h5>
                  <h5>{Math.round(data?.current?.vis_km)} km</h5>
                </div>
                <div className={Style.line}></div>
                <div className={Style.flex}>
                  <h5>Wind Chill</h5>
                  <h5>{data?.current?.windchill_c}° C</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedCity;
