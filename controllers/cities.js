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

const getSeoulInitCityAPI = async (req, res) => {
    try {
      await Promise.all(citiesList.map((city) => createCitiesData(city)));
      
      const citiesCount = await City.find();
      if (Array.isArray(citiesCount) && citiesCount.length === 0) {
        let cityData = new City({ cities: cityArr });      
        cityData.save((err, cityInfo) => {
          if (err) {
            console.log(err);
          } else {
            console.log("cityInfo",cityInfo);
          }});
      }

      res.status(StatusCodes.OK).json(cityArr);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

module.exports = {
    getSearchCities,
    getSeoulInitCityAPI,
}