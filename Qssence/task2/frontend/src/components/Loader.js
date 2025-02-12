import Style from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={Style.container}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Loader;
