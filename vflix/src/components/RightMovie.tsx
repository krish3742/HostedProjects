import Style from "./RightMovie.module.css";

export default function RightMovie({
  movie,
  animation,
}: {
  movie: any;
  animation: string;
}) {
  return (
    <div className={Style.container}>
      <img
        src={movie[0]?.poster_path}
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
