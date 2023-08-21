const express = require('express');
const router = express.Router();

const {
    getCategoryItem
} = require('../controllers/categories');

router.route('/').get(getCategoryItem);

module.exports = router;