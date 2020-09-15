import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl , Input , InputLabel} from '@material-ui/core';

import './App.css';
import Message from './Message';

function App() {
const[input,setInput] = useState('');
const[messages, setMessages] = useState([{username: 'yakir',text:'asdasd'},{username: 'yak',text: 'Hello World!'}]);
const[username,setUsername] = useState('');

useEffect(()=>{
  setUsername (prompt('Please enter your name'));
}, [])

console.log(username);
const sendMessage = (event) => {
  //all the logic to show message
  event.preventDefault();
  setMessages([...messages,{username: username , text: input}]);
  setInput('');
}

  return (
    <div className="App">
      <h1>Hello Everyone!</h1>
      <h2>welcome {username}</h2>
      <form>

        {/* the input filed*/ }

        {/* the send button*/ }
        
        <FormControl>
          <InputLabel >Enter Message...</InputLabel>
          <Input value={input} onChange={event=> setInput(event.target.value)} />
          <Button disabled={!input} variant="contained" color="primary" type='submit' onClick = {sendMessage}>Send Message</Button>
        </FormControl>
      </form>
      
      {/* the messages area*/ }
      {
        messages.map(message => (
          <Message username ={username} message={message}></Message>
        ))
      }
    </div>
  );
}

export default App;
