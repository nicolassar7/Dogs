import { useSelector, useDispatch } from "react-redux";
import { sortDog } from "../../redux/actions";

import style from "./SortDog.module.css";

function SortDog() {
  const dispatch = useDispatch();
  const  sortBy  = useSelector((state) => state.dogs);

  const handleSort = (e) => {
    
    dispatch(sortDog(e.target.name));
  };

  return (
    <div className={style.sort}>
      <div className={style.az}>
        <h3 className={style.title}>FILTER</h3>
        <p>BY A-Z:</p>
        {sortBy.length > 1 && (
          <button name="aToZ" onClick={handleSort} className="button">
            &#10607; A-Z
          </button>
        )}
        {sortBy.length > 1 && (
          <button name="zToA" onClick={handleSort} className="button">
            &#10607; Z-A
          </button>
        )}
      </div>
      <div className={style.weight}>
        <p>BY WEIGHT:</p>
        {sortBy.length > 1 && (
          <button name="weightDesc" onClick={handleSort} className="button">
            &#8643;
          </button>
        )}
        {sortBy.length > 1 && (
          <button name="weightAsc" onClick={handleSort} className="button">
            &#8639; 
          </button>
        )}
      </div>
      
    </div>
  );
}

export default SortDog;
