import axios from "axios"
import EditStep from "./EditStep"

const URL = 'http://localhost:8001'



export default function StepList({ steps, setSteps }) {
  

  function deleteStep(stepId) {
    return axios.delete(`${URL}/delete/${stepId}`)
      .then(res => {
        setSteps(steps.filter(step => step.stepId !== stepId))
        console.log("Step deleted id:", stepId)
      })
      
  } 
  
  return (

    <>

      <div>
        Step List
      </div>

      <table className="steplist_table">
        <thead>
          <tr>
            <th>Step name</th>
            <th>Step Level</th>
            <th>Step ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {steps.map(step =>
            <tr key={step.stepid}>
              <td>{step.steptitle}</td>
              <td>{step.leveltitle}</td>
              <td>{step.stepid}</td>
              <td><EditStep step={step}/></td>
              <td><button
              onClick={() => deleteStep(step.stepid)}
              >
                Delete</button></td>
            </tr>)}
        </tbody>

      </table>

    </>
  )
}