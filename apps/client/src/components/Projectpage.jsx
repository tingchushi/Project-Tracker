import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap';
import InputProject from './InputProject';
import { ImCross } from 'react-icons/im';
import "bootstrap/dist/css/bootstrap.css";
import ProjectTodos from './Projectitem';
import InputTodo from './InputTodo';
import EditProject from './EditProject';
import { useNavigate } from 'react-router-dom';
import Percentage from './Percentagebar';


function Projectpage() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate(); 

    const handleShow = () => setShow(true);
    
    let info1 = 0;
    if(JSON.parse(localStorage.getItem('token')) === null ){
      navigate('/') ; 
    } else {
      const info = JSON.parse(localStorage.getItem('token'));
      let info1 = (Object.values(info)[0])
      
      useEffect(()=> { 
        fetch(`project/user/${info1}`, {
          method: "get",
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Bad status code from server.')
            // navigate('/')
          } 
          
          console.log(response.status)
          return response.json();
        })
        
        .then((data) => {
          setData(data);
        });
        
      },[])
    }
      

  async function deleteProject(id) {
    try {
      await fetch(`/project/delete/${id}`, {
        method: "DELETE",
      });

      setData(data.filter((data) => data.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }
 

    return (
    <>
        <br />
        <div style={{textAlign:'center',fontSize:'65px', fontFamily:"Zen Dots, cursive", position:'relative',  top: "35%", left: "35%", justifyContent:'center', border:'1px black dotted',backgroundColor:'#00203FFF', color:'#ADEFD1FF', width:'800px'}}>Project List</div>
        <div>
          <InputProject />
        </div>
        <br />
        <div style={{justifyContent:'center', alignContent:'center'}}>
            <div style={{fontFamily:"Zen Dots, cursive", fontSize:'15px'}}>
              {data?.map((data) => (
                <div style={{ paddingBottom:'50px', position:'relative',  top: "35%", left: "35%", width:'800px'}}>
        
                  <Card>
                    <Card.Header style={{backgroundColor:'#007BD7', color:'white'}}>{data.title} </Card.Header>
                    <ImCross style={{position:"absolute", top:"15px", right:"15px"}} onClick={() => deleteProject(data.id)}/>
                    <Card.Body>
                        <Card.Text>
                            <div key={data.id}>
                              <p style={{textAlign:'center'}}>Project Progress: </p>
                                    <Percentage pid={data.id} />
                            </div>
                          <hr />
                          <div style={{textAlign:"left", padding:"5px"}}>
                            Desciption :  <EditProject pid={data.id}/><br />
                          </div>
                          <div>
                            {data.description}
                          </div>
                          <hr />
                
                          <Container>
                            <div >
                              <InputTodo project_id={data.id} project_name={data.title}/>
                              <ProjectTodos pid={data.id} piid={data.item_id}/>
                            </div>
            
                          </Container>
                        </Card.Text>
                        <Card.Footer>
                          <div style={{textAlign:'center'}}>
                            <small>{new Date(data.modified_at).toDateString()}</small>
                          </div>
                        </Card.Footer>

                      </Card.Body>
                    </Card>
                  </div>
                    ))
                  
                  }
              </div>
          </div>

          </>
  )
}

export default Projectpage
