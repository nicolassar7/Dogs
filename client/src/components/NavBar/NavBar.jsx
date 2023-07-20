import React from "react";
import SortDog from "../SortDog/SortDog";
import Filter from "../Filter/Filter";
import style from "./NavBar.module.css";
import lupa from '../../assets/lupa.png'
import { Link } from "react-router-dom";


const NavBar = ({ handleChange, handleSubmit, setPage, searchString }) => {
    
  return ( 
    <div className={style.nav}>
        <div className={style.search}>
            <form onChange={handleChange}>
                <input type="text" placeholder={"Search"} value={searchString} />
                <button type="submit" onClick={handleSubmit}>ENTER</button>
                
            </form>
        </div>
        <Link to={`/createDog`} >
            <button>CREATE DOG</button>
        </Link>
        <label htmlFor="menu-toggle" className={style.menuBtn}>
            <span className={style.menuIcon}></span>
        </label>
        <label for='burger' className={style.burger}>
            <input type="checkbox" id="burger"  />
            <span></span>
            <span></span>
            <span></span>
            <ul className={style.menu}>
                <li><SortDog setPage={setPage} /></li>
                <li><Filter /></li>
            </ul>
        </label>
    </div>
  );
};

export default NavBar;
