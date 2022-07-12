import { useState } from "react"
import axios from "axios";

export default function NewStep({ steps, setSteps, levels }) {

//console.log(levels[0].leveltitle);

  const URL = 'http://localhost:8001'

  const [stepTitle, setStepTitle] = useState("");
  const [stepLevel, setStepLevel] = useState(1);
  //const [stepLevel, setStepLevel] = useState({levels[0].leveltitle} || 1);
  const [stepPronunciation, setStepPronunciation] = useState("");
  const [stepVideo, setStepVideo] = useState("");
  const [stepVideoBreakdown, setStepVideoBreakdown] = useState("");

  function onSubmitForm(e) {
    e.preventDefault();
    const step = {
      stepTitle,
      stepLevel,
      stepPronunciation,
      stepVideo,
      stepVideoBreakdown
    }
    //console.log("step on submit", step)
    addStep(step);
    resetForm();
  }

  function addStep(step) {
    //Shows in console
    console.log("Step added:", step)


    return axios.post(`${URL}/steps`,
      step)
      .then((response) => {
        const newStep = response.data;

        const stepLevel = levels.find((level) => {
          return level.levelid === newStep.steplevel_id
        })

        newStep.leveltitle = stepLevel.leveltitle;
       
        setSteps([newStep, ...steps])
    

      })
  }

  function resetForm() {
    setStepTitle("");
    setStepLevel(stepLevel); //The default value of the input form for level is the last one used.
    setStepPronunciation("");
    setStepVideo("");
    setStepVideoBreakdown("");

  }

  return (
    <div>

      {/* <!-- Button trigger modal --> */}
      <button type="button" data-toggle="modal" data-target="#exampleModal">Add step
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add new step</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <label className="add_step_title" htmlFor="title">Step</label>

              <input className="form-control" type="text" name="title" value={stepTitle} onChange={e => setStepTitle(e.target.value)} />
              <p></p>

              <div className="level_input">

                <label className="add_step_title" htmlFor="title">Level</label>
                <select className="form-control" value={stepLevel} onChange={e => setStepLevel(e.target.value)}  >
             
    

                {levels.map((level) =>
              <option
                key={level.levelid}
                value={level.levelid} //HERE to show name of step but step is the id!
              >
                {level.leveltitle}

              </option>
                  )}
                  {/*App breaks when I reload the page. Uncaught TypeError levels.map is not a function. I comment out and in lines 85 to 88 and works again. FIXED by removing string from levels setLeves useState("Beginner")*/}
                </select>

              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="Button_Close" data-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save</button> */}
              <button
                className="Button_Submit"
                type="Submit"
                onClick={onSubmitForm}
                /*to close modal after submission */
                data-dismiss="modal"
              >Add step</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}