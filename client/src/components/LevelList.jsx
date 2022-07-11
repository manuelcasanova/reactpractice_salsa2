export default function LevelList ({levels}) {
  return (
    
    <>
    <div>Level list</div>
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
            <td>Edit</td>
            <td>Delete</td>
          </tr>)}
      </tbody>

    </table>
    </>
  )
}