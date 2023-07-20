import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from './Detail.module.css';

function Detail() {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();

    useEffect(() => {
      dispatch(getDetails(id));
    }, [dispatch, id]);

    // Verificar si details es undefined o no tiene la propiedad 'name'
    if (!details || !details.name) {
      return <div>Loading...</div>;
    }

    return (
        <div className={style.detail}>
            <div className={style.content}>
                <img src={details.image} alt="" />
                <div className={style.container}>
                    <h2 className={style.title}>{details.name.toUpperCase()}</h2>
                    <div className={style.text}>
                        <p>ID | {details.id}</p>
                        <p>height | {details.height}</p>
                        <p>weight | {details.weight}</p>
                        <p>life_span | {details.life_span}</p>
                        <p>temperament | {details.temperament?.map((t) => t).join(", ")}</p>
                    </div>
                </div>
            </div>
            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>
    );
}
  
  export default Detail;