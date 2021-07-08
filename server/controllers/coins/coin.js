const CoinData = require('../../models/coin');

exports.getCoins = (req, res) => {
  CoinData.find({}).exec((err, coins) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json(coins);
  });
};
