import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css"

function Landing ()  {
    return (
        <div className={style.Landing}>
            <h1 className={style.title}>DOGS</h1>
            <Link to='/home'>
                <button>ingresar</button>
            </Link>
        </div>
    )
}

export default Landing;