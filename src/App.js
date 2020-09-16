import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl , Input , InputLabel} from '@material-ui/core';

import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';

function App() {
const[input,setInput] = useState('');
const[messages, setMessages] = useState([]);
const[username,setUsername] = useState('');

//read messages from db
//onSnapshot : every time the db changing run this code.
useEffect(() => {
db.collection('messages').orderBy('timestamp' , 'desc')
.onSnapshot(snapshot =>{
  setMessages(snapshot.docs.map(doc => doc.data()))
})
},[]) //[] Means: that the useEffect running only when the page loads.

useEffect(()=>{
  setUsername (prompt('Please enter your name'));
}, [])

const sendMessage = (event) => {
  //all the logic to show message
  event.preventDefault();

  db.collection('messages').add({
    message: input,
    username : username,
    timestamp:  firebase.firestore.FieldValue.serverTimestamp()
  })
  setMessages([...messages,{username: username , message: input}]);
  setInput('');
};
  return(
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
