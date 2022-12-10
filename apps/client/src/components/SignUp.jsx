import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import PasswordStrengthBar from 'react-password-strength-bar';
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";


function Registration () {
    const [passMatch, setPassMatch] = useState(true);
    const [state, setState] = useState({ password: "", cPassword: ""});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(' ')
    const [passVal, setPassVal] = useState(' ')
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
    validatePassword();
    }, [state]);

    const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
        ...prevState,
        [id]: value
    }));

  function checkPasswordValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
    //   return "Password must not contain Whitespaces.";
    return "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters";
    }


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
    //   return "Password must have at least one Uppercase Character.";
    return "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters";
    }


    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
    //   return "Password must have at least one Lowercase Character.";
    return "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters";
    }


    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
    //   return "Password must contain at least one Digit.";
      return "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters";
    }


    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
    //   return "Password must contain at least one Special Symbol.";
    return "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters";
    }


    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
    //   return "Password must be 10-16 Characters Long.";
    return "a password must be eight characters including one uppercase letter, one special character and alphanumeric characters";
    } else {
        return "";
    }
  }
  console.log(state.password)
  setPassVal(checkPasswordValidation(state.password));
};

const validatePassword = () => {
  if(state.password === state.cPassword){
    setPassMatch(true)
  }else{
    setPassMatch(false);
  } 
};

const handleSubmit = (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target));
  console.log(data)

  fetch("user/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      } 
      if (response.status !== 200 ){
        if (response.status !==204){
          alert("Invalid Information")
        } 
        setMsg('Username/Email Existed')
      }
      console.log(response.status)
      return response.json();
    })
  
    .then((data) => {
      if (data.msg) {
        setMsg(data.msg);
        
      } else {
        navigate("/");
      }
    });
};



function SubmitButton(){
  if (username && email && state.cPassword && state.password && dob){
    if(state.cPassword === state.password){
      return <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>
    }else{
      return <MDBBtn disabled className="mb-4 px-5" color='dark' size='lg'style={{width:"100%"}}>Sign Up</MDBBtn>
    }
  } else {
    return <MDBBtn disabled className="mb-4 px-5" color='dark' size='lg' style={{width:"100%"}}>Sign Up</MDBBtn> 
  };
};

    return (
    <div style={{ display: 'flex', paddingLeft:'25%', alignItems: 'center', height: '100vh'}}>
        <div style={{padding: '50px'}}>
            <p style={{textAlign:'center', fontFamily:"Zen Dots, cursive", fontSize:'40px'}}>Sign In</p>
        <form method="post" onSubmit={handleSubmit}>
            <MDBContainer>
                <MDBInput wrapperClass='mb-4' label='Username' name='username' id='username' type='text' onChange={ e => setUsername(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='First Name' name='firstname' id='username' type='text'/>
                <MDBInput wrapperClass='mb-4' label='Last Name' name='lastname' id='username' type='text'/>
                <MDBInput wrapperClass='mb-4' label='Email address' name='email' id='email' type='email' onChange={ e => setEmail(e.target.value)}/> 
                <MDBInput wrapperClass='mb-4' label="Date of Birth" name='dob' id='dob' type="text" onChange={(e) => console.log(e.target.value)}onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}/>
                <MDBInput wrapperClass='mb-4' label='Password' name='password' id='password' type='password' value={state.password} onChange={handleChange}/>
                <PasswordStrengthBar password={state.password} />
                <MDBInput  wrapperClass='mb-4' label='Confirm Password'id='cPassword' type='password' value={state.cPassword} onChange={handleChange}/>
                <div className="input-error">
                    {state.password !== state.cPassword ? "" : ""}
                    </div>
                    <div className="input-error" style={{color:"red"}}>
                    {passMatch ? "" : "Error: Passwords do not match"}
                    <br/>
                    {passVal}
                </div>
                <SubmitButton className="mb-4 px-5" color='dark' size='lg'style={{width:"100%"}}/>

            </MDBContainer>
        </form>
        </div>
        <div>
        <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' width={"100%"} height={"100%"} />
        </div>
     </div>
  )
}

export default Registration
