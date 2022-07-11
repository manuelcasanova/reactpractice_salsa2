//The application will run on this file

const express = require('express');
const app = express();
const port = 8001;
const cors = require("cors");
const pool = require('./db')

//const bodyparser = require("body-parser");//Does same as express.json

app.use(cors());
app.use(express.json()); //req.body

app.listen(port, () => {
  console.log(`Casino app running on port ${port}.`);
});

