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
    <>

      <div>
        New Level form
      </div>

      <div className="newlevelform">

        <form>


          <div>Level name</div>
          <input
            type="text"
            value={levelTitle}
            onChange={e => setLevelTitle(e.target.value)}
          />

          <div>Level description</div>
          <input
            type="text"
            value={levelDescription}
            onChange={e => setLevelDescription(e.target.value)}
          />



        </form>

        <button
          onClick={onSubmitForm}
          className="button_submit"
        >Add</button>

      </div>

    </>



  )
}