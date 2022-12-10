import { React , useState, useRef } from 'react';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';
import { CToast, CToastHeader,CToastBody, CButton, CToaster } from '@coreui/react';

function Login() {
  const [toast, addToast] = useState(0)
  const [errorCode, setErrorCode] = useState("Wrong Username/Passowrd!!!")
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const navigate = useNavigate();
  const toaster = useRef()
  
  
  const exampleToast = (
      <CToast>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <strong className="me-auto">Warning</strong>
        </CToastHeader>
        <CToastBody>{errorCode}</CToastBody>
      </CToast>
    )

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    fetch("user/login", {
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
         
              console.log(response.status)
              setErrorCode("Login Successfully!")
              navigate("/main")
              return response.json();
            })
          
            .then((data) => {
            console.log(data);
            localStorage.setItem('token', JSON.stringify(data));
            const info = JSON.parse(localStorage.getItem('token'));
            console.log(info);
            window.location.reload(false);

            });
    }

  return (
    <div style={{ display: 'flex', paddingLeft:'25%', alignItems: 'center', height: '100vh'}}>
        <div style={{padding: '50px'}}>
            <p style={{textAlign:'center', fontFamily:"Zen Dots, cursive", fontSize:'40px'}}>Login</p>
        <form method="post" onSubmit={handleSubmit}>
            <MDBContainer>
                {/* <MDBInput wrapperClass='mb-4' label='Username' name='username' id='username' type='text'/> */}
                <MDBInput wrapperClass='mb-4' label='Email address' name='email' id='email' type='email'/>
                <MDBInput wrapperClass='mb-4' label='Password' name='password' id='password' type='password'/>
                
                <div className="d-flex justify-content-between mx-3 mb-4">
                    {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
                </div>
                <MDBBtn className="mb-4"style={{width:"100%"}} onClick={() => addToast(exampleToast)}>Sign In</MDBBtn>
                <CToaster ref={toaster} push={toast} placement="top-end" />
              
                <div className="text-center">
                    <p>Not a member? <a href="/signup">Register</a></p>
                </div>
            </MDBContainer>
        </form>
        </div>
        <div>
        <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'  />
        </div>
     </div>
  )
}

export default Login;
