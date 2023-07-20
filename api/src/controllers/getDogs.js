const axios = require('axios');
const { api_key } = process.env;
const { Temperament, Dog } = require('../db')

module.exports = async(req, res) => {
    try {
        const dogs = await Dog.findAll({
            include: [{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [] 
                }
            }]
        });

        const getDogs = dogs.map(d =>{
            return{
                id : d.dataValues.id,
                name : d.dataValues.name,
                height: d.dataValues.height,
                weight: d.dataValues.weight,
                life_span: d.dataValues.life_span,
                image: d.dataValues.image,
                temperament :  d.dataValues.temperament.map(t => t.name)

            }

        })
        const response =(await axios(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)).data;

        const apiDogs = response.map(b => {
            return {
                id: b.id,
                name: b.name,
                image: b.image.url,
                temperament: b.temperament ? b.temperament.split(", ") : [],
                life_span: b.life_span,
                height: b.height.metric,
                weight: b.weight.metric
            }
        })

        res.status(200).json([...getDogs, ...apiDogs])
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}