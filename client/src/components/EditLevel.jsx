import { useState } from "react";
import axios from 'axios'

export default function EditLevel ({level, levels, setLevels, setSteps}) {

  const URL = 'http://localhost:8001'

  const [levelTitle, setLevelTitle] = useState(level.leveltitle);
  const [levelDescription, setLevelDescription] = useState(level.levelDescription);


  const editLevel = async (e) => {
    e.preventDefault()
    try {
      const body = {levelTitle, levelDescription };
      const response = await fetch(`${URL}/levels/${level.levelid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      axios.get(`${URL}/levels`)
      .then(function (res) {
        setLevels([...res.data])
      })
      axios.get(`${URL}/steps`)
      .then(function (res) {
        setSteps([...res.data])
      })


      console.log(response)
    } catch (err) {
      console.error(err.message)
    }
  }



  return (
    <div className='EditLevelModal'>
      {/* Button to Open the Modal */}
      <button type="button" className="button_edit" data-toggle="modal" data-target="#editlevelmodal">
        Edit
      </button>

      {/* The Modal */}
      <div className="modal" id="editlevelmodal">
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit level</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            {/* Modal body */}
            <label className="modal-body" htmlFor="title">Level</label>
            <div className="modal-body">
              <input type="text"
                className="form-control"
                value={levelTitle}
                onChange={e => setLevelTitle(e.target.value)}
              />
            </div>

            <label className="modal-body" htmlFor="title">Description</label>
            <div className="modal-body">
              <input type="text"
                className="form-control"
                value={levelDescription}
                onChange={e => setLevelDescription(e.target.value)}
              />
            </div>



            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="button_close" data-dismiss="modal">Close</button>
              <button type="button" className="button_edit" data-dismiss="modal"
                onClick={e => editLevel(e)}
              >Edit</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}