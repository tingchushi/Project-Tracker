import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { ProgressBar } from "react-bootstrap";
import Percentage from "./Percentagebar";
import EditProject from "./EditProject";

const ProjectTodos = ({pid, piid}) => {
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState('');
  const [percentage, setPercentage] = useState(0)

const handleCheck = async(todo_id) => {
    event.preventDefault();
    console.log(event.target.value)
    console.log(todo_id)
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, true];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    
    let completed = updatedList.toString();
    // console.log(completed)
    if(completed === ''){
      completed = false;
      console.log(completed)
    }

    const check = ({
      completed : completed,
      todo_id: todo_id.toString()
    })

    try {
      await fetch("project/itemcompleted", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check)
      });
      window.location = "/main";
    } catch (err) {
      console.error(err.message);
    }
      window.location = "/main";
  };

async function deleteTodo(id) {
    try {
      await fetch(`/project/itemDelete/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

async function getTodos() {
    const res = await fetch(`project/item/${pid}`);
    const todoArray = await res.json();
    setTodos(todoArray);
    console.log(todoArray);
  }

useEffect(() => {
    getTodos();
  }, []);

return (
    <Fragment>
      {" "}
      <div >
        {/* <div style={{paddingTop:'30px'}}>
          
          <p style={{textAlign:'center'}}>Project Progress: </p>
                <Percentage project_id={project_id} />
        </div> */}
            <table className="table mt-5" style={{border:"1px grey dotted"}}>
              <thead className="thead-dark">
                <tr style={{textAlign:"center"}}>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Completed</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
          {todos?.map((todo) => (
            <tr key={todo.todo_id} style={todo.completed === true ? {textAlign:"center", backgroundColor:"green", color:"white", textDecoration: 'line-through'}: {textAlign:'center'}}>
              <td>{todo.name}</td> 
              <td>{todo.description}</td>
              <td><input type="checkbox" value={todo.completed} name="completed" onChange={(e)=> handleCheck(todo.todo_id)} checked={todo.completed !== true? false: true}/></td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                  >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Fragment>
  );
};

export default ProjectTodos;