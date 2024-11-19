import Style from "./LeftMovie.module.css";

export default function LeftMovie({ movie }: { movie: any }) {
  const index = movie.length - 1;
  return (
    <div className={Style.container}>
      <img src={movie[index]?.poster_path} className={Style.image}></img>
    </div>
  );
}
