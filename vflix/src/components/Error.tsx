import Style from "./Error.module.css";

export default function Error() {
  return (
    <div className={Style.error}>
      <h1 className={Style.message}>You have reached monthly limit!!</h1>
    </div>
  );
}
