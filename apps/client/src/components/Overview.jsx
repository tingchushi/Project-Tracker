import React, { useState, useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function Overview() {
      const [data, setData] = useState([])
      const navigate = useNavigate()
      
      const info = JSON.parse(localStorage.getItem('token'));
      let info1 = (Object.values(info)[0])
      console.log(info1)

      useEffect(()=>{
        fetch(`project/overall/${info1}`, {
          method: "get",
        })
          .then(res => res.json())
          .then((data) => {
            setData(data)
            console.log(data)
          });
      },[])
      console.log(data)
      
      let project_id = []
      let completed = []
          for (var key in data){
            project_id.push(data[key].title);
            completed.push(data[key].completed)
          }
      console.log(project_id, completed)
      
      let uniqueChars = [...new Set(project_id)];

      const percentage = (id) =>{
        const count = data.filter(item => item.title === id && item.completed).length; 
        console.log(count);
        const total = data.filter(item => item.title === id).length;
        console.log(total);
        console.log(count*100/total);
         return ((count * 100 / total).toFixed(0))
        }
      
      console.log(uniqueChars)
      

    return (
        <>
      <h1 className="text-center my-5" style={{ fontFamily:"Zen Dots, cursive", position:'relative',  top: "35%", left: "35%", justifyContent:'center',border:'1px black dotted',backgroundColor:'#00203FFF', color:'#ADEFD1FF', width:'800px'}}>Project Progress Overiew</h1>
        <div assName="text-center my-5" style={{ display:'flex',fontFamily:"Zen Dots, cursive", position:'relative',  top: "35%", left: "35%", justifyContent:'center', width:'800px'}}>

            {uniqueChars?.map((data) => (
              <div style={{ display:'flex', padding:'10px', justifyContent:'center', width:'300px'}}>
                  <Card>
                    <Card.Header style={{backgroundColor:'#007BD7', color:'white', textAlign:'center', fontSize:'12px'}}>{data} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div key={data.id}>
                              <p style={{textAlign:'center', fontSize:'12px'}}><CircularProgressbar value={percentage(data)} />{percentage(data) + '% Completed'} </p>
                            
                            </div>
  
                        </Card.Text>
  

                      </Card.Body>
                    </Card>
                  </div>
                    ))
                    
                  }
                  </div>
        </>
          )
              }

export default Overview
