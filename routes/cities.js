const express = require('express');
const router = express.Router();

const {
    getSearchCities,
    getSeoulInitCityAPI
} = require('../controllers/cities');

router.route('/').get(getSearchCities);
router.route('/create').get(getSeoulInitCityAPI);

module.exports = router;