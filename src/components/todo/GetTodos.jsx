// import axios from "axios";
// import { useState } from "react";
import "./gettodos.css";
// import { useEffect, useState} from 'react'

const GetTodos = () => {
//   console.log(props, "------------");
  
// const [tododata, setTodoData] = useState([])

// setTimeout(() => {
//     setTodoData(props)
// }, 2000);

// console.log(tododata,"..........................");


  return (
    <>
      <div className="table-header all-todos">
        <h2>All Todos</h2>
      </div>
      {/* <div className="table-container">
        <div className="todo-table">
          <div>
            <table>
              <tr className="table-head">
                <th>User ID</th>
                <th>Todo ID</th>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>

              <tr className="table-body">
                {tododata.map((item) => {
                    console.log(item, "====================");  
                  return (
                    <>
                      <td>bb</td>
                      <td>Todo ID</td>
                      <td>Title</td>
                      <td>Description</td>
                    </>
                  );
                })}
              </tr>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default GetTodos;
