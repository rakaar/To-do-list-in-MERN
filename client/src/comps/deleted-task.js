import React, { useEffect } from 'react';
import axios from 'axios';

export default function DeletedTask(props) {
  useEffect(() => {
    console.log('id in deleted task func is', props.match.params.id);
    axios
      .delete('http://localhost:4000/todo/delete/' + props.match.params.id)
      .then(res => console.log('this is response of axios.delete', res))
      .catch(err => console.log('this is error from axios.delete', err));
    console.log('item is deleted u know');
    props.history.push('/todo');
  });
  return <div />;
}
