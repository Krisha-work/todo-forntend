import Button from "../../common/Button";
import Input from "../../common/Input";
// import { useState } from "react";

const TodoForm = ({
  onSubmit,
  title,
  description,
  setTitle,
  setDescription,
  editStauts,
  clearStauts,
  setClearStauts,
  clearAllFields,
}) => {
  return (
    <>
      <div className="todo-container">
        <div className="todo-form">
          <div>
            <form onSubmit={onSubmit}>
              <div className="inputbox">
                <Input
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Enter Your Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setClearStauts(true);
                  }}
                />
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter Your Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setClearStauts(true);
                  }}
                />
              </div>
              {clearStauts ? (
                <div className="todos-btn">
                  <Button name={editStauts ? "Update" : "Add"} />
                  <Button
                    onClick={clearAllFields}
                    disabled={!clearStauts}
                    name={"Clear"}
                  />
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoForm;
