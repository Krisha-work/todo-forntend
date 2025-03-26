import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { MdEdit, MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
  updateTodo,
} from "../../api/todo/index.js";
import "./todo.css";
import GetTodos from "./todoGet/GetTodos";
import { toastMessage } from "../../utils/toastMessage.js";
import TodoForm from "./todoForm/TodoForm.jsx";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editStauts, setEditStauts] = useState(false);
  const [todoid, setTodoid] = useState("");
  const [clearStauts, setClearStauts] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();

  const hendleAllData = async () => {
    const res = await getAllTodo();
    console.log(res);
    console.log(res.data.todos);
    setData(res.data.todos);
  };

  useEffect(() => {
    hendleAllData();
  }, []);

  const handleDeleteTodo = async (id) => {
    if (id) {
      setIsOpen(true)
      // if (window.confirm("Are you sure you want to delete this recode ?")) {
        const res = await deleteTodo(id);
        toastMessage("success", res.data.message);
      // }
    }
    hendleAllData();
  };

  const handleFillData = async (id) => {
    const res = await getTodo(id);
    console.log(res, "==========");
    setTodoid(res.data.todo.id);
    setTitle(res.data.todo.title);
    setDescription(res.data.todo.description);
    setEditStauts(true);
  };

  const addTodoData = async () => {
    const res = await addTodo({
      title: title,
      description: description,
    });
    console.log(res, "--------");
    setTitle("");
    setDescription("");
    toastMessage("success", res.data.message);
    hendleAllData();
    setClearStauts(false);
  };

  const updateTodoData = async () => {
    console.log(todoid, "-----");
    if (clearStauts) {
      const res = await updateTodo(todoid, {
        title: title,
        description: description,
      });
      console.log(res, "++++++++++++++++");
      setTitle("");
      setDescription("");
      toastMessage("success", res.data.message);
      hendleAllData();
      setClearStauts(false);
    }
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
    setClearStauts(false);
    setEditStauts(false);
  };

  console.log(data, "===");

  return (
    <>
      <div className="todo-container">
        <div className="todo-header">
          <h1>Todo Details</h1>
        </div>
        <div className="todo-add">
          <Button name={"Add"} onClick={()=>{navigate("/addtodo")}} />
        </div>
      </div>
      <TodoForm
        onSubmit={handleTodoData}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        editStauts={editStauts}
        setEditStauts={setEditStauts}
        todoid={todoid}
        setTodoid={setTodoid}
        clearStauts={clearStauts}
        setClearStauts={setClearStauts}
        clearAllFields={clearAllFields} 
      />

      <GetTodos
        data={data}
        handleDeleteTodo={handleDeleteTodo}
        handleFillData={handleFillData}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      
    </>
  );
};
export default Todo;
