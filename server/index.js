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

//Routes and queries//

//Get all steps

app.get("/steps", async (req, res) => {
  try {
    const getAllSteps = await pool.query('SELECT * FROM steps');
    res.json(getAllSteps.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//Get all levels

app.get("/levels", async (req, res) => {
  try {
    const getAllLevels = await pool.query("SELECT * from levels");
    res.json(getAllLevels.rows)
  } catch (err) {
    console.error(err.message);
  }
})