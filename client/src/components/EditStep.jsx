export default function EditStep({ step }) {


  return (
    <div className='EditStepModal'>
            {/* Button to Open the Modal */}
            <button type="button" className="BUTTON_EDIT" data-toggle="modal" data-target="#myModal">
      Edit
    </button>
    
     {/* The Modal */}
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
    
           {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Modal Heading</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
    
           {/* Modal body */}
          <div className="modal-body">
            Modal body..
          </div>
    
           {/* Modal footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal">Edit</button>
          </div>
    
        </div>
      </div>
    </div>
    </div>
  )

}




