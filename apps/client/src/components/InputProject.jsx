import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const InputTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  const info = JSON.parse(localStorage.getItem('token'));
  const info1 = (Object.values(info)[0])

  useEffect(()=>{
    fetch("project/status", {
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        setData(data)
      });
  },[])

  // console.log(data)

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      const data = Object.fromEntries(new FormData(e.target));
      console.log(data)
      await fetch("project/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      window.location = "/main";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{height:'center', alignItems:"center",justifyContent:"center",}}>
      <h1 className="text-center my-5" style={{justifyContent:"center", fontFamily:"Zen Dots, cursive"}}>Create New Project&nbsp;&nbsp;&nbsp;&nbsp;</h1>
      <div style={{textAlign:"left", fontFamily:"Zen Dots, cursive", fontSize:"15px"}}>

      <form className="d-flex" onSubmit={onSubmitForm}>
        <MDBInput
          label="Project Name"
          type="text"
          className="form-control"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
          <MDBInput
          type="text"
          label="What to do?"  
          className="form-control"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />

        <MDBInput
          type="text"
          label="User ID"
          className="form-control"
          name="user_id"
          value={info1}
          style={{textAlign:"center"}}
          readonly="readonly"
          onChange={(e) => setDescription(e.target.value)}
          />
      <div>
  
        </div>
            <button className="btn btn-success">Add</button>

      </form>
      </div>
    </div>
  );
};

export default InputTodo;