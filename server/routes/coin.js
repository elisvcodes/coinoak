const express = require('express');
const router = express.Router();
const { adminAddsCoin } = require('../controllers/coin');
router.get('/adminaddscoin/:id', adminAddsCoin);
module.exports = router;
