import { Link } from "react-router-dom";
import { MdEdit, MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import "./gettodos.css";
import { memo } from "react";
import ConfirmationBox from "../todoDelete/confirmationBox";

const GetTodos = memo(
  ({ data, handleDeleteTodo, handleFillData, setIsOpen, isOpen }) => {
    return (
      <>
        <div className="table-container">
          <div className="todo-table">
            <div>
              <div className="table-header all-todos">
                <h2>All Todos</h2>
              </div>
              <table>
                <tr className="table-head">
                  <th>Todo ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>

                {data.map((item) => {
                  let id = Number(item.id);
                  console.log(id, "============");

                  return (
                    <>
                      <tr className="table-body" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
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
                            <div className="todo-btn delete-btn">
                              <button
                                onClick={() => {
                                  handleDeleteTodo(item.id);
                                }}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
        <ConfirmationBox setIsOpen={setIsOpen} isOpen={isOpen} />
      </>
    );
  }
);

export default GetTodos;
