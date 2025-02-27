import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdSystemUpdateAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
  updateTodo,
} from "../../api/todo/index.js";
import "./todo.css";
import GetTodos from "./GetTodos";
import { toast } from "react-toastify";
// import { ReactDialogBox } from 'react-js-dialog-box'
import { useNavigate } from "react-router-dom";
// import { SlOptionsVertical } from "react-icons/sl";

const Todo = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editStauts, setEditStauts] = useState(false);
  const [todoid, setTodoid] = useState("");
  const [clearStauts, setClearStauts] = useState(false);
  // const [optionStatus, setOptionStauts] = useState(false)

  const Token = localStorage.getItem("token");

  const navigate = useNavigate();

  const hendleAllData = async () => {
    // e.preventDefault();
    // console.log(Token);
    
    const res = await getAllTodo();
    //   {
    //   headers: {
    //     authorization: localStorage.getItem("token"),
    //   },
    // }

    console.log(res);
    console.log(res.data.todos);
    setData(res.data.todos);
  };

  useEffect(() => {
    hendleAllData();
  }, []);


  const handleButtonStatus = () => {
    if (title || description) {
      setClearStauts(true);
    } else {
      setClearStauts(false);
    }
  };

  useEffect(() => {
    handleButtonStatus();
  });

  const handleLogin = () => {
    if (!Token) {
      navigate("/");
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  // const handleOption = () => {
  //   if(optionStatus == false) setOptionStauts(true)
  //     else setOptionStauts(false)
  // }

  const handleDeleteTodo = async (id) => {
    if (id) {
      if (window.confirm("Are you sure you want to delete this recode ?")) {
        const res = await deleteTodo(id 
        //   {
        //   headers: {
        //     authorization: localStorage.getItem("token"),
        //   },
        // }
      );
        console.log(res, "++++++++++++++++");
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    }

    hendleAllData();
  };

  const handleFillData = async (id) => {
    const res = await getTodo(id 
    //   {
    //   headers: {
    //     authorization: localStorage.getItem("token"),
    //   },
    // }
  );
    console.log(res, "==========");
    setTodoid(res.data.todo.id);
    setTitle(res.data.todo.title);
    setDescription(res.data.todo.description);
    setEditStauts(true);
  };

  const addTodoData = async () => {
    const res = await addTodo(
      {
        title: title,
        description: description,
      },
      // {
      //   headers: {
      //     authorization: localStorage.getItem("token"),
      //   },
      // }
    );
    console.log(res, "--------");

    setTitle("");
    setDescription("");

    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 1000,
    });
    hendleAllData();
  };

  const updateTodoData = async () => {
    console.log(todoid, "-----");

    const res = await updateTodo(
      todoid,
      {
        title: title,
        description: description,
      },
      // {
      //   headers: {
      //     authorization: localStorage.getItem("token"),
      //   },
      // }
    );
    console.log(res, "++++++++++++++++");

    setTitle("");
    setDescription("");

    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 1000,
    });
    hendleAllData();
    setEditStauts(false);
  };

  const handleTodoData = async (e) => {
    e.preventDefault();
    if (editStauts == true) {
      updateTodoData();
    } else {
      addTodoData();
    }
  };

  const clearAllFields = () => {
    setTitle("");
    setDescription("");
  };

  

  console.log(data, "===");

  return (
    <>
      <div className="todo-header">
        <div className="todo-header">
          <h1>Todo Details</h1>
        </div>
        <div className="todos-btn">
          <Link to={"/addtodo"}>
            <button>Add</button>
          </Link>
        </div>
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
                    value={title}
                    placeholder="Enter Your Title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
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
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    required
                  />
                  <p className="error-mes">
                    {/* {!desErr ? <p>Enter Description</p> : ""} */}
                  </p>
                </div>
              </div>
              {clearStauts ? (
                <div className="todos-btn">
                  <button>{editStauts ? "Update" : "Add"}</button>
                  <button onClick={clearAllFields}>Clear</button>
                </div>
              ) : null}
            </form>
            {/* <div className="todos-btn">
               
              </div> */}
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <div className="todo-table">
          <div>
          <GetTodos />
            <table>
              <tr className="table-head">
                <th>Todo ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
                {/* <th>Menu</th> */}
              </tr>

              {data.map((item) => {
                let id = Number(item.id);
                console.log(id, "============");

                return (
                  <>
                    <tr className="table-body" key={item.id}>
                      <td >{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <div className="action-btn">
                          {/* <SlOptionsVertical onClick={handleOption} /> */}
                            {/* {optionStatus ?  */}

                            <div className="todo-btn delete-btn">
                              <button
                                onClick={() => {
                                  handleDeleteTodo(item.id);
                                }}
                              >
                                <MdDelete />
                              </button>
                            </div>
                            <div className="todo-btn update-btn">
                              <button
                                onClick={() => {
                                  handleFillData(item.id);
                                }}
                              >
                                <MdEdit />
                              </button>
                              <Link to={`/todoupdate/${item.id}`}>
                                <button>
                                  <MdSystemUpdateAlt />
                                </button>
                              </Link>
                            </div>
                          </div> 
                          {/* : null} */}
                      </td>
                      {/* <td>
                        <div className="action-btn">
                          <div className="todo-btn update-btn">
                            <button
                              onClick={() => {
                                handleFillData(item.id);
                              }}
                            >
                              <MdEdit />
                            </button>
                            <Link to={`/todoupdate/${item.id}`}>
                              <button>
                                <MdSystemUpdateAlt />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </td> */}
                      {/* <td>
                        <CiMenuKebab
                          onClick={() => {
                            setStauts(!stauts);
                          }}
                        />
                        {stauts ? (
                          <div className="todo-popup">
                            <Link to={"/todo"} className="todo-link-popup">
                              <li>On Page</li>
                            </Link>
                            <Link
                              to={"/todoupdate"}
                              className="profile-link-popup"
                            >
                              <li>Another Page</li>
                            </Link>
                          </div>
                        ) : null}
                      </td> */}
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
