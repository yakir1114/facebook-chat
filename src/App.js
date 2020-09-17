import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FormControl , Input , InputLabel} from '@material-ui/core';

import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
const[input,setInput] = useState('');
const[messages, setMessages] = useState([]);
const[username,setUsername] = useState('');

//read messages from db
//onSnapshot : every time the db changing run this code.
useEffect(() => {
db.collection('messages').orderBy('timestamp' , 'desc')
.onSnapshot(snapshot =>{
  setMessages(snapshot.docs.map(doc => ({id: doc.id , message: doc.data()})))
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
      
      <h1>קרנדי צאט </h1>
      <img height="100" width='100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTghc5snLWCRWoUS3cZTJe2Gi3itK9u0bOiAQ&usqp=CAU" ></img>
      <h2>welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          
          <Input placeholder="Enter Message..." className="app__input" value={input} onChange={event=> setInput(event.target.value)} />
          <IconButton className="app__iconButtom" disabled={!input} variant="contained" color="primary" type='submit' onClick = {sendMessage}>
            <SendIcon>

            </SendIcon>
          </IconButton>
        </FormControl>
      </form>
      
      <FlipMove>
          {/* the messages area*/ }
        {
          messages.map(({id , message}) => (
            <Message key={id} username ={username} message={message}></Message>
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
