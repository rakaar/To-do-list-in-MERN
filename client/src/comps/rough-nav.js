import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <Router>
      <div>
        <Link to='/' onClick={() => props.history.push('/')}>
          Add todo
        </Link>
        <br />
        <Link to='/todo' onClick={() => props.history.push('/todo')}>
          Get Todo
        </Link>
      </div>
    </Router>
  );
}
