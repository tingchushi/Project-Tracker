import { React, useState, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead} from 'mdb-react-ui-kit';

function Mainpage() {
  const [errorCode, setErrorCode] = useState("Wrong Username/Passowrd!!!")
  const [data, setData] = useState([])
  const navigate = useNavigate();
  
  const info = JSON.parse(localStorage.getItem('token'));
  const info1 = (Object.values(info)[0])
  if(JSON.parse(localStorage.getItem('token')) === null ){
    navigate('/') ; 
  } 
  useEffect(()=>{
    fetch('api/status', {
      method: "GET",
     })
     .then((response) =>  response.json())
     .then((data) => {
       setData(data)       
      });
    },[])

  return (
    <div style={{ display: 'flex', paddingLeft:'40%', alignItems: 'center', height: '100vh'}}>
        <div style={{padding: '50px'}}>
            <p style={{textAlign:'center', fontFamily:"Zen Dots, cursive", fontSize:'40px'}}>
              Dashboard
            </p>
        </div>

     </div>
  )
}

export default Mainpage 