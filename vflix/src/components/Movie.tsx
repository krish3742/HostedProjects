import Style from "./Movie.module.css";

export default function Movie({
  movie,
  animation,
}: {
  movie: any;
  animation: string;
}) {
  return (
    <div className={Style.container}>
      <img
        src={movie?.poster_path}
        className={
          animation === "none"
            ? Style.image
            : animation === "left"
            ? Style.leftanimation
            : Style.rightanimation
        }
      ></img>
    </div>
  );
}
