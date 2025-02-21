import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import "./todo.css";
import GetTodos from "./GetTodos";

const Todo = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //   const [titleErr, setTitleErr] = useState(true);
  //   const [desErr, setDesErr] = useState(true);

  const navigate = useNavigate();
  let res;

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const clearAllInputBox = () => {
    setTitle("")
    setDescription("")
  }
  const hendleAllData = async () => {
    res = await axios.get("http://localhost:3000/api/todo/todos", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
    let todoData = res.data.todos;
    setTimeout(() => {
      setData(todoData);
    }, 2000);
  };

  let id

  const hendleDeleteTodo = async () => {
    res = await axios.get(`http://localhost:3000/api/todo/remove/${id}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
    // let todoData = res.data.todos;
  };

  useEffect(() => {
    hendleAllData();
  }, data);
  const handleTodoData = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/todo/todoadd",
      {
        title: title,
        description: description,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res, "--------");
    alert("Todo Add Successfully !!");
    hendleAllData()
    setData(res)
    setTimeout(() => {
        navigate("/api/todo/todoadd");
    }, 2000);
  };
  console.log(data, "===");

  //   console.log(titleErr, "----");

  return (
    <>
      <div className="todo-header">
        <h1>Todo Details</h1>
        
      </div>
      <div className="todo-container">
        <div className="todo-form">
          <div>
            <form onSubmit={handleTodoData}>
              <div className="inputbox">
                <div className="from-control">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Your Title"
                    onChange={handleTitle}
                    required
                  />
                  <p className="error-mes">
                    {/* {!titleErr ? <p>Enter Title</p> : ""} */}
                  </p>
                </div>
                <div className="from-control">
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter Your Description"
                    onChange={handleDescription}
                    required
                  />
                  <p className="error-mes">
                    {/* {!desErr ? <p>Enter Description</p> : ""} */}
                  </p>
                </div>
              </div>
              <div className="todo-btn">
                <button onClick={handleTodoData}>Add</button>
                <button>Update</button>
                <button>Clear</button>
              </div>
            </form>
          </div>
        </div>
        <button onClick={clearAllInputBox}>clear</button>
      </div>
      
      <GetTodos />
      <div className="table-container">
        <div className="todo-table">
          <div>
            <table>
              <tr className="table-head">
                <th>Todo ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
                <th>Menu</th>
              </tr>

              {data.map((item, index) => {
                console.log(item, "====================");
                console.log(index, ".......................");
                return (
                  <>
                    <tr className="table-body">
                      <td key={index}>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td><div className="todo-delete-btn" key={index} onClick={hendleDeleteTodo}><button>Delete</button></div></td>
                      <td><CiMenuKebab /></td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
