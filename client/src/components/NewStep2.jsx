import { useState } from "react"
import axios from "axios";

export default function NewStep({ steps, setSteps, levels }) {

  const URL = 'http://localhost:8001'

  const [stepTitle, setStepTitle] = useState("");
  const [stepLevel, setStepLevel] = useState(1);
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
    <>
      <div className="formtitle">New step form</div>
      <div className="newstepform">

        <form>

          <div className="formcolumn">Step name</div>
          <input
            type="text"
            value={stepTitle}
            onChange={e => setStepTitle(e.target.value)}
          />

          <div className="formcolumn">Step level</div>
          <select
            value={stepLevel}
            onChange={e => setStepLevel(e.target.value)}
            className="selectlevel"
          >
            {levels.map((level) =>
              <option
                key={level.levelid}
                value={level.levelid} //HERE to show name of step but step is the id!
              >
                {level.leveltitle}

              </option>
            )}
          </select>

          {/* <div className="formcolumn">Step pronunciation (Mp3)</div>
          <input
            type="text"
            value={stepPronunciation}
            onChange={e => setStepPronunciation(e.target.value)}
          />

          <div className="formcolumn">Step video</div>
          <input
            type="text"
            value={stepVideo}
            onChange={e => setStepVideo(e.target.value)}
          />

          <div className="formcolumn">Step video breakdown</div>
          <input
            type="text"
            value={stepVideoBreakdown}
            onChange={e => setStepVideoBreakdown(e.target.value)}
          /> */}

        </form>

        <button
          onClick={onSubmitForm}
          className="button_submit"
        >Add</button>

      </div>

    </>

  )
}

