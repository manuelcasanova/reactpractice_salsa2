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
    const getAllSteps = await pool.query(
      'SELECT stepid, steptitle, steplevel_id, steppronunciation, stepvideo, stepvideobreakdown, leveltitle FROM steps JOIN levels on levels.levelid = steps.steplevel_id ORDER BY stepid DESC'
      );
    res.json(getAllSteps.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//Get all levels

app.get("/levels", async (req, res) => {
  try {
    const getAllLevels = await pool.query("SELECT * from levels ORDER BY levelid DESC");
    res.json(getAllLevels.rows)
  } catch (err) {
    console.error(err.message);
  }
})

//Add a step

app.post("/steps", async (req, res) => {
  try {
    const {stepTitle, stepLevel, stepPronunciation, stepVideo, stepVideoBreakdown} = req.body;
    console.log("reqbody", req.body)
    const newStep = await pool.query("INSERT INTO steps (steptitle, steplevel_id, steppronunciation, stepvideo, stepvideobreakdown) VALUES($1, $2, $3, $4, $5) RETURNING *", [stepTitle, stepLevel, stepPronunciation, stepVideo, stepVideoBreakdown])
    res.json(newStep.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

//Remove a step

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("Deleted step id:", id);
    const deleteStep = await pool.query(
      "DELETE FROM steps WHERE stepid = $1 RETURNING *", [id]
    )
    res.json("Step was deleted")
  } catch (err) {
    console.error(err.message)
  }
})

//Edit a step

app.put("/steps/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      stepTitle, stepLevel_id, steppronunciation, stepvideo, stepvideobreakdown
    } = req.body
    console.log("rq body", req.body)
    const editStep = await pool.query('UPDATE steps SET stepTitle = $1, stepLevel_id = $2, steppronunciation = $3, stepvideo = $4, stepVideoBreakdown = $5 WHERE stepid = $6', [stepTitle, stepLevel_id, steppronunciation, stepvideo, stepvideobreakdown, id]);
    res.json("Step was updated")
    
  } catch (err) {
    console.error(err.message)
  }
})

//Remove a level

app.delete("/levels/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("Deleted level id:", id);
    const deleteStep = await pool.query(
      "DELETE FROM levels WHERE levelid = $1 RETURNING *", [id]
    )
    res.json("Level was deleted")
  } catch (err) {
    console.error(err.message)
  }
})

//Add a level

app.post("/levels", async (req, res) => {
  try {
    const {levelTitle, levelDescription} = req.body;
    console.log("reqbody", req.body)
    const newLevel = await pool.query("INSERT INTO levels (leveltitle, leveldescription) VALUES($1, $2) RETURNING *", [levelTitle, levelDescription])
    res.json(newLevel.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

//Edit a level

app.put("/levels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      levelTitle, levelDescription
    } = req.body
    console.log("rq body", req.body)
    const editLevel = await pool.query('UPDATE levels SET levelTitle = $1, levelDescription = $2 WHERE levelid = $3', [levelTitle, levelDescription, id]);
    res.json("Level was updated")
    
  } catch (err) {
    console.error(err.message)
  }
})