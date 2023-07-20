const { Op } = require('sequelize');
const axios = require('axios');
const { api_key } = process.env;
const { Temperament, Dog } = require('../db');

module.exports = async (req, res) => {
  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    try {
      const rawDbSearchByName = await Dog.findAll({
        attributes: ['id', 'image', 'name', 'weight'],
        include: [
          {
            model: Temperament,
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Usar Op.iLike para búsqueda case-insensitive
          },
        },
      });

      const dbSearchByName = rawDbSearchByName.map((d) => ({
        id: d.dataValues.id,
        name: d.dataValues.name,
        weight: d.dataValues.weight,
        image: d.dataValues.image,
        temperament: d.dataValues.temperaments.map((t) => t.name),
      }));

      if (dbSearchByName.length > 0) {
        return res.status(200).json(dbSearchByName);
      }

      const allResponse = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)).data;
      const response = (await axios(`https://api.thedogapi.com/v1/breeds/search?api_key=${api_key}&q=${name}`)).data;

      const apiSearchByName = response.map((b) => {
        const foundImage = allResponse.find((br) => br.reference_image_id === b.reference_image_id);
        return {
          id: b.id,
          name: b.name,
          image: foundImage ? foundImage.image.url : "https://img2.freepng.es/20180330/qge/kisspng-dog-puppy-silhouette-clip-art-bone-dog-5abe49d6e6fc19.0846729215224201829461.jpg",
          weight: b.weight.metric,
          temperament: b.temperament ? b.temperament.split(", ") : [],
        };
      });

      res.status(200).json([...dbSearchByName, ...apiSearchByName]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};