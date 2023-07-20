const { Dog } = require("../db");

module.exports = async (req, res) =>{
  try{
      const newDog = await Dog.create(req.body);
      console.log(req.body)
     
      await newDog.addTemperaments(req.body.temperament);

      
      

      res.status(201).json({
          message: 'Dog successfully created',
          new_dog: newDog
        });
  }   catch (error) {
      res.status(400).json({ error: error.message });
  }
};