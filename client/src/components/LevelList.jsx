import axios from "axios"
import EditLevel from "./EditLevel"

const URL = 'http://localhost:8001'


export default function LevelList ({levels, setLevels, setSteps}) {
  
  
  function deleteLevel(levelId) {
    return axios.delete(`${URL}/levels/delete/${levelId}`)
      .then(res => {
        setLevels(levels.filter(level => level.levelid !== levelId))
        console.log("Level deleted id:", levelId)
      })
      
  } 
  
  
  
  return (
    
    <>
    <div className="tabletitle">Level list</div>
    <table className="levellist_table">
      <thead>
        <tr>
          <th>Level name</th>
          <th>Level ID</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {levels.map(level => 
          <tr key={level.levelid}>
            <td>{level.leveltitle}</td>
            <td>{level.levelid}</td>
            <td><EditLevel levels={levels} setLevels={setLevels} level={level} setSteps={setSteps}/></td>
            <td><button
            className="button_delete"
              onClick={() => deleteLevel(level.levelid)}
              >
                Delete</button></td>
          </tr>)}
      </tbody>

    </table>
    </>
  )
}