import React, { useState, useEffect } from "react";
import validationDog from "../validation/validation";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import style from "./Form.module.css"; // Importing styles from the first code snippet

const initialDog = {
  name: "",
  life_span: "",
  heightMin: "",
  heightMax: "",
  weightMin: "",
  weightMax: "",
  temperaments: [],
};

function CreateDog() {
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState(initialDog);
  const [disabler, setDisabler] = useState(true);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    if (disabler) {
      setDisabler(false);
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validationDog({ ...input, [e.target.name]: e.target.value })
    );
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleChangeDogs = (e) => {
    const temperament = JSON.parse(e.target.value);
    if (input.temperaments.includes(temperament)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments.filter((t) => t !== temperament)],
      });
      setErrors(
        validationDog({
          ...input,
          temperaments: [
            ...input.temperaments.filter((t) => t !== temperament),
          ],
        })
      );
    } else {
      setInput({
        ...input,
        temperaments: [...input.temperaments, temperament],
      });
      setErrors(
        validationDog({
          ...input,
          temperaments: [...input.temperaments, temperament],
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.entries(errors).length) {
      const body = {
        name: input.name,
        height: `${input.heightMin} - ${input.heightMax}`,
        weight: `${input.weightMin} - ${input.weightMax}`,
        life_span: input.life_span,
        temperament: input.temperaments
      }
      const response = await axios.post("http://localhost:3001/dogs", body);
      if (response.data.message === "Dog successfully created") {
        history.push(`/details/${response.data.new_dog.id}`);
      }
    }
  };


  return (
    <div className={style.create}>
      <form onSubmit={handleSubmit} className={style["form-create"]}>
        <section className={style["create-info"]}>
          <div>
            <label> Name</label>
            <input
              onChange={handleChange}
              value={input.name}
              name="name"
              className={style["input-create"]}
            />
            {errors.name ? <label>{errors.name}</label> : <label>&nbsp;</label>}
          </div>
          <div>
            <label> Life_span </label>
            <input
              onChange={handleChange}
              value={input.life_span}
              type="number"
              name="life_span"
              className={style["input-create"]}
            />
            {errors.life_span ? (
              <label>{errors.life_span}</label>
            ) : (
              <label>&nbsp;</label>
            )}
          </div>
          <div>
            <label> HeightMin</label>
            <input
              onChange={handleChange}
              value={input.heightMin}
              type="number"
              name="heightMin"
              className={style["input-create"]}
            />
            {errors.heightMin ? (
              <label>{errors.heightMin}</label>
            ) : (
              <label>&nbsp;</label>
            )}
          </div>
          <div>
            <label> HeightMax</label>
            <input
              onChange={handleChange}
              value={input.heightMax}
              type="number"
              name="heightMax"
              className={style["input-create"]}
            />
            {errors.heightMax ? (
              <label>{errors.heightMax}</label>
            ) : (
              <label>&nbsp;</label>
            )}
          </div>
          <div>
            <label> WeightMin</label>
            <input
              onChange={handleChange}
              value={input.weightMin}
              type="number"
              name="weightMin"
              className={style["input-create"]}
            />
            {errors.weightMin ? (
              <label>{errors.weightMin}</label>
            ) : (
              <label>&nbsp;</label>
            )}
          </div>
          <div>
            <label> WeightMax</label>
            <input
              onChange={handleChange}
              value={input.weightMax}
              type="number"
              name="weightMax"
              className={style["input-create"]}
            />
            {errors.weightMax ? (
              <label>{errors.weightMax}</label>
            ) : (
              <label>&nbsp;</label>
            )}
          </div>
        </section>

        <div className={style["temperaments-checkbox"]}>
          <label> Temperament:</label>
          {errors.temperaments ? (
            <label>{errors.temperaments}</label>
          ) : (
            <label>&nbsp;</label>
          )}
          <div className={style["check"]}>
            {temperaments?.map((t) => {
              return (
                <div key={t.id}>
                  <label>{t.name}:</label>
                  <input
                    onChange={handleChangeDogs}
                    value={`${t.id}`}
                    type="checkbox"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style["buttons-create"]}>
          <input
            disabled={disabler || Object.entries(errors).length ? true : false}
            value="Create"
            type="submit"
            className={style["button"]}
          />
          <Link to={`/home`}>
            <button className={style["button"]}>Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateDog;