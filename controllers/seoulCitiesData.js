const { StatusCodes } = require('http-status-codes');
const City = require('../models/City');

const getSeoulCitiesData = async (req, res) => {
    cities = await City.find();
    res.status(StatusCodes.OK).json(cities);
}

module.exports = {
    getSeoulCitiesData,
}