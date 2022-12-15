const dotenv = require('dotenv');
const pool = require("../db");
dotenv.config();

const itemStatus = async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * from todo");
      res.status(200).json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  };
  
const itemQuery = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id,
      ]);
      res.status(200).json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
const itemAdd = async (req, res) => {
    try {
      const { description, project_id, name,completed } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (name, description, project_id, completed) VALUES($1, $2, $3, $4) RETURNING *",
        [name, description, project_id, completed]
      );
  
      res.status(200).json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
const itemUpdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { description, name } = req.body;
      await pool.query(
        "UPDATE todo SET description = $1, name = $2 WHERE todo_id = $3",
        [description, name, id]
      );
  
      res.status(200).json("todo was updated");
    } catch (err) {
      console.error(err.message);
    }
  };
  
const itemDelete = async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id,
      ]);
      res.status(200).json("todo was deleted");
    } catch (err) {
      console.error(err.message);
    }
  };

const itemCompleted = async (req, res) => {
    try {
      const { completed, todo_id } = req.body;
      await pool.query(
        "UPDATE todo SET completed = $1 WHERE todo_id = $2",
        [completed, todo_id]
      );
  
      res.status(200).json("todo was updated");
    } catch (err) {
      console.error(err.message);
    }
  };
  
const projectStatus = async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * from project");
      res.status(200).json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  };

const projectQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const projectQuery = await pool.query("SELECT * FROM project WHERE id = $1", [
      id,
    ]);
    res.status(200).json(projectQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
  };

const projectAll = async (req, res) => {
    try {
      const projectAll = await pool.query("SELECT * FROM project");
      res.status(200).json(projectAll.rows);
    } catch (err) {
      console.error(err.message);
    }
    };

// const projectAdd = async (req, res) => {
//       try {
//         const { id } = req.params;
//         let { title, description } = req.body;
//         const newTodo = await pool.query(
//           "INSERT INTO project (title, description, user_id) VALUES($1, $2, $3) RETURNING *",
//           [title, description, id ]
//         );
    
//         res.status(200).json(newTodo.rows[0]);
//         // res.status(200).json(newProject.rows[0]);
//       } catch (err) {
//         console.error(err.message);
//       }
//     };
const projectAdd = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, description } = req.body;
    
    const projectIsValid = await pool.query("SELECT * FROM project WHERE title = $1 AND user_id = $2", 
    [title, id]
    );

    console.log(projectIsValid);

    if (projectIsValid.rows.length !== 0) {
      return res.status(401).json("Project Existed");
    }

    const newTodo = await pool.query(
                "INSERT INTO project (title, description, user_id) VALUES($1, $2, $3) RETURNING *",
                [title, description, id ]
              );
          
              res.status(200).json(newTodo.rows[0]);
              // res.status(200).json(newProject.rows[0]);
            } catch (err) {
              console.error(err.message);
            }
          };

const projectDelete = async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM project WHERE id = $1", [
        id,
      ]);
      res.status(200).json("Project was deleted");
    } catch (err) {
      console.error(err.message);
    }
  };

const itemQueryByProject = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE project_id = $1", [
        id,
      ]);
      res.status(200).json(todo.rows);
    } catch (err) {
      console.error(err.message);
    }
  };

const projectById = async (req, res) => {
    try {
      const { id } = req.params;
      const pId = await pool.query("SELECT * FROM project WHERE user_id = $1",[
        id
      ]);
      res.status(200).json(pId.rows);
    } catch (err) {
      console.error(err.message);
    }
  };

const projectUpdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { description, title } = req.body;
      await pool.query(
        "UPDATE project SET description = $1, title = $2 WHERE id = $3",
        [description, title, id]
      );
  
      res.status(200).json("project was updated");
    } catch (err) {
      console.error(err.message);
    }
  };

// const userByProject = async (req,res) => {
//   try {
//     const { id } = req.params;
//     const pId = await pool.query("SELECT * FROM project INNER JOIN user_details ON user_id = sn WHERE project_id = $1;",[
//       id
//     ]);
//     res.status(200).json(pId.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

const userByProject = async (req,res) => {
  try {
    const { id } = req.params;
    const pId = await pool.query("SELECT * FROM project_pool INNER JOIN user_details on uid = sn WHERE pid = $1",[
      id
    ]);
    res.status(200).json(pId.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const projectProgress = async (req,res)=>{
  try {
    const { id } = req.params;
    const progress = await pool.query("SELECT * FROM todo INNER JOIN project ON project_id = id WHERE project_id = $1",[
      id
    ])
    res.status(200).json(progress.rows);
  }catch(err){
    console.error(err.message)
  }
}

const projectOverall = async (req,res)=>{
  try {
    const { id } = req.params;
    const progress = await pool.query("SELECT * FROM todo INNER JOIN project ON project_id = id WHERE user_id = $1" ,[
      id
    ])
    res.status(200).json(progress.rows);
  }catch(err){
    console.error(err.message)
  }
}



module.exports = {
    itemStatus,
    itemQuery,
    itemAdd,
    itemUpdate,
    itemDelete,
    itemCompleted,
    projectStatus,
    projectQuery,
    projectAll,
    projectAdd,
    projectDelete,
    itemQueryByProject,
    projectById,
    projectUpdate,
    userByProject,
    projectProgress,
    projectOverall
}  