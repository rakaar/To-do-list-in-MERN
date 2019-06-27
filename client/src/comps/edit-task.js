import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function Edit(props) {
  const [oldTask, setoldTask] = useState('');
  const [newTask, setnewTask] = useState('');

  useEffect(() => {
    console.log(props.match.params.id);
    axios
      .get('http://localhost:4000/todo/' + props.match.params.id)
      .then(res => {
        console.log(res.data.task);
        setoldTask(res.data.task);
      })
      .catch(err => console.log(err));
  });

  const handleUpdate = e => {
    axios
      .put('http://localhost:4000/todo/update/' + props.match.params.id, {
        task: newTask
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    props.history.push('/todo');
  };

  return (
    <div>
      <h1>Edit task here</h1>
      <InputText
        defaultValue={oldTask}
        onChange={e => setnewTask(e.target.value)}
      />
      <Button
        label='Edit Todo'
        className='p-button-raised p-button-rounded'
        onClick={handleUpdate}
      />
    </div>
  );
}
