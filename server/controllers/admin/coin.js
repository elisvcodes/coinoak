const CoinData = require('../../models/coin');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const downloadImage = async (fileUrl) => {
  const fileName = path.basename(fileUrl.split('?')[0]);

  const localFilePath = path.resolve(
    path.join(__dirname, '../assets/coins_thumb'),
    fileName
  );

  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
    return fileName;
  } catch (err) {
    throw new Error(err);
  }
};

exports.adminAddsCoin = async (req, res) => {
  try {
    const coinDetails = await CoinGeckoClient.coins.fetch(req.params.id, {});
    const data = {
      id: coinDetails.data.id,
      name: coinDetails.data.name,
      symbol: coinDetails.data.symbol,
      platforms: coinDetails.data.platforms,
      categories: coinDetails.data.categories,
      coinDescription: '',
      block_time_in_minutes: coinDetails.data.block_time_in_minutes,
      links: {
        homepage: coinDetails.data.links.homepage,
        blockchain_site: coinDetails.data.links.blockchain_site,
        official_forum_url: coinDetails.data.links.official_forum_url,
        twitter_screen_name: coinDetails.data.links.twitter_screen_name,
        facebook_username: coinDetails.data.links.facebook_username,
        telegram_channel_identifier:
          coinDetails.data.links.telegram_channel_identifier,
      },
      image: await downloadImage(coinDetails.data.image.large),
      market_data: {
        current_price: coinDetails.data.market_data.current_price.usd,
        ath: coinDetails.data.market_data.ath.usd,
        ath_change_percentage: coinDetails.data.market_data.current_price.usd,
        atl: coinDetails.data.market_data.atl.usd,
        atl_change_percentage:
          coinDetails.data.market_data.atl_change_percentage.usd,
        market_cap: coinDetails.data.market_data.market_cap.usd,
        fully_diluted_valuation:
          coinDetails.data.market_data.fully_diluted_valuation.usd,
        high_24h: coinDetails.data.market_data.high_24h.usd,
        low_24h: coinDetails.data.market_data.low_24h.usd,
        price_change_24h_in_currency:
          coinDetails.data.market_data.price_change_24h_in_currency.usd,
        price_change_percentage_24h_in_currency:
          coinDetails.data.market_data.price_change_percentage_24h_in_currency
            .usd,
        price_change_percentage_1h_in_currency:
          coinDetails.data.market_data.price_change_percentage_1h_in_currency
            .usd,
        price_change_percentage_7d_in_currency:
          coinDetails.data.market_data.price_change_percentage_7d_in_currency
            .usd,
        price_change_percentage_14d_in_currency:
          coinDetails.data.market_data.price_change_percentage_14d_in_currency
            .usd,
        price_change_percentage_30d_in_currency:
          coinDetails.data.market_data.price_change_percentage_30d_in_currency
            .usd,
        price_change_percentage_60d_in_currency:
          coinDetails.data.market_data.price_change_percentage_60d_in_currency
            .usd,
        price_change_percentage_200d_in_currency:
          coinDetails.data.market_data.price_change_percentage_200d_in_currency
            .usd,
        price_change_percentage_1y_in_currency:
          coinDetails.data.market_data.price_change_percentage_1y_in_currency
            .usd,
        market_cap_change_24h_in_currency:
          coinDetails.data.market_data.market_cap_change_24h_in_currency.usd,
        market_cap_change_percentage_24h_in_currency:
          coinDetails.data.market_data
            .market_cap_change_percentage_24h_in_currency.usd,
        price_change_24h: coinDetails.data.market_data.price_change_24h.usd,
        price_change_percentage_24h:
          coinDetails.data.market_data.price_change_percentage_24h.usd,
        price_change_percentage_7d:
          coinDetails.data.market_data.price_change_percentage_7d.usd,
        price_change_percentage_14d:
          coinDetails.data.market_data.price_change_percentage_14d.usd,
        price_change_percentage_30d:
          coinDetails.data.market_data.price_change_percentage_30d.usd,
        price_change_percentage_60d:
          coinDetails.data.market_data.price_change_percentage_60d.usd,
        price_change_percentage_200d:
          coinDetails.data.market_data.price_change_percentage_200d.usd,
        price_change_percentage_1y:
          coinDetails.data.market_data.price_change_percentage_1y.usd,
        market_cap_change_24h:
          coinDetails.data.market_data.market_cap_change_24h.usd,
        market_cap_change_percentage_24h:
          coinDetails.data.market_data.market_cap_change_percentage_24h.usd,
      },
      total_supply: coinDetails.data.total_supply,
      max_supply: coinDetails.data.max_supply,
      circulating_supply: coinDetails.data.circulating_supply,

      community_data: {
        facebook_likes: coinDetails.data.community_data.facebook_likes,
        twitter_followers: coinDetails.data.community_data.twitter_followers,
        telegram_channel_user_count:
          coinDetails.data.community_data.telegram_channel_user_count,
      },
    };

    const coin = new CoinData(data);
    await coin.save();
    res.json('all good');
  } catch (error) {
    console.log(error);
  }
};
