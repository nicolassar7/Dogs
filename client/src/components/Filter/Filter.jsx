import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, tempFilter } from "../../redux/actions";
import style from './Filter.module.css';

function Filter() {

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const filterTemperament = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (!value) return;
    dispatch(tempFilter(value));
  };

  return (
    <div className={style.container}>
      <select onChange={filterTemperament}>
        <option value="all">Temperaments</option>
        {temperaments.map((tem) => (
          <option key={tem.id} value={tem.name}>
            {tem.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;