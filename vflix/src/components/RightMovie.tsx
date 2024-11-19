import Style from "./RightMovie.module.css";

export default function RightMovie({ movie }: { movie: any }) {
  return (
    <div className={Style.container}>
      <img src={movie[0]?.poster_path} className={Style.image}></img>
    </div>
  );
}
