import React, { Fragment, useState, useEffect } from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';


const EditTodo = ({ todo }) => {
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description);
  const [data, setData] = useState([]) 
  
  useEffect(()=>{
    fetch("project/itemStatus", {
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        setData(data)
      });
  },[])

  const editText = async (id) => {
    try {
      const body = { description,name };
      await fetch(`project/itemUpdate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/main";

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Action</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                // onClick={() => setName(todo.name)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              
              <MDBInput 
                label='Title'
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-body">
            <MDBInput 
                label='Description'
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(todo.todo_id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;