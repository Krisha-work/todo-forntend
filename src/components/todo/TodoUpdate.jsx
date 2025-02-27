import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../../api/todo/index.js";
import { toast } from "react-toastify";

const TodoUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clearStauts, setClearStauts] = useState(false);
  const Token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogin = () => {
    if(!Token){
      navigate("/")
    }
  }

  const handleButtonStatus = () => {
    if (title || description) {
      setClearStauts(true);
    } else {
      setClearStauts(false);
    }
  };

  useEffect(()=>{
    handleLogin()
    handleButtonStatus();
  })

  const handleTodoData = async () => {
    const res = await getTodo(id
    //    {
    //   headers: {
    //     authorization: localStorage.getItem("token"),
    //   },
    // }
  );
    console.log(res);
    console.log(res.data.todo.title, "-----", res.data.todo.description);

    setTitle(res.data.todo.title);
    setDescription(res.data.todo.description);

    // let todoData = res.data.todos;
  };

  useEffect(() => {
    handleTodoData();
  }, []);

  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    const res = await updateTodo(
      id,
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
    navigate("/todo");
    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 1000
    });
  };

  const clearAllFields = () => {
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <div className="todo-header">
        <h1>Todo Update</h1>
      </div>
      <div className="todo-container">
        <div className="todo-form">
          <div>
            <form onSubmit={handleUpdateTodo}>
              <div className="inputbox">
                <div className="from-control">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Your Title"
                    defaultValue={title}
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
                    defaultValue={description}
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
                <button>Update</button>
                <button onClick={clearAllFields}>Clear</button>
              </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoUpdate;
