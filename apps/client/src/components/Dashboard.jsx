import React from 'react'
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodo"


function Dashboard({selectedProject}) {

    return (
    <>
    <div style={{ paddingBottom:'50px', position:'relative',left:'35%',  top: "35%",  justifyContent:'center', width:'800px'}}>
      
    <div style={{ paddingBottom:'50px', position:'relative',left:'35%',  top: "35%",  justifyContent:'center', width:'800px'}}>
          <InputTodo />
    </div>
    <div style={{ paddingBottom:'50px', position:'relative',  top: "35%", left:'35%', justifyContent:'center', width:'800px', backgroundColor:'white'}}>
          <ListTodos />
    </div>
    </div>
    </>
  )
}

export default Dashboard
