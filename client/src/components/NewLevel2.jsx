import axios from "axios";
import { useState } from "react"

export default function NewLevel({levels, setLevels}) {

  const URL = 'http://localhost:8001'

  const [levelTitle, setLevelTitle] = useState("")
  const [levelDescription, setLevelDescription] = useState("")


  function onSubmitForm(e) {
    e.preventDefault();
    const level = {
      levelTitle,
      levelDescription
    }
    addLevel(level);
    resetForm();
  }

  function addLevel(level) {
    console.log("Level added:", level)

    return axios.post(`${URL}/levels`, level)
      .then((response) => {
        const newLevel = response.data;
     
        setLevels([newLevel, ...levels])
      })
  
  }

  function resetForm() {
    setLevelTitle("");
    setLevelDescription("");
  }


  return (
    <div>

      {/* <!-- Button trigger modal --> */}
      <button type="button" data-toggle="modal" data-target={`#id${levels.levelid}`}>Add level
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id={`id${levels.levelid}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add new level</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <label className="add_level_title" htmlFor="title">Level</label>

              <input className="form-control" type="text" name="title" value={levelTitle} onChange={e => setLevelTitle(e.target.value)} />
              <p></p>

              <label className="add_level_title" htmlFor="title">Description</label>

              <input className="form-control" type="text" name="title" value={levelDescription} onChange={e => setLevelDescription(e.target.value)} />
            

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
              >Add level</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}