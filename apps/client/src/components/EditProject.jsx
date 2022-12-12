import React, { Fragment, useState, useEffect } from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import { setTwoToneColor } from "@ant-design/icons";


const EditProject = ({pid}) => {
  const [title, setTitle] = useState(pid.title)
  const [description, setDescription] = useState(pid.description);
  const [data, setData] = useState([]) 
  
  // console.log(pid)
  useEffect(()=>{
    fetch("project/all", {
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      });
  },[])

  const editText = async (id) => {
    try {
      const body = { description,title };
      console.log(body);
      await fetch(`project/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setTitle(title);
      setDescription(description);
      
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
        data-target={`#id${pid.id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${pid.id}`}
        onClick={() => setData(data)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Project</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setName(data.title)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              
              <MDBInput 
                label='Title'
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onClick={() => editText(pid.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(data.description)}
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

export default EditProject;