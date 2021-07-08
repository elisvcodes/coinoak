const express = require('express');
const router = express.Router();
const { adminAddsCoin } = require('../../controllers/admin/coin');
router.get('/add/:id', adminAddsCoin);
module.exports = router;
