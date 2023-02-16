const { StatusCodes } = require('http-status-codes');
const City = require('../models/City');

const getSearchCities = async (req, res) => {
    const searchId = req.query.searchId;
    const data = await City.find();
    const results = data[0].cities.filter(city => city.AREA_NM.includes(searchId));

    res.status(StatusCodes.OK).json(results);
}

module.exports = {
    getSearchCities,
}