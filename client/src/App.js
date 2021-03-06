import './App.css';
import StepList from './components/StepList';
import LevelList from './components/LevelList';
import NewStep from './components/NewStep';
import NewLevel from './components/NewLevel';

import { useState, useEffect } from 'react';
import axios from 'axios';


const URL = 'http://localhost:8001/'

function App() {

const [steps, setSteps] = useState([]);
const [levels, setLevels] = useState([]);

useEffect(() => {
  axios.get(`${URL}steps`)
  .then(function (res) {
    setSteps([...res.data])
    //console.log("axios res.data - steps State", res.data)
  })
}, [])


useEffect(() => {
  axios.get(`${URL}levels`)
  .then(function (res) {
    setLevels([...res.data])
  })
}, [])

  return (
    <div className="App">
      <StepList steps={steps}/>
      <LevelList levels={levels} />
      <NewStep />
      <NewLevel />
    </div>
  );
}

export default App;
