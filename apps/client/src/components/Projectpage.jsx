import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap';
import InputProject from './InputProject';
import { ImCross } from 'react-icons/im';
import "bootstrap/dist/css/bootstrap.css";
import ProjectTodos from './Projectitem';
import InputTodo from './InputTodo';
import EditProject from './EditProject';


function Projectpage() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    // const navigate = useNavigate();
    const info = JSON.parse(localStorage.getItem('token'));
    const info1 = (Object.values(info)[0])

  useEffect(()=> { 
    fetch(`project/user/${info1}`, {
        method: "get",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Bad status code from server.');
          } 
     
          console.log(response.status)
          return response.json();
        })
      
        .then((data) => {
        setData(data);
        });
  },[])


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
        <div style={{ height:'center', alignItems:"center",justifyContent:"center", padding:"auto", fontFamily:"Zen Dots, cursive", fontSize:'65px', display:'flex', flexBasis:'100%', flexWrap:"wrap"}}>Project List</div>
        <div style={{ paddingLeft:'20%', paddingRight:'20%', alignItems: 'center'}}>
          <InputProject />
          <br />
          
        </div>
        <div style={{ padding: '100px', display:"flex"}}>
            <div style={{ justifyContent:"center", textAlign:'center', fontFamily:"Zen Dots, cursive", fontSize:'15px', display:'flex', flexBasis:'100%', flexWrap:"wrap"}}>
              {data?.map((data) => (
                <div style={{paddingBottom:"10px"}}>
                  <Card style={{ width: '800px' , marginLeft:'10px'}}>
                    <Card.Header>{data.title} </Card.Header>
                    <ImCross style={{position:"absolute", top:"15px", right:"15px"}} onClick={() => deleteProject(data.id)}/>
                    <Card.Body>
                        <Card.Text>
                          <hr />
                          <div style={{textAlign:"left", padding:"5px"}}>
                            Desciption :  <EditProject pid={data.id}/><br />
                          </div>
                          <div style={{textAlign:"center"}}>
                            {data.description}
                          </div>
                          <hr />
                          <Container>
                            <InputTodo project_id={data.id} project_name={data.title}/>
                            <ProjectTodos pid={data.id}/>
            
                          </Container>
                        </Card.Text>
                        <Card.Footer>
                          <small>{data.published_date}</small>
                          <small>{data.modified_at}</small>
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
