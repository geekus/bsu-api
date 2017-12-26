'use strict';

const express = require('express');
const app = express();
const router = new express.Router();
const fetch = require('node-fetch');

const gdaxEndpoint = 'https://api.gdax.com';

const eurNokRate = process.env.EUR_NOK_RATE || 9.87; // TODO: Use an currency exchange API to get rate
const btcAmount =  process.env.BTC_AMOUNT || 0.003; // TODO: Use GDAX API to get exact amount

router.get('/wallet', (req, res) => {
  res.header('Content-Type', 'text/plain');

  fetch(`${gdaxEndpoint}/products/BTC-EUR/ticker`)
    .then(result => result.json())
    .then(json => {
      const lastTrade = parseFloat(json.price);
      const valueEur = lastTrade * btcAmount;
      const valueNok = valueEur * eurNokRate;

      res.send(`${parseInt(valueNok, 10)}`);
    });

});

app.use(process.env.VIRTUAL_PATH || '/', router);

if (!module.parent) {
  const port = process.env.VIRTUAL_PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
}
