import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../../../api/todo/index.js";
import { toastMessage } from "../../../utils/toastMessage.js";
import TodoForm from "../todoForm/TodoForm.jsx";

const TodoUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clearStauts, setClearStauts] = useState(false);
  const [editStauts, setEditStauts] = useState(false);


  const navigate = useNavigate();

  const handleTodoData = async () => {
    const res = await getTodo(id);
    console.log(res);
    setTitle(res.data.todo.title);
    setDescription(res.data.todo.description);
    setEditStauts(true);
  };

  useEffect(() => {
    handleTodoData();
  }, []);

  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    const res = await updateTodo(id, {
      title: title,
      description: description,
    });
    console.log(res, "++++++++++++++++");
    toastMessage('success', res.data.message)
    navigate("/todo");
  };

  const clearAllFields = () => {
    setTitle("");
    setDescription("");
    setClearStauts(false);
    navigate("/todo");
  };

  return (
    <>
      <div className="todo-header fixed-header">
        <h1>Todo Update</h1>
      </div>
      <TodoForm onSubmit={handleUpdateTodo} 
       title={title}
       description={description}
       setTitle={setTitle}
       setDescription={setDescription}
       clearStauts={clearStauts}
       editStauts={editStauts}
       setClearStauts={setClearStauts}
       clearAllFields={clearAllFields}
       setEditStauts={setEditStauts}
      />
    </>
  );
};

export default TodoUpdate;
