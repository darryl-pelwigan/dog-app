const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();

app.use(cors());
require('./loaders/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});