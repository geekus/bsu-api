'use strict';

const express = require('express');
const app = express();
const router = new express.Router();

router.get('/wallet', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send('1337');
});

app.use(process.env.VIRTUAL_PATH || '/', router);

if (!module.parent) {
  const port = process.env.VIRTUAL_PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
}
