import React from "react";
import style from "./Cards.module.css";
import Card from "../card/Card";

function Cards({ dogs }) {

  return (
    <div className={style.cards}>
      {dogs?.map((dog) => (
        <Card key={dog.id} dog={dog} /> 
      ))}
    </div>
  );
}

export default Cards;