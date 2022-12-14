import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function Participant({pid}) {
  const [data, setData] = useState([]);
  
  console.log(pid)
  useEffect(()=> { 
    fetch(`project/participant/${pid}`, {
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


    return (
    <div>
        <tr>

        {data.map((data)=>{
            <li key={data.id}>{data.firstname}</li>
        })}
        </tr>
    </div>
  )
}

export default Participant
