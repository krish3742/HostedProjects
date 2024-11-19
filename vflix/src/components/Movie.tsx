import Style from "./Movie.module.css";

export default function Movie({ movie }: { movie: any }) {
  return (
    <div className={Style.container}>
      <img src={movie?.poster_path} className={Style.image}></img>
    </div>
  );
}
