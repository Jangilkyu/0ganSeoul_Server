const { StatusCodes } = require('http-status-codes');
const City = require('../models/City');

const getCategoryItem = async (req, res) => {
    const categoryId = decodeURIComponent(req.param('categoryId'));
    const data = await City.find();
    console.log(data[0].cities);
    const results = data[0].cities.filter(city => city.Category.includes(categoryId));
    
    res.status(StatusCodes.OK).json(results);
}

module.exports = {
    getCategoryItem,
}