import './App.css';
import StepList from './components/StepList';
import LevelList from './components/LevelList';
import NewStep2 from './components/NewStep2';
import NewLevel2 from './components/NewLevel2';
import NavBar from './components/NavBar';

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

      <NavBar />

<div className='add_step_and_level'>

<div className="NewStepComponent">
<NewStep2 steps={steps} setSteps={setSteps} levels={levels} setLevels={setLevels} />
</div>

<div className="NewLevelComponent">
<NewLevel2 levels={levels} setLevels={setLevels} />
</div>

</div>



      <StepList steps={steps} setSteps={setSteps} levels={levels} />
      <LevelList levels={levels} setLevels={setLevels} setSteps={setSteps} />


    </div>
  );
}

export default App;
