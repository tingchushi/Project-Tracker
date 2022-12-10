import React from 'react'
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodo"


function Dashboard({selectedProject}) {

    return (
    <>
    <div style={{ display: 'flex', paddingLeft:'20%', paddingRight:'20%', alignItems: 'center'}}>
          <InputTodo />
    </div>
    <div style={{ display: 'flex', paddingLeft:'20%', paddingRight:'20%', alignItems: 'center'}}>
          <ListTodos />
    </div>
    </>
  )
}

export default Dashboard
