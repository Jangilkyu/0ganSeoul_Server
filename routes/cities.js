const express = require('express');
const router = express.Router();

const {
    getSearchCities
} = require('../controllers/cities');

router.route('/').get(getSearchCities);

module.exports = router;