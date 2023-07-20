const { Temperament } = require("../db");
require("dotenv").config();
const axios = require('axios');
const { api_key } = process.env;


const getTemperaments = async (req, res) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);
    const temperaments = response.data.map((data) => data.temperament);
    let dataTemperament = temperaments.join().split(",");
    dataTemperament = dataTemperament.map((el) => el.trim());
    const uniqueTemperament = [...new Set(dataTemperament)];
    uniqueTemperament.forEach((data) => {
      if (data !== "") {
        Temperament.findOrCreate({ where: { name: data } });
      }
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getTemperaments;