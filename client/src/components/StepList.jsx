export default function StepList({ steps }) {
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
              <td>{step.steplevel_id}</td>
              <td>{step.stepid}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>)}
        </tbody>

      </table>

    </>
  )
}