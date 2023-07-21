import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';

const API_KEY = '5XMO1A8DDsmLvkhNwPWirD9cClf3sdiPhqz1R5jdtNNPmsF_Cw'


function App() {
  const [newTasks, setNewTasks] = useState([])


  useEffect(() => {
    fetch('/api/v1/todo', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      }
    }).then(res => {
      if(!res.ok) throw new Error("Response failed")
      return res.json()  
    }).then(data => setNewTasks(data.items.map(user => {
      return {
        task: user.task,
        id: user._uuid
      }
    })))
    .catch(err => console.log(err))
  }, [])


  const onFormSubmit = (task) => {
    fetch('/api/v1/todo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{task}])
    }).then(res => {
      if(!res.ok) throw new Error("Response failed")
      return res.json()  
    }).then(data => setNewTasks((prev) => [{
      task: data.items[0].task,
      id: data.items[0]._uuid
    }, ...prev]))
    .catch(err => console.log(err))
  }


  return (
    <div className="App">
        <Form onFormSubmit={onFormSubmit} />

        {newTasks.map((task) => 
          <div key={task.id} >
            <h3>{task.task}</h3>
          </div>)}
    </div>
  );
}

export default App;
