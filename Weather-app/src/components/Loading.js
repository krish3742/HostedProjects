import Navbar from "./Navbar";

import Style from "./Loading.module.css";

function Loading() {
  return (
    <>
      <Navbar />
      <div className={Style.container}>
        <div className={Style.bgImage} />
        <div className={Style.loadingContainer}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
