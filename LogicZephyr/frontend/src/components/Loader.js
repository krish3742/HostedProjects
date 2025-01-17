import Style from "./Loader.module.css";

function Loader() {
  return (
    <div className={Style.container}>
      <span className={Style.loader}></span>
    </div>
  );
}

export default Loader;
