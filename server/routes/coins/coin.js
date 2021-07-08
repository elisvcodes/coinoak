const express = require('express');
const router = express.Router();
const { getCoins } = require('../../controllers/coins/coin');
router.get('/', getCoins);
module.exports = router;
