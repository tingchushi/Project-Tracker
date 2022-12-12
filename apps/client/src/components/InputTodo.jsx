import React, { Fragment, useState, useEffect } from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useNavigate } from "react-router-dom";

const InputTodo = ({project_id, project_name}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [project, setProject] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const info = JSON.parse(localStorage.getItem('token'));
  const info1 = (Object.values(info)[0])
  if(JSON.parse(localStorage.getItem('token')) === null ){
    navigate('/') ; 
  } 
  
  useEffect(()=>{
    fetch("project/status", {
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        setData(data)
      });
  },[])

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      const data = Object.fromEntries(new FormData(e.target));
      console.log(data)
      await fetch("project/itemAdd", {
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
    <div style={{height:'center', alignItems:"center",justifyContent:"center"}}>
      <div>
        <h1 style={{textAlign:"center", fontFamily:"Zen Dots, cursive", fontSize:"15px"}}>
            Input Action:&nbsp;&nbsp;&nbsp;&nbsp;
          </h1>
      </div>
      <div style={{paddingLeft:'70px'}}>  
      <form className="d-flex" onSubmit={onSubmitForm}>
          <MDBInput
          label="Action"
          placeholder="Title"
          className="form-control"
          name="name"
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
          style={{textAlign:"center"}}
          label='Project ID'
          type="hidden"
          placeholder={project_name}
          className="form-control"
          name="project_id"
          value={project_id}
          readonly="readonly"
          />

          <button className="btn btn-success">Add</button>

      
      </form>
    </div>
  </div>
  );
};

export default InputTodo;

        {/* <select id="standard-select" onChange={(e)=> (e.target.value)} name="project_id" >
          {data.map((data) => (
            <option key={data.project_id} value={data.id}>{data.title} </option>
            ))}
          </select> */}