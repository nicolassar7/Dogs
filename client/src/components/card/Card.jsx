import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";


function Card({ dog }) {
    const { id, name, image, temperament, weight} = dog
  return (
    <div className={style.card}>
      <div className={style.title}>
        <h>{name}</h>
      </div>

      <div className={style.content}>
      <Link to={`/detail/${id}`}>
        <img src={image} alt="" />
      </Link>
        <div className={style.text}>
          <p>Temperament | {temperament.join(", ")}</p>
          <p>Weight | {weight} kg</p>
        </div>
      </div>
    </div>
  );
}

export default Card; 