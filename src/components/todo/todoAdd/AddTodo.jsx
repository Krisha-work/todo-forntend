// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../../api/todo/index.js";
import { toastMessage } from "../../../utils/toastMessage.js";
import "../todo.css";
import TodoForm from "../todoForm/TodoForm.jsx";
import { useState } from "react";

const TodoAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clearStauts, setClearStauts] = useState(false);

  const navigate = useNavigate();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const res = await addTodo({
      title: title,
      description: description,
    });
    console.log(res, "++++++++++++++++");
    setTitle("");
    setDescription("");
    navigate("/todo");
    toastMessage("success", res.data.message);
    setClearStauts(false);
  };

  const clearAllFields = () => {
    setTitle("");
    setDescription("");
    setClearStauts(false);
  };

  return (
    <>
      <div className="todo-header fixed-header">
        <h1>Add Todo</h1>
      </div>
      <TodoForm
        onSubmit={handleAddTodo}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        clearStauts={clearStauts}
        setClearStauts={setClearStauts}
        clearAllFields={clearAllFields}
      />
    </>
  );
};

export default TodoAdd;
