import './App.css';
import StepList from './components/StepList';
import LevelList from './components/LevelList';
import NewStep from './components/NewStep';
import NewLevel from './components/NewLevel';

function App() {
  return (
    <div className="App">
      <StepList />
      <LevelList />
      <NewStep />
      <NewLevel />
    </div>
  );
}

export default App;
