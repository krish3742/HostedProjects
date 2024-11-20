import Style from "./LeftMovie.module.css";

export default function LeftMovie({
  movie,
  animation,
}: {
  movie: any;
  animation: string;
}) {
  const index = movie.length - 1;
  return (
    <div className={Style.container}>
      <img
        src={movie[index]?.poster_path}
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
