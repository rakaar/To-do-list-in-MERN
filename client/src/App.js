import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todo from './comps/todo';
import GetList from './comps/get-list';
import RoughNav from './comps/rough-nav';
import EditTask from './comps/edit-task';
import DeleteTask from './comps/deleted-task';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route path='/' component={RoughNav} />
        <Route path='/' exact component={Todo} />
        <Route path='/todo' exact component={GetList} />
        <Route path='/edit/:id' exact component={EditTask} />
        <Route path='/todo/delete/:id' exact component={DeleteTask} />
      </div>
    </Router>
  );
}

export default App;
