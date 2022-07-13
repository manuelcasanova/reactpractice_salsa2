import { useState } from "react"
import axios from "axios";

const URL = 'http://localhost:8001'

export default function EditStep({ step, levels, steps, setSteps }) {

  const [stepTitle, setStepTitle] = useState(step.steptitle);
  const [stepLevel_id, setStepLevel_id] = useState(step.steplevel_id);
  // const [stepPronunciation, setStepPronunciation] = useState(step.steppronunciation);
  // const [stepVideo, setStepVideo] = useState(step.stepvideo);
  // const [stepVideoBreakdown, setStepVideoBreakdown] = useState(step.stepvideobreakdown);


  //This edit function is called from the onClick on edit button

  const editStep = async (e) => {
    e.preventDefault()
    try {
      const body = {stepTitle, stepLevel_id };
      const response = await fetch(`${URL}/steps/${step.stepid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      // axios.get(`${URL}/steps`)
      // .then(function (res) {
      //   setSteps([...res.data])
      //   //console.log("axios res.data - steps State", res.data)
      // })

      //Prints the array of objects containing the steps from the db
      //console.log("steps", steps)

      //Creates a copy of the edited step
      const editedStep = {...body, stepid: step.stepid, steptitle: body.stepTitle};
      console.log("edited step", editedStep)
      

      //FIND: Would return the value of the first element that does not match the id. But we want all of them. Similar to map. Then we probably need FILTER. Gets all the elements in the array that do not match the id.

      //I believe this should return all the steps from the db except the one edited. But it return all of them.

      // const filteredSteps = steps.filter(step => step.steplevel_id !== editedStep.stepLevel_id)

      // const filteredSteps = steps.filter((step) => {
      //   console.log("step object", step.stepid, step)
      //   return step.stepid !== editedStep.stepid
    
      // })
      
      //filter reorders. map option 2: !!!!!!!!!!!!

      const updatedSteps = steps.map((step) => {
        console.log("step object", step.stepid, step) 
        if (step.stepid !== editedStep.stepid) {
          console.log("Returning original")
          return step
        } else {
          console.log("Returning modified", {...step, ...editedStep})
          return {...step, ...editedStep}
        }
    
      })

     console.log("updatedSteps", updatedSteps)

      setSteps(updatedSteps)

      // setSteps(list of steps in the db without the new step + edited step)

   




      console.log(response)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className='EditStepModal'>
      {/* Button to Open the Modal */}
      <button type="button" className="button_edit" data-toggle="modal" data-target={`#id${step.stepid}`}>
        Edit
      </button>

      {/* The Modal */}
      <div className="modal" id={`id${step.stepid}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Step</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            {/* Modal body */}
            <label className="modal-body" htmlFor="title">Step</label>
            <div className="modal-body">
              <input type="text"
                className="form-control"
                value={stepTitle}
                onChange={e => setStepTitle(e.target.value)}
              />
            </div>

            <label className="add_step_title" htmlFor="title">Level</label>
            <div className="modal-body">
              <select
                className="form-control"
                value={stepLevel_id}
                //Change the stepLevel state. Then on clicking on the Edit button at the modal footer, send the information
                onChange={e => setStepLevel_id(e.target.value)} >

                {/* {console.log("steplevelid after change", stepLevelId)} */}

                {levels.map((level) =>
                  <option
                    key={level.levelid}
                    value={level.levelid}>

                    {level.leveltitle}
                  </option>
                )}
              </select>
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="button_close" data-dismiss="modal">Close</button>
              <button type="button" className="button_edit" data-dismiss="modal"
                onClick={e => editStep(e)}
              >Edit</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )

}




