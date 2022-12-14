import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useNavigate } from "react-router-dom";

const InputTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  if(JSON.parse(localStorage.getItem('token')) === null ){
    navigate('/') ; 
  } 
    
  const info = JSON.parse(localStorage.getItem('token'));
  const info1 =Object.values(info)[0];
  
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
      await fetch(`project/add/${info1}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((response) => {
        if (!response.ok) {
          alert("Project Existed")
  
          throw new Error('Bad status code from server.');
        } 
          // if (response.status !==204){
  
        console.log(response.status)
        return response.json();
      })
    
      .then((data) => {
        // if (data.msg) {
        //   setMsg(data.msg);
          
        // } else {
        //   navigate("/");
        // }
        console.log(data)
      });

      window.location = "/main";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{height:'center', alignItems:"center",justifyContent:"center",}}>
      <h1 className="text-center my-5" style={{fontFamily:"Zen Dots, cursive", position:'relative',  top: "35%", left: "35%", justifyContent:'center',border:'1px black dotted',backgroundColor:'#00203FFF', color:'#ADEFD1FF', width:'800px'}}>Create New Project</h1>
      <div style={{textAlign:"left", fontFamily:"Zen Dots, cursive", fontSize:"15px"}}>

      <form className="d-flex" style={{position:'relative',  top: "35%", left: "35%", width:'800px',justifyContent:'center', alignContent:'center'}} onSubmit={onSubmitForm}>
        <MDBInput
          label="Project Name"
          type="text"
          className="form-control"
          name="title"
          value={title}
          style={{backgroundColor:"white"}}
          onChange={(e) => setTitle(e.target.value)}
          />
          <MDBInput
          type="text"
          label="What to do?"  
          className="form-control"
          name="description"
          value={description}
          style={{backgroundColor:"white"}}
          onChange={(e) => setDescription(e.target.value)}
          />

        <MDBInput
          type="hidden"
          label="User ID"
          className="form-control"
          name="user_id"
          value={info1}
          style={{textAlign:"center"}}
          readonly="readonly"
          onChange={(e) => setUser(e.target.value)}
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