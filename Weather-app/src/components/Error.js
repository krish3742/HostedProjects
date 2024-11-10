import Navbar from "./Navbar";

import Style from "./Error.module.css";

function Error() {
  return (
    <>
      <Navbar />
      <div className={Style.container}>
        <h1 className={Style.error}>No such city found!!</h1>
      </div>
    </>
  );
}

export default Error;
