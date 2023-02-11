const express = require('express');
const router = express.Router();

const {
    getSeoulCitiesData
} = require('../controllers/seoulCitiesData');

router.route('/').get(getSeoulCitiesData);

module.exports = router;