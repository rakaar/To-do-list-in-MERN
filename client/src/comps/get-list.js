import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default function GetList(props) {
  const [todosArr, setTodosArr] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/todo')
      .then(res => setTodosArr(res.data))
      .catch(err => console.log(err));
  });

  return (
    <div>
      <h3>
        <u>The list of items is :</u>
      </h3>
      <table border='1'>
        {todosArr.map(item => {
          return (
            <tr>
              <td>{item.task}</td>
              <td>
                <Router>
                  <Link
                    to={`/edit/${item._id}`}
                    onClick={() => props.history.push(`/edit/${item._id}`)}
                  >
                    Edit
                  </Link>
                </Router>
              </td>
              <td>
                <Router>
                  <Link
                    to={`/todo/delete/${item._id}`}
                    onClick={() =>
                      props.history.push(`/todo/delete/${item._id}`)
                    }
                  >
                    Delete
                  </Link>
                </Router>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
