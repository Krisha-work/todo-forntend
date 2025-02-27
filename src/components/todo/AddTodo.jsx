import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../api/todo/index.js";
import { toast } from "react-toastify";

const TodoAdd = () => {
  //   const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clearStauts, setClearStauts] = useState(false);

  const Token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!Token) {
      navigate("/");
    }
  };

  const handleButtonStatus = () => {
    if (title || description) {
      setClearStauts(true);
    } else {
      setClearStauts(false);
    }
  };

  useEffect(() => {
    handleLogin();
    handleButtonStatus();
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const res = await addTodo(
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
    console.log(res, "++++++++++++++++");
    navigate("/todo")
    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const clearAllFields = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="todo-header">
        <h1>Add Todo</h1>
      </div>
      <div className="todo-container">
        <div className="todo-form">
          <div>
            <form onSubmit={handleAddTodo}>
              <div className="inputbox">
                <div className="from-control">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Your Title"
                    value={title}
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
                  <button>Add</button>
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

export default TodoAdd;
