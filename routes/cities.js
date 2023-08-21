const express = require('express');
const router = express.Router();

const {
    getSearchCities,
    createSeoulInitCityAPI
} = require('../controllers/cities');

router.route('/').get(getSearchCities);
router.route('/create').get(createSeoulInitCityAPI);

module.exports = router;