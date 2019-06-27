import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../App.css';

export default function Todo(props) {
  const [task, setTask] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log(task, 'is added');
    // the axios part
    axios
      .post('http://localhost:4000/todo/add', {
        task: task
      })
      .then(res => console.log(res))
      .catch(err => console.log('axios error is', err));
    props.history.push('/todo');
  };

  return (
    <div>
      <InputText
        placeholder='Enter task here'
        onChange={e => setTask(e.target.value)}
      />
      <Button
        label='Create Todo'
        className='p-button-raised p-button-rounded'
        onClick={handleSubmit}
      />
    </div>
  );
}
