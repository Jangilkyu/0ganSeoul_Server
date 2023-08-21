const { StatusCodes } = require('http-status-codes');
const City = require('../models/City');
const citiesList = require('../utils/citiesList');
const createCitiesData = require('../utils/createCitiesData');
const cityArr = require('../utils/cityArr');

const getSearchCities = async (req, res) => {
    const searchId = decodeURIComponent(req.param('searchId'));
    const data = await City.find();
    const results = data[0].cities.filter(city => city.AREA_NM.includes(searchId));
    
    res.status(StatusCodes.OK).json(results);
}

const createSeoulInitCityAPI = async (req, res) => {
  try {
    const citiesArr = [];
    await Promise.all(citiesList.map((city) => createCitiesData(city, citiesArr)));

    const citiesCount = await City.find();
    if (Array.isArray(citiesCount) && citiesCount.length === 0) {
      try {
        const cityData = new City({cities: citiesArr});
        await cityData.save();
      } catch (error) {
        console.log(error);
      }
    }

    res.status(StatusCodes.OK).json({citiesArr});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
  }
};

module.exports = {
    getSearchCities,
    createSeoulInitCityAPI,
}